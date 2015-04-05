module.exports.GetUserInfo= function UserInfo(client,UserInfoRequest,UserInfoResult)
{
    base='ou=Computer Science,o=University of Pretoria,c=ZA';
    var opts =
    {
        filter: "uid="+UserInfoRequest.username(),
        scope: 'sub'
    };

    var entry;
    var assert=require("assert");
    return client.search(base, opts, function (err, res) {
        if (err)
            return UserInfoResult("Error in retrieving information",false);

        res.on('searchEntry', function (_entry) {
            entry = _entry;
        });

        res.on('error', function (err) {
            return UserInfoResult("Error in retrieving information",false);
        });

        res.on('end', function () {
            if (!entry){
                return UserInfoResult(UserInfoRequest.username()+" not found in LDAP",false);
            }
            switch (UserInfoRequest.infoType){
                case "title":return UserInfoResult(entry.object.title,true);
                break;
                case "initials":return UserInfoResult(entry.object.initials,true);
                break;
                case "id":return UserInfoResult(entry.object.st,true);
                break;
                case "surname":return UserInfoResult(entry.object.sn,true);
                break;
                case "uid":return UserInfoResult(entry.object.uid,true);
                break;
                case "email":return UserInfoResult(entry.object.mail,true);
                break;
                case "fname":return UserInfoResult(entry.object.cn,true);
                break;
                default:return UserInfoResult("Invalid infoType entered",false);
                break;
            }
        });
    });
}

module.exports.CheckInfo= function CheckInfo(result,status){
    if (status){
        console.log(result);
    } else {
        console.log("Error: "+result);
    }
}

module.exports.UserInfoRequest=function UserInfoRequest(username,infoType) {
    this.username = function(){
        return username;
    };
    this.infoType = function(){
        return infoType;
    };
}