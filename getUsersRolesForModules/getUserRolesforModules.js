/**
 * Created by Sannah Msiza on 2015/04/02.
 */

var ldap =require("./../node_modules/ldapjs/lib/index");
var client=ldap.createClient({
    url: "ldap://reaper.up.ac.za"
});
module.exports.getUsersRolesForModule= function getUsersRolesForModule(getUsersRolesForModuleRequest,client,getUsersRolesForModuleResult) {
    {
        base = 'ou=Computer Science,o=University of Pretoria,c=ZA';
        var opts =
        {
            filter: "memberuid=" + getUsersRolesForModuleRequest.mID(),//+loginRequest.username();
            scope: 'sub'
        };

        var entry=new Array();
        var assert = require("assert");
        return client.search(base, opts, function (err, res) {
            if (err)
            {
                client.unbind();
                return getUsersRolesForModuleResult(err, null,getUsersRolesForModuleRequest.mID(),getUsersRolesForModuleRequest.uID());
            }
            res.on('searchEntry', function (_entry)
            {
                entry.push(_entry);
            });

            res.on('error', function (err) {
                client.unbind();
                return getUsersRolesForModuleResult(err, null,getUsersRolesForModuleRequest.mID(),getUsersRolesForModuleRequest.uID());
            });

            res.on('end', function () {
                if (!entry) {
                    client.unbind();
                    return getUsersRolesForModuleResult(new Error(getUsersRolesForModuleRequest.muid() + ' not found'), null,getUsersRolesForModuleRequest.mID(),getUsersRolesForModuleRequest.uID());

                }
                return client.bind(entry.dn.toString(), LoginRequest.password(), function (err) {
                    if (err) {
                        client.unbind();
                        return getUsersRolesForModuleResult(err, null,getUsersRolesForModuleRequest.mID(),getUsersRolesForModuleRequest.uID());
                    }
                    return client.unbind(function (err) {
                        assert.ifError(err);
                        return getUsersRolesForModuleResult(null, entry.toObject(),getUsersRolesForModuleRequest.muid());
                    });
                });
            });
        });
    }
}

/**call back function to retrieve values from the ldap server
 *It has 2 parameters message na
 * **/

module.exports.getUsersRolesForModuleResult =function getUsersRolesForModuleResult(msg,obj,mid,uid)
{

    if(obj==null)
    {
        throw msg;
    }
    else
    {
        console.log(msg);
        console.log(obj);
    }
}

/**call back to retrieve the status of the connection to ldap
 * It has 2 parameters msg and status
 * @ param status :is a boolean value on the status of the connection
 * @ para msg  : is the string message saying tif there is a connection
 * if no connection is made the client unbinds to the server
 **/
module.exports.CheckConnection=function CheckConnection(msg,status,uname,pword)
{

    if(status)
    {
        console.log(msg);
        logon.Login(new getUsersRolesForModuleRequest(uname,pword),client,getUsersRolesForModuleResult());
    }
    else
    {
        client.unbind();
        throw msg;

    }
}


module.exports.getUsersRolesForModuleRequest=function getUsersRolesForModuleRequest(mid,uid)
{
    this.mid=mid;
    this.uid=uid;

    this.mID = function() {
        return this.mid;
    };

    this.uID = function () {
        return this.uid;
    };
}