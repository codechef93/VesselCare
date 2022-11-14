const sql = require("mssql");
const config = require("../config/config");
const { interfaceObj } = require("./interfaces/SQLInterface");
("use strict");
const SECRET = config.secretJWT;
class UserAccountService {
  constructor() {
    this.sqlInterface = interfaceObj;
  }

  async GetUserInfo(username) {
    console.log("GetUserInfoFromService--", username);
    let input = [
      {
        name: "userName",
        type: sql.VarChar(255),
        value: username,
      },
    ];

    console.log("This is input data:", input);

    let userData = await this.sqlInterface.PerformQueryPromise(
      `SELECT ua.id, ua.username FROM dbo.${config.sqlTables.USERACCOUNT} ua WHERE ua.username=@userName`,
      input
    );
    console.log("before rows", userData);
    if (userData.length > 0) {
      let rows = await this.sqlInterface.PerformQueryPromise(
        `SELECT pa.projectId, pa.name FROM dbo.${config.sqlTables.USERACCOUNTPROJECT} AS up
          LEFT JOIN dbo.${config.sqlTables.PROJECT} AS pa ON up.projectId = pa.ProjectId WHERE up.accountId = ${userData[0].id}`,
        []
      );

      console.log("after rows");
      var userinfo = {
        username: userData[0].username,
        projects: rows,
      };
      console.log(
        `The User are found. Username Is: ${username}. and Returning user info: ${userinfo}`
      );
      return userinfo;
    }
    throw new Error("User ID and Username are not found!");
  }
}
module.exports = UserAccountService;
