var logon= require("./../Login/login");
var ldap =require("./../ldapjs/lib/index");
var client=ldap.createClient({
    url: "ldap://reaper.up.ac.za"
});

logon.CheckCon(client,CheckConnection);


/**call back function to retrieve values from the ldap server
 *It has 2 parameters message na
 * **/

function LoginResult(msg,obj)
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

        logon.Login(new LoginRequest(new UsernamePasswordCredentials("u89000379", "Lees")),client,LoginResult);
    }
    else
    {
        //console.log(msg);
        client.unbind();
        throw msg;
    }
}

function UsernamePasswordCredentials(username, password) {
    this.username = username;
    this.password = password;
}


function LoginRequest(usernamePasswordCredentials) {
    var pass = usernamePasswordCredentials;

    this.username = function() {
        return pass.username;
    };

    this.password = function () {
        return pass.password;
    };
}