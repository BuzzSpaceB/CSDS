
var ldap=require("./ldapjs");
var client=ldap.createClient({url: "ldap://reaper.up.ac.za"});
var base = 'ou=Computer Science,o=University of Pretoria,c=ZA';
var CSDS=require("./CSDS.js");
var Log=require("./DataStructures.js");
var userCred =Log.getUser("u89000379","Lees");
var LoginRequest=Log.getLoginRequest(userCred);
var getUsersWithRoleRequest=Log.getUsersWithRoleRequest("stud_COS301")
CSDS.getUsersWithRole(getUsersWithRoleRequest,client,base,CSDS.getUsersWithRoleResult)
