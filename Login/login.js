 var ldap =require("./../node_modules/ldapjs/lib/index");
 var client=ldap.createClient({
    url: "ldap://reaper.up.ac.za"
});


module.exports.Login= function Login(LoginRequest,client,LoginResult)
{
    base='ou=Computer Science,o=University of Pretoria,c=ZA';
    var opts =
    {
        filter: "uid="+LoginRequest.username(),//+loginRequest.username();
        scope: 'sub'
    };

    var entry;
    var assert=require("assert");
    return client.search(base, opts, function (err, res) {
        if (err) {
            client.unbind();
            return LoginResult(err, null);
        }
        res.on('searchEntry', function (_entry) {
            entry = _entry;
        });

        res.on('error', function (err) {
            client.unbind();
            return LoginResult(err,null);
        });

        res.on('end', function () {
            if (!entry)
            {
                client.unbind();
                return LoginResult(new Error(LoginRequest.username() + ' not found'),null);
            }
            return client.bind(entry.dn.toString(),LoginRequest.password(), function (err) {
                if (err)
                {
                    client.unbind();
                    return LoginResult(err, client);
                }
                return client.unbind(function (err) {
                    assert.ifError(err);
                    return LoginResult(null,entry.toObject());
                });
            });
        });
    });
}

module.exports.CheckCon= function Check(client,LoginResult)
{
    base='ou=Computer Science,o=University of Pretoria,c=ZA';
    var opts =
    {
        filter: "uid=*",//LoginRequest.username(),//+loginRequest.username();
        scope: 'sub'
    };

    var entry;
    var assert=require("assert");
    return client.search(base, opts, function (err, res) {
        if (err)
            return LoginResult("UnSuccessful_Connection",false);

        res.on('searchEntry', function (_entry) {
            entry = _entry;
        });

        res.on('error', function (err) {
            return LoginResult("UnSuccessful_Connection",false);
        });

        res.on('end', function () {

            return LoginResult("Successful_Connection",true);

        });
    });
}
/**call back function to retrieve values from the ldap server
 *It has 2 parameters message na
 * **/
module.exports.LoginResult= function LoginResult(msg,obj)
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
module.exports.CheckConnection = function CheckConnection(msg,status,uname,pword)
{

    if(status)
    {
        console.log(msg);

        logon.Login(new LoginRequest(new UsernamePasswordCredentials(uname,pword)),client,LoginResult);
    }
    else
    {
        //console.log(msg);
        client.unbind();
        throw msg;
    }
}

module.exports.Credentials = function UsernamePasswordCredentials(username, password) {
    this.username = username;
    this.password = password;
}


module.exports.LoginRquest = function LoginRequest(usernamePasswordCredentials) {
    var pass = usernamePasswordCredentials;

    this.username = function() {
        return pass.username;
    };

    this.password = function () {
        return pass.password;
    };
}