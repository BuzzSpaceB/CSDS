/*
  this function creates a UsernamePasswordCredentials object 
  it has 2 parameters username, password
  @username name of user who wants to login
  @password password of user who wants to login
*/
module.exports.getUser=function UsernamePasswordCredentials(username, password)
{
	temp=new Object();
    temp.username = username;
    temp.password = password;
    return temp;
}

/*this function creates a  LoginRequest object using UsernamePasswordCredentials object 
 @param UsernamePasswordCredentials this the UsernamePasswordCredentials object
*/
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
/*this function creates a getUsersWithRoleRequest 
  it has 1 paramter _roleid
  @param _roleid this paramter the roleid needed to get all users with that same role id
*/
module.exports.getUsersWithRoleRequest=function getUsersWithRoleRequest(_roleid) 
{
    var roleid =_roleid;
    this.roleID = function()
    {
        return roleid;
    };
    return this;
}

/*this function creates a getUsersRolesForModuleRequest
  it has 2 paramter _uID, _mID
  @param_uID this is ther user id of the person you with the specific role
  @param_mID this is the module ID to filter the person with his specific role in a module
*/
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


