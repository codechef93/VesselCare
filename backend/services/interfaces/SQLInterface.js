const sql = require("mssql");
const config = require("../../config/config.js");
("use strict");
class SqlInterface {
  constructor() {
    this.config = {
      server: config.sqlServer,
      database: config.sqlDb,
      port: config.sqlPort,
      user: config.sqlUser,
      password: config.sqlPassword,
      options: {
        encrypt: true,
        enableArithAbort: true,
        trustServerCertificate: true,
      },
    };
  }

  ConnectDB(callback) {
    if (this.pool == undefined) {
      new sql.ConnectionPool(this.config)
        .connect()
        .then((pool) => {
          this.pool = pool;
          callback(pool);
        })
        .catch((err) => {
          callback(null);
        });
    } else {
      callback(this.pool);
    }
  }

  PerformQueryPromise(queryString, inputs) {
    return new Promise(async (res, rej) => {
      try {
        let pool = await sql.connect(this.config);
        if (pool == null) {
          rej("SQL Down");
        }
        let req = new sql.Request(pool);
        var i, currInput;
        for (i = 0; i < inputs.length; i++) {
          currInput = inputs[i];
          if (currInput.value == null || currInput.value == undefined) {
            req.input(currInput.name, currInput.value);
          } else if (currInput.type == undefined) {
            req.input(currInput.name, currInput.value);
          } else {
            req.input(currInput.name, currInput.type, currInput.value);
          }
        }
        req.query(queryString, function (err, result) {
          if (err) {
            console.log(err);
            rej(err);
          }
          res(result.recordset);
        });
      } catch (e) {
        console.log(e);
      }
    });
  }
  async ExecuteStoredProcedure(procedureName, inputs, callback) {
    // this.ConnectDB(function (pool) {
    let request = await sql.connect(this.config);
    var i, currInput;
    for (i = 0; i < inputs.length; i++) {
      currInput = inputs[i];
      request.input(currInput.name, currInput.type, currInput.value);
    }
    request
      .execute(procedureName)
      .then(function (results) {
        callback(results, null);
      })
      .catch(function (err) {
        console.log(`${procedureName} failed`);
        callback(null, err);
      });
    // });
  }
}
module.exports = {
  interfaceObj: new SqlInterface(),
  constructor: SqlInterface,
};
