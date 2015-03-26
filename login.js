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
            return LoginResult("UnSucssscessful_Connection",false);

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