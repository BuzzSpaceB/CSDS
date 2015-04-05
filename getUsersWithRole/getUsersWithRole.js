var ldap =require("./../node_modules/ldapjs/lib/index");
var client=ldap.createClient({
    url: "ldap://reaper.up.ac.za"
});

module.exports. getUsersWithRole= function  getUsersWithRole( getUsersWithRoleRequest,client, getUsersWithRoleResult)
{
    {
        base = 'ou=Computer Science,o=University of Pretoria,c=ZA';
        var opts =
        {
            filter: "cn=" +  getUsersWithRoleRequest.roleID(),//+loginRequest.username();
            scope: 'sub'
        };

        var entry=new Array();
        var assert = require("assert");
        return client.search(base, opts, function (err, res) {
            if (err)
            {
                client.unbind();
                return  getUsersWithRoleResult(err, null,null);
            }
            res.on('searchEntry', function (_entry)
            {
                entry.push(_entry);
            });

            res.on('error', function (err) {
                client.unbind();
                return  getUsersWithRoleResult(err, null,null);
            });

            res.on('end', function () {
                if (!entry) {
                    client.unbind();
                    return  getUsersWithRoleResult(new Error( getUsersWithRoleRequest.muid() + ' not found'), null);
                }
                return client.bind(entry.dn.toString(), LoginRequest.password(), function (err) {
                    if (err) {
                        client.unbind();
                        return  getUsersWithRoleResult(err,null,null);
                    }
                    return client.unbind(function (err) {
                        assert.ifError(err);
                        return  getUsersWithRoleResult(null, entry.toObject(), getUsersWithRoleRequest.roleid());
                    });
                });
            });
        });
    }
}

/**call back function to retrieve values from the ldap server
 *It has 2 parameters message na
 * **/

module.exports.getUsersWithRoleResult =function getUsersWithRoleResult(msg,obj)
{

    if (obj == null)
        throw msg;
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
module.exports.CheckConnection = function CheckConnection(msg,status,uname,pword)
{

    if(status)
    {
        console.log(msg);

        logon.getUsersWithRole(new getUsersWithRoleRequest(uname,pword),client,getUsersWithRoleResult);
    }
    else
    {
        //console.log(msg);
        client.unbind();
        throw msg;
    }
}


module.exports.getUsersWithRoleRequest = function getUsersWithRoleRequest(uid,roleid) {
    this.uid=uid;
    this.roleid=uid;

    this.uID = function() {
        return this.uid;
    };

    this.roleID = function () {
        return this.roleid;
    };
}