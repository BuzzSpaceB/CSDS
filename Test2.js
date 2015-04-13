
var ldap=require("./ldapjs");
var client=ldap.createClient({url: "ldap://reaper.up.ac.za"});
var base = 'ou=Computer Science,o=University of Pretoria,c=ZA';
var CSDS=require("./CSDS.js");


var Log=require("./LoginRequest.js");
var userCred =Log.getUser("u89000379","Lees");
var LoginRequest=Log.getLoginRequest(userCred);

CSDS.checkConection(client,base,connectionResult);

function connectionResult(msg,state,client)
{
  if(!state)
      {
        client.unbind();
        throw msg;
      }
  else
     {
       CSDS.Login(LoginRequest,client,base,LoginResult)
     }  
}

function LoginResult(msg,uid)
{
  if(uid==null)
  {
    throw msg;
  }
  else
  {
    console.log(uid);
  }
}