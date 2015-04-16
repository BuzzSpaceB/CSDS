function  getUsersWithRole( getUsersWithRoleRequest,client,base,getUsersWithRoleResult)
{

    if(base.length==0)
    {
        base = 'ou=Computer Science,o=University of Pretoria,c=ZA';
    }
        var opts =
        {
            filter: "cn=" + getUsersWithRoleRequest.roleID(),//+loginRequest.username();
            scope: 'sub'
        };

        var entry;
        var assert = require("assert");
        return client.search(base, opts, function (err, res) {
            if (err)
            {
                client.unbind();
                return  getUsersWithRoleResult(err, null,null);
            }
            res.on('searchEntry', function (_entry)
            {
                entry=_entry;
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
                else
                {
                    client.unbind();
                    return  getUsersWithRoleResult(null,entry.toObject().cn,entry.toObject().memberUid);
                }
               
            });
        });

}
