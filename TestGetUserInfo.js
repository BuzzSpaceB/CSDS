var logon= require("./login");
var ldap =require("./ldapjs");
var client=ldap.createClient({
    url: "ldap://reaper.up.ac.za"
});

logon.GetUserInfo(client,newUserInfoRequest("u89000379","title"),CheckInfo);
logon.GetUserInfo(client,newUserInfoRequest("u89000379","initials"),CheckInfo);
logon.GetUserInfo(client,newUserInfoRequest("u89000379","id"),CheckInfo);
logon.GetUserInfo(client,newUserInfoRequest("u89000379","surname"),CheckInfo);
logon.GetUserInfo(client,newUserInfoRequest("u89000379","uid"),CheckInfo);
logon.GetUserInfo(client,newUserInfoRequest("u89000379","email"),CheckInfo);
logon.GetUserInfo(client,newUserInfoRequest("u89000379","fname"),CheckInfo);

function CheckInfo(result,ststus){
	if (status){
		console.log(result);
	} else {
		console.log("Error: "+result);
	}
}

function UserInfoRequest(username,infoType) {
    this.username = function(){
    	return username;
    };
    this.infoType = function(){
    	return infoType;
    };
}

