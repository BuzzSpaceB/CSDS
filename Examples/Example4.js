var ldap=require("./ldapjs");
var client=ldap.createClient({url: "ldap://reaper.up.ac.za"});
var base = 'ou=Computer Science,o=University of Pretoria,c=ZA';
var CSDS=require("./CSDS.js");


var Log=require("./DataStructures.js");
var req = Log.getUsersRolesForModuleRequest("u89000583", "COS330");
CSDS.getUsersRolesForModule(req, client, base, CSDS.getUsersRolesForModuleResult);
