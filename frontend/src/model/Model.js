import socketIOClient from "socket.io-client";
const axios = require("axios");
// require('dotenv').config()
class Model {
  constructor() {
    this.socketEndPoint = process.env.REACT_APP_RIGCAREBACKENDURL;
    this.apiEndPoint = process.env.REACT_APP_RIGCAREBACKENDURL;
    // this.socketEndPoint =
    //   "https://assetcaredemo.keppelom.com/ah2stagingwebservice";
    // this.apiEndPoint =
    //   "https://assetcaredemo.keppelom.com/ah2stagingwebservice";
    // this.socketEndPoint = "http://localhost:5000/ah2stagingwebservice";
    // this.apiEndPoint = "http://localhost:5000/ah2stagingwebservice";

    // this.socketEndPoint = "https://assetcaredemo.keppelom.com/assetcarestagingwebservice"
    // this.apiEndPoint = "https://assetcaredemo.keppelom.com/assetcarestagingwebservice"
    // http://komassetcare.keppelom.com/OTD
    // this.socket = socketIOClient(this.socketEndPoint);
    // this.socket = null
  }

  uploadPDF(body, callback) {
    axios
      .post(this.apiEndPoint + "/file/pdf/upload", body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(function (response) {
        if (response !== null) {
          callback(response.data, null);
          return;
        }
      });
  }
  getwoLocalStorage(path, params, callback) {
    axios
      .get(this.apiEndPoint + path, {
        params: params,
      })
      .then(function (res) {
        callback(res.data, null);
      })
      .catch(function (error) {
        callback(null, error);
      });
  }
  postwoLocalStorage(path, body, callback) {
    axios
      .post(this.apiEndPoint + path, body, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        if (response !== null) {
          callback(response.data, null);
        }
      })
      .catch(function (error) {
        callback(null, error);
      });
  }
  get(path, params, callback) {
    const AuthStr = "Bearer ".concat(
      localStorage.getItem("authenticationToken")
    );
    axios
      .get(this.apiEndPoint + path, {
        params: params,
        headers: {
          Authorization: AuthStr,
        },
      })
      .then(function (res) {
        callback(res.data, null);
      })
      .catch(function (error) {
        callback(null, error);
      });
  }
  postReq(path, body, callback) {
    const AuthStr = "Bearer ".concat(
      localStorage.getItem("authenticationToken")
    );
    body["projname"] = localStorage.getItem("project") || "B357";
    axios
      .post(this.apiEndPoint + path, body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: AuthStr,
        },
      })
      .then(function (response) {
        if (response !== null) {
          callback(response.data, null);
        }
      })
      .catch(function (error) {
        callback(null, error);
      });
  }
}
export default Model;
