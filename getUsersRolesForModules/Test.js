var logon= require("./../Login/login");
var ldap =require("./../ldapjs/lib/index");
var client=ldap.createClient({
    url: "ldap://reaper.up.ac.za"
});

logon.CheckCon(client,CheckConnection);


/**call back function to retrieve values from the ldap server
 *It has 2 parameters message na
 * **/

function getUsersRolesForModuleResult(msg,obj,mid,uid)
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
function CheckConnection(msg,status)
{

    if(status)
    {
        console.log(msg);
        logon.Login(new getUsersRolesForModuleRequest("u89000379","u89000379"),client,getUsersRolesForModuleResult());
    }
    else
    {
        client.unbind();
        throw msg;

    }
}


function getUsersRolesForModuleRequest(mid,uid)
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