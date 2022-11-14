const { Pool } = require("pg");
const config = require("../../config/config.js");
const helperWithoutApi = require("../../helper/helperWithoutApi.js");
const moment = require("moment-timezone");
("use strict");
class PostgreSQLInterface {
  constructor(mconfig = null) {
    if (mconfig == null) {
      this.pool = new Pool(config.dbConfig);
    } else {
      this.pool = new Pool(mconfig);
    }
    // this.pool.query(`SET search_path TO ${config.fuellngConfig.postgresDbConfig.schema};`)
  }
  ChangeDB(nconfig, callback) {
    this.pool.end().then((_) => {
      this.pool = new Pool(nconfig);
      if (nconfig.schema != undefined) {
        this.pool.query(`SET search_path TO ${nconfig.schema};`).then((_) => {
          callback();
        });
      } else {
        callback();
      }
    });
  }
  async InsertRow(datarow, mapping, tablename) {
    var newrow = {};
    Object.keys(mapping).forEach((key) => {
      newrow = helperWithoutApi.updateObjForPG(
        datarow[key],
        `${mapping[key].col}`,
        newrow
      );
    });
    return await this.PerformInsertPromise(tablename, newrow, "*");
  }
  async GetDataFromTable(tablename, mapping, whereconditions, orderByCol) {
    const rows = Object.values(mapping).map((col) => {
      return `${col.col}`;
    });
    let whereStatement = "";
    let inputs = [];
    if (Object.keys(whereconditions).length > 0) {
      whereStatement = "WHERE ";
      Object.keys(whereconditions).forEach((key, i) => {
        whereStatement += `${key}=$${i + 1}`;
        inputs.push(whereconditions[key]);
        if (i < Object.keys(whereconditions).length - 1) {
          whereStatement += ` AND `;
        }
      });
    }
    let orderByStatement = "";
    if (!helperWithoutApi.IsEmpty(orderByCol)) {
      orderByStatement = `ORDER BY ${orderByCol}`;
    }
    let logs = await this.PerformQueryPromise(
      `
            SELECT ${rows.join(",")}
            FROM ${tablename}
            ${whereStatement}
            ${orderByStatement}
        `,
      inputs
    );
    return logs.map((log) => {
      let temp_log = {};
      Object.keys(mapping).forEach((key) => {
        if (mapping[key].type == "decimal") {
          temp_log[key] = parseFloat(log[mapping[key].col]);
        } else if (
          mapping[key].type == "datetime" &&
          log[mapping[key].col] != null
        ) {
          temp_log[key] = moment(log[mapping[key].col]);
        } else if (mapping[key].type == "integer") {
          temp_log[key] = parseInt(log[mapping[key].col]);
        } else if (mapping[key].type == "identity") {
          temp_log[key] = parseInt(log[mapping[key].col]);
        } else {
          temp_log[key] = log[mapping[key].col];
        }
      });
      return temp_log;
    });
  }
  async ClearDB(config) {
    let schema = await this.pool.query(`SHOW search_path;`);
    if (schema.rows[0].search_path != "test") {
      throw new Error("Non test schema selected");
    }
    await Promise.all(
      Object.keys(config.sqlTables).map(async (key) => {
        if (
          config.sqlTables[key] != "vessel" &&
          config.sqlTables[key] != "crew" &&
          config.sqlTables[key] != "lock"
        ) {
          await this.PerformQueryPromise(
            `DELETE FROM ${config.sqlTables[key]}`,
            []
          );
          return key;
        } else {
          return key;
        }
      })
    );
    return true;
  }
  // inputs is an array of values
  // [Any]
  PerformQuery(queryString, inputs, callback) {
    this.pool.query(queryString, inputs, (error, result) => {
      if (result == undefined) {
        callback([], error.message);
      } else {
        callback(result.rows, error);
      }
    });
  }
  PerformQueryPromise(queryString, inputs) {
    return new Promise((res, rej) => {
      this.pool.query(queryString, inputs, (error, result) => {
        console.log(`result error:${error} and result ${result}`);
        if (result == undefined) {
          rej(error.message);
          console.log(`Response error appear:${error.message}`);
        } else {
          res(result.rows);
          console.log(`Response showed:${result.rows}`);
        }
      });
    });
  }
  PerformInsertPromise(table, newData, idColumn) {
    return new Promise((res, rej) => {
      this.PerformInsert(table, newData, idColumn, (val, err) => {
        if (err == null) {
          res(val[0]);
        } else {
          rej(err);
        }
      });
    });
  }
  PerformBatchInsertPromise(table, newDataArr) {
    return new Promise((res, rej) => {
      this.PerformBatchInsert(table, newDataArr, (val, err) => {
        if (err == null) {
          res(val);
        } else {
          rej(err);
        }
      });
    });
  }
  PerformUpdatePromise(table, newData, conditions) {
    return new Promise((res, rej) => {
      this.PerformUpdate(table, newData, conditions, (val, err) => {
        if (err == null) {
          res(val);
        } else {
          rej(err);
        }
      });
    });
  }
  PerformBatchInsert(table, newDataArray, callback) {
    var initialSQL = `INSERT INTO ${table} (`;
    if (
      newDataArray instanceof Array &&
      newDataArray.length > 0 &&
      Object.keys(newDataArray[0]).length > 0
    ) {
      var insertProperties = Object.keys(newDataArray[0]);
      var rows = [];
      insertProperties.forEach((property, i) => {
        initialSQL += `${property}`;
        if (i != insertProperties.length - 1) {
          initialSQL += `, `;
        }
      });
      initialSQL += `) VALUES `;
      var k = 1;
      newDataArray.forEach((data, i) => {
        initialSQL += "(";
        insertProperties.forEach((property, j) => {
          initialSQL += `$${k}`;
          k += 1;
          if (j < insertProperties.length - 1) {
            initialSQL += `,`;
          }
          rows.push(data[property]);
        });
        initialSQL += ")";
        if (i < newDataArray.length - 1) {
          initialSQL += `,`;
        }
      });
      initialSQL += ` RETURNING *;`;
      this.PerformQuery(initialSQL, rows, callback);
    } else {
      initialSQL = `INSERT INTO ${table} VALUES (DEFAULT) RETURNING *;`;
      this.PerformQuery(initialSQL, insertValues, callback);
    }
  }
  PerformInsert(table, newData, idColumn, callback) {
    var initialSQL = `INSERT INTO ${table} (`;
    var insertProperties = Object.keys(newData);
    var insertValues = [];
    if (insertProperties.length == 0) {
      initialSQL = `INSERT INTO ${table} VALUES (DEFAULT) RETURNING ${idColumn};`;
      this.PerformQuery(initialSQL, insertValues, callback);
      return;
    }
    insertProperties.forEach((property, i) => {
      initialSQL += `${property}`;
      if (i != insertProperties.length - 1) {
        initialSQL += `, `;
      }
      insertValues.push(newData[property]);
    });
    initialSQL += `) VALUES (`;
    var pgkey = 0;
    insertProperties.forEach((property, i) => {
      pgkey = i + 1;
      initialSQL += `$${pgkey}`;
      if (i != insertProperties.length - 1) {
        initialSQL += `, `;
      }
    });
    initialSQL += `) RETURNING ${idColumn};`;
    this.PerformQuery(initialSQL, insertValues, callback);
  }
  PerformUpdate(table, newData, conditions, callback) {
    var initialSQL = `UPDATE ${table} SET `;
    var updateProperties = Object.keys(newData);
    var updateValues = [];
    if (updateProperties.length == 0) {
      callback(null, null);
      return;
    }
    var pgkey = 0;
    updateProperties.forEach((property, i) => {
      pgkey = i + 1;
      initialSQL += `${property}=$${pgkey} `;
      if (pgkey != updateProperties.length) {
        initialSQL += `, `;
      }
      updateValues.push(newData[property]);
    });
    if (conditions && Object.keys(conditions).length > 0) {
      initialSQL += "WHERE";
      var conditionProperties = Object.keys(conditions);
      conditionProperties.forEach((property, i) => {
        pgkey += 1;
        initialSQL += ` ${property}=$${pgkey} `;
        if (i != conditionProperties.length - 1) {
          initialSQL += ` AND `;
        }
        updateValues.push(conditions[property]);
      });
    }
    initialSQL += ` RETURNING *;`;
    this.PerformQuery(initialSQL, updateValues, callback);
  }
}
module.exports = {
  interfaceObj: new PostgreSQLInterface(),
  constructor: PostgreSQLInterface,
};
