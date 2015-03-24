/**
 * This file is not going to be used by the buzz system!
 * This file is intended to demonstrate my thought on what is required from this group.
 * This template contains no logic but has the structure as I understand it.
 */

var loginRequest = new LoginRequest(new UsernamePasswordCredentials("u12026442", "eequeiba"));
new CsDataSourcesAdapter().login(loginRequest);

/**
 * Main class that will be used to call login and other get methods
 */
function CsDataSourcesAdapter() {
    this.login = function(loginRequest) {
        try {
            var client = getConnectionToDataSource();
            return authenticateUserAgainstDataSource(loginRequest, client);
        } catch (e) {
            console.log(e.message);
            throw e;
        }
    };

    this.getUsersRolesForModule = function (getUsersRolesForModuleRequest) {
        //TODO: logic to get user role for module.
        return getUsersRolesForModuleResult;
    }

    this.getUsersWithRole = function(getUsersWithRoleRequest) {
        //TODO: Logic to get users with role
        return getUsersWithRoleResult;
    }

    var getConnectionToDataSource = function() {
        var ldap = require("ldapjs");
        return ldap.createClient({
            url: "ldap://reaper.up.ac.za"
        });
    }

    var authenticateUserAgainstDataSource = function(loginRequest, client) {
        var ops = {
          filter: "name=u*"
        };
        client.search('ou=Computer Science,o=University of Pretoria,c=ZA', ops, function (err, res) {
            //assert.ifError(err);
            console.log("Here");

            res.on("searchEntry", function (entry) {
                console.log(JSON.stringify(entry.object));
            });
        });
    }
}

/**
 * Login request is going to be sent to the login function.
 * @param usernamePasswordCredentials
 *          contains the username and password
 */
function LoginRequest(usernamePasswordCredentials) {
     var usernamePasswordCredentials = usernamePasswordCredentials;

    this.username = function() {
        return usernamePasswordCredentials.username;
    };

    this.password = function () {
        return usernamePasswordCredentials.password;
    };
}

/**
 * contains the username and password for the loginRequest.
 * @param username
 *          the user that is going to be authenticated
 * @param password
 *          the password for that user
 */
function UsernamePasswordCredentials(username, password) {
    this.username = username;
    this.password = password;
}

/**
 * What the login function is going to return
 * @param userId
 *          the user ID for the user that has successfully logged in.
 */
function LoginResult(userId) {
    this.userId = userId;
}

/**
 * Send to the getUsersRolesForModule function
 * @param userId
 *          the user id of the user who's roles will be returned
 * @param module
 *          the roles for the module with this id will be returned
 */
function GetUsersRolesForModuleRequest(userId, moduleId) {
    this.userId = userId;
    this.moduleId = moduleId;
}

/**
 * returned by the getUsersRolesForModule function
 * @param getUsersRolesForModuleRequest
 *          dependency injecting the userId and moduleId
 * @param roles
 *          the roles for that user
 */
function GetUsersRolesForModuleResult(getUsersRolesForModuleRequest, roles) {
    this.userId = getUsersRolesForModuleRequest.userId;
    this.moduleId = getUsersRolesForModuleRequest.moduleId;
    this.roles = roles;
}

/**
 * send to the getUsersWithRole function
 * @param userId
 *          ??????
 * @param moduleId
 *          the id for the module that will be examined.
 * @param roleId
 *          the id of the role that is being searched for
 */
function GetUsersWithRoleRequest(userId, moduleId, roleId) {
    this.userId = userId;
    this.moduleId = moduleId;
    this.roleId = roleId;
}

/**
 * returned by getUsersWithRole function
 * @param getUsersWithRoleRequest
 *          dependency injecting the roleId
 * @param userId
 *          the Ids of all the users that take part in this role
 */
function GetUsersWithRoleResult(getUsersWithRoleRequest, userId) {
    this.roleId = getUsersWithRoleRequest.roleId;
    this.userId = userId;
}

/**
 * thrown when connecting to the LDap server / database fails
 * @param message
 *          the message relating to the problem can be null.
 * @param cause
 *          for exception chaining, the exception that caused the exception. Can be null
 */
function CouldNotConnectToCsDataSourcesException(message, cause) {
    this.message = message;
    this.cause = cause;
}

/**
 * Thrown when a user cannot be authenticated for whatever reason.
 * @param message
 *          the message relating to the problem can be null.
 * @param cause
 *          for exception chaining, the exception that caused the exception. Can be null
 */
function CouldNodeAuthenticateException(message, cause) {
    this.message = message;
    this.cause = cause;
}