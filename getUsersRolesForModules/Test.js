var logon= require("./../Login/login");
var logon2= require("./getUserRolesforModules");
var ldap =require("./../node_modules/ldapjs/lib/index");
var client=ldap.createClient({
    url: "ldap://reaper.up.ac.za"
});

logon.CheckCon(client,logon2.CheckConnection,"u89000379","u89000379");