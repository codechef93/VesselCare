const { interfaceObj } = require("./interfaces/SQLInterface.js");
const UserAccountService = require("./UserAccountService.js");
class ServiceManager {
  constructor() {
    this.monitoredTags = [];
    this.sqlService = interfaceObj;
    this.userAccountApi = new UserAccountService(interfaceObj);
  }
  GetUserAccountApi() {
    return this.userAccountApi;
  }
  GetSQLService() {
    return this.sqlService;
  }
}
module.exports = ServiceManager;
