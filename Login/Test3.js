/**
 * Created by Sannah Msiza on 2015/03/27.
 */
var logon= require("./login");
var ldap =require("./../node_modules/ldapjs/lib/index");
var client=ldap.createClient({
    url: "ldap://sreaper.up.ac.za"
});

logon.CheckCon(client,logon.CheckConnection,"u89080379", "Lees");