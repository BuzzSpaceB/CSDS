
 module.exports.getConection=function(urls)
 { 
      if(urls==null)
	 urls="ldap://reaper.up.ac.za";
	 
      var ldap=require("./ldapjs");
   return ldap.createClient({url: urls});
 }
 
 
function Check(client,base,Result)
{
    if(base.length==0)
    {
        base = 'ou=Computer Science,o=University of Pretoria,c=ZA';
    }
    var opts =
    {
        filter: "uid=*",//LoginRequest.username(),//+loginRequest.username();
        scope: 'sub'
    };

    var entry;
    var assert=require("assert");
    return client.search(base, opts, function (err, res) {
        if (err)
            return Result("UnSuccessful_Connection",false,client);

        res.on('searchEntry', function (_entry) {
          // console.log(_entry.toObject());
            entry = _entry;
        });

        res.on('error', function (err) {
            return Result("UnSuccessful_Connection",false,client);
        });

        res.on('end', function () {

            return Result("Successful_Connection",true,client);

        });
    });
}

module.exports.getUsersWithRole= function(getUsersWithRoleRequest,client,base,getUsersWithRoleResult)
{
Check(client,base,function(msg,state,client)
{
  if(!state)
      {
        client.unbind();
        throw msg;
      }
  else
     {
      getUsersWithRole(getUsersWithRoleRequest,client,base,getUsersWithRoleResult)
     }
}     
);
}

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

