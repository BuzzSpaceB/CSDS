/**
 * Created by Sannah Msiza on 2015/04/02.
 */
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