
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