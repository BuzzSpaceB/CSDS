var logon= require("./../Login/login");
var ldap =require("./../node_modules/ldapjs/lib/index");
var client=ldap.createClient({
    url: "ldap://reaper.up.ac.za"
});
logon.CheckCon(client,logon.CheckConnection,"u89000379", "Lees");