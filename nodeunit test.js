/**
 * Created by user on 2015/04/17.
 */



var CSDS = require("../CSDS");
exports['Successfull Connection'] = function(test)
{
    urls = "ldap://reaper.up.ac.za";
    var ldap = require("../ldapjs");
    var base = 'ou=Computer Science,o=University of Pretoria,c=ZA';
    var clients = ldap.createClient({url: urls});
    CSDS.checkConnection(clients, base, function (msg, state, client)
    {
        client.unbind();
        test.expect(1);
        test.equals(state,true);
        test.done();


    })
}

exports['Unsuccessful Connection'] = function(test)
{
    urls = "ldap://reasper.up.ac.za";
    var ldap = require("../ldapjs");
    var base = 'ou=Computer Science,o=University of Pretoria,c=ZA';
    var clients = ldap.createClient({url: urls});
    CSDS.checkConnection(clients, base, function (msg, state, client)
    {
        client.unbind();
        test.expect(1);
        test.equals(state,false);
        test.done();


    })
}

exports['Successful Login']=function(test)
{

    urls = "ldap://reaper.up.ac.za";
    var ldap = require("../ldapjs");
    var base = 'ou=Computer Science,o=University of Pretoria,c=ZA';
    var client = ldap.createClient({url: urls});
    var Log=require("../DataStructures.js");
    var userCred =Log.getUser("u89000379","Lees");
    var LoginRequest=Log.getLoginRequest(userCred);
    CSDS.Login(LoginRequest,client,base,function(msg,uid)
    {
        test.expect(1);
        test.notEqual(uid,null);
        test.done();

    });

}

exports['Unsuccessful Login']=function(test)
{

    urls = "ldap://reaper.up.ac.za";
    var ldap = require("../ldapjs");
    var base = 'ou=Computer Science,o=University of Pretoria,c=ZA';
    var client = ldap.createClient({url: urls});
    var Log=require("../DataStructures.js");
    var userCred =Log.getUser("u89000379","sLees");
    var LoginRequest=Log.getLoginRequest(userCred);
    CSDS.Login(LoginRequest,client,base,function(msg,uid)
    {
        test.expect(1);
        test.equal(uid,null);
        test.done();

    });

}



exports['Successfull Get Users with a Role']=function(test)
{
    var ldap=require("../ldapjs");
    var client=ldap.createClient({url: "ldap://reaper.up.ac.za"});
    var base = 'ou=Computer Science,o=University of Pretoria,c=ZA';
    var CSDS=require("../CSDS.js");
    var Log=require("../DataStructures.js");
    var getUsersWithRoleRequest=Log.getUsersWithRoleRequest("stud_COS301")
    CSDS.getUsersWithRole(getUsersWithRoleRequest,client,base,function(msg,roleID,membersArray)
    {

        test.expect(1);
        test.notEqual(roleID,null);
        test.done();
    });

}


exports['UnSuccessfull Get Users with a Role']=function(test)
{

    var ldap=require("../ldapjs");
    var client=ldap.createClient({url: "ldap://reaper.up.ac.za"});
    var base = 'ou=Computer Science,o=University of Pretoria,c=ZA';
    var CSDS=require("../CSDS.js");
    var Log=require("../DataStructures.js");
    var getUsersWithRoleRequest=Log.getUsersWithRoleRequest("stud_COS3o01");

    CSDS.getUsersWithRole(getUsersWithRoleRequest,client,base,function(msg,roleID,membersArray)
    {
        test.expect(1);
        test.equal(roleID,null);
        test.done();
    });

}


exports['Successfull UserRoleFor Module']=function(test)
{
    var ldap=require("../ldapjs");
    var client=ldap.createClient({url: "ldap://reaper.up.ac.za"});
    var base = 'ou=Computer Science,o=University of Pretoria,c=ZA';
    var CSDS=require("../CSDS.js");
    var Log=require("../DataStructures.js");
    var req = Log.getUsersRolesForModuleRequest("u89000583", "COS330");
    CSDS.getUsersRolesForModule(req, client, base, function(_message, _uID, _mID, _rolls) {
        test.expect(1);
        test.equals(_message, null);
        test.done();
    });
}

exports['Unsuccessful UserRoleFor Module']=function(test)
{

    var ldap=require("../ldapjs");
    var client=ldap.createClient({url: "ldap://reaper.up.ac.za"});
    var base = 'ou=Computer Science,o=University of Pretoria,c=ZA';
    var CSDS=require("../CSDS.js");
    var Log=require("../DataStructures.js");
    var req = Log.getUsersRolesForModuleRequest("u89000583", "COS999");
    CSDS.getUsersRolesForModule(req, client, base, function(_message, _uID, _mID, _rolls){
            test.expect(1);
            test.notEqual(_message,null);
            test.done();
        }
    )
}

