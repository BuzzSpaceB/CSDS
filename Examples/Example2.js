var base = 'ou=Computer Science,o=University of Pretoria,c=ZA';
var CSDS=require("./CSDS.js");
var client=CSDS.getConection();
var Log=require("./DataStructures.js");
var userCred =Log.getUser("u89000379","Lees");
var LoginRequest=Log.getLoginRequest(userCred);
CSDS.Login(LoginRequest,client,base,CSDS.LoginResult);
