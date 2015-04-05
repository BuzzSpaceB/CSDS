var logon= require("./GetUserInfo");
var ldap =require("./../node_modules/ldapjs");
var client=ldap.createClient({
    url: "ldap://reaper.up.ac.za"
});

logon.GetUserInfo(client,new logon.UserInfoRequest("u89000379","title"),logon.CheckInfo);
logon.GetUserInfo(client,new logon.UserInfoRequest("u89000379","initials"),logon.CheckInfo);
logon.GetUserInfo(client,new logon.UserInfoRequest("u89000379","id"),logon.CheckInfo);
logon.GetUserInfo(client,new logon.UserInfoRequest("u89000379","surname"),logon.CheckInfo);
logon.GetUserInfo(client,new logon.UserInfoRequest("u89000379","uid"),logon.CheckInfo);
logon.GetUserInfo(client,new logon.UserInfoRequest("u89000379","email"),logon.CheckInfo);
logon.GetUserInfo(client,new logon.UserInfoRequest("u89000379","fname"),logon.CheckInfo);

