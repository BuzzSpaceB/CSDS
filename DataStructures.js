module.exports.getUser=function UsernamePasswordCredentials(username, password)
{
	temp=new Object();
    temp.username = username;
    temp.password = password;
    return temp;
}

module.exports.getLoginRequest=function LoginRequest(usernamePasswordCredentials) 
{
    var pass = usernamePasswordCredentials;
    this.username = function() 
    {
        return pass.username;
    };

    this.password = function () 
    {
        return pass.password;
    };
    return this;
}

module.exports.getUsersWithRoleRequest=function getUsersWithRoleRequest(_roleid) 
{
    var roleid =_roleid;
    this.roleID = function()
    {
        return roleid;
    };
    return this;
}

module.exports.getUsersRolesForModuleRequest=function getUsersWithRoleRequest(_uid,_moduleid) 
{
    var moduleid =_moduleid;
    var uid=_uid;
    this.moduleID = function() 
    {
        return moduleid;
    };
    this.uID = function() 
    {
        return uID;
    };
    return this;
}

module.exports.getUsersRolesForModuleRequest = function getUsersRolesForModuleRequest(_uID, _mID) {
    var mID = _mID;
    var uID = _uID;
    this.mID = function() {
        return mID;
    };
    this.uID = function() {
        return uID;
    };
    return this;
}

module.exports.getUsersRolesForModuleResult = function getUsersRolesForModuleResult(_message, _uID, _mID, _rolls) {
    var message = _message;
    var uID = _uID;
    var mID = _mID;
    var rolls = _rolls;
    this.message = function () {
        return message;
    };
    this.mID = function() {
        return mID;
    };
    this.uID = function () {
        return uID;
    };
    this.rolls = function () {
        return rolls;
    };
    return this;
}
