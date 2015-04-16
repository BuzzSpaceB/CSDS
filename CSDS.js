/* this function connects to a ldap server and returns the client
  @ param urls : that is the url for th server
 */
 module.exports.getConection=function(urls)
 { 
      if(urls==null)
	 urls="ldap://reaper.up.ac.za";
	 
      var ldap=require("./ldapjs");
   return ldap.createClient({url: urls});
 }
 
 /*
   this function will recive the client parameter and then check if it is connnected to that server
   @param client this is the client object that needs to checked
   @param base this is the base used for the search
   @param result this is the call back parameter
 */
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

/*this is the wrapper function for getUsersWithRole
  it receives the 4 parameters and pass it to the getUsersWithRole function
  @param getUsersWithRoleRequest request object which has the roleID
  @param client object that connects to the server
  @param base string for ldap search
  @param getUsersWithRoleResult call back function
*/
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
/*this  function gets an array of users for specific role
  it receives the 4 parameters and passed in it 
  @param getUsersWithRoleRequest request object which has the roleID
  @param client object that connects to the server
  @param base string for ldap search
  @param getUsersWithRoleResult call back function
*/
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
/*this is the wrapper function for Login
  it receives the 4 parameters and pass it to the Login function
  @param LoginRoleRequest request with user credentitals for loggin in
  @param client object that connects to the server
  @param base string for ldap search
  @param LoginResult call back function
*/
module.exports.Login= function(LoginRequest,client,base,LoginResult)
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
	       Login(LoginRequest,client,base,LoginResult)
	     } 
}     
);

}

/*this function Logs in a user via his/her credentials
  it receives the 4 parameters and passed in it
  @param LoginRoleRequest request with user credentitals for loggin in
  @param client object that connects to the server
  @param base string for ldap search
  @param LoginResult call back function
*/
function Login(LoginRequest,client,base,LoginResult)
{
    if(base.length==0)
    {
        base = 'ou=Computer Science,o=University of Pretoria,c=ZA';
    }
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
                    return LoginResult(err, null);
                }
                return client.unbind(function (err) {
                    assert.ifError(err);
                    return LoginResult(null,entry.toObject().uid);
                });
            });
        });
    });
}
/*this is the wrapper function for getUsersRolesForModule
  it receives the 4 parameters and pass it to the getUsersRolesForModule function
  @param getUsersRolesForModuleRequest request with moduleID and userID as attributes
  @param client object that connects to the server
  @param base string for ldap search
  @param getUsersRolesForModuleResult call back function
*/
module.exports.getUsersRolesForModule= function(getUsersRolesForModuleRequest,client,base,getUsersRolesForModuleResult)
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
      getUsersRolesForModule(getUsersRolesForModuleRequest, client, base, getUsersRolesForModuleResult)
     } 
}     
);

}
/*this function gets the role for s specific user for a specific module
  it receives the 4 parameters and pass in it
  @param getUsersRolesForModuleRequest request with moduleID and userID as attributes
  @param client object that connects to the server
  @param base string for ldap search
  @param getUsersRolesForModuleResult call back function
*/
function getUsersRolesForModule(getUsersRolesForModuleRequest,client,base,getUsersRolesForModuleResult) {

    if(base.length==0)
    {
        base = 'ou=Computer Science,o=University of Pretoria,c=ZA';
    }
    var opts =
    {
        filter: "cn=*"+getUsersRolesForModuleRequest.mID(),//+loginRequest.username();
        scope: 'sub'
    };

    var entry=new Array();
    var assert = require("assert");
    return client.search(base, opts, function (err, res) {
        if (err)
        {
            client.unbind();
            console.log("EEErr");
            return getUsersRolesForModuleResult(err, null,null,null);
        }
        res.on('searchEntry', function (_entry)
        {

            entry.push(_entry.toObject());
        });

        res.on('error', function (err) {
            client.unbind();
            return getUsersRolesForModuleResult(err, null,getUsersRolesForModuleRequest.mID(),getUsersRolesForModuleRequest.uID());
        });

        res.on('end', function () {
            if (entry.length==0)
            {
                client.unbind();

                return getUsersRolesForModuleResult(new Error(getUsersRolesForModuleRequest.mID() + ' is not a Existing module'), null,null,null);
            }
            else
            {  var arr=new Array();
                for(var i=0;i<entry.length;i++)
                {
                    if(entry[i].memberUid!=null)
                    {
                        for (var j = 0; j < entry[i].memberUid.length; j++) {
                            if (entry[i].memberUid[j] == getUsersRolesForModuleRequest.uID())
                                arr.push(entry[i].cn);
                        }
                    }
                }
                if(arr.length==0)
                {
                    client.unbind();
                    return getUsersRolesForModuleResult(new Error(getUsersRolesForModuleRequest.mID()+" does not Exist or Doesn not have this module"),getUsersRolesForModuleRequest.uID(), getUsersRolesForModuleRequest.mID(),arr);
                }
                else
                {
                    client.unbind();
                    return getUsersRolesForModuleResult(null,getUsersRolesForModuleRequest.uID(), getUsersRolesForModuleRequest.mID(), arr);
                }
            }
           
        });
    });

}

//CALLBACK FUNCTIONS


module.exports.LoginResult=function LoginResult(msg,uid)
{
  if(uid==null)
  {
    throw msg;
  }
  else
  {
    result=new Object();
    result.uid=uid;
    result.message="Succesfull Conection";
    return JSON.stringify(result);
    
  }
}

module.exports.getUsersWithRoleResult=function getUsersWithRoleResult(msg,roleID,membersArray)
{
  if(roleID==null)
  {
    throw msg;
  }
  else
  { result=new Object();
    result.roleID=roleID;
    result.members=membersArray;
    console.log(roleID);
    console.log(membersArray);
    return JSON.stringify(result);
  }
}

module.exports.getUsersRolesForModuleResult=function getUsersRolesForModuleResult(_message, _uID, _mID, _rolls)
{
    if(_message!=null)
    {
        throw _message;
    }
    else{
        result=new Object();
        result.uid=_uID;
        result.mid=_mID;
        result.roles=_rolls;
        return JSON.stringify(result);
       }
}
