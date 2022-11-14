import React, { useState, useEffect } from "react";
import ReactSpeedometer from "react-d3-speedometer";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import {
  LineChart,
  ResponsiveContainer,
  Legend,
  Tooltip,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

//import { Leaflet } from "../../model/leaflet";
import "../../scss/styles.scss";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

//var L = window.L;
import L from "leaflet";

const timeInterval = 5; // time interval for aframe or jib chart(seconds)
const mockdata = {
  AFRAME_LOAD: 0,
  JIB_LOAD: 0,
  OUTREACH_AFRAME: 0,
  OUTREACH_JIB: 0,
  TIME: 0,
};
const mockdata1 = {
  TIME: 0,
  BOOMANGLE: 0,
};
const _pdata = [
  mockdata,
  mockdata,
  mockdata,
  mockdata,
  mockdata,
  mockdata,
  mockdata,
  mockdata,
  mockdata,
];
const _pdata1 = [
  mockdata1,
  mockdata1,
  mockdata1,
  mockdata1,
  mockdata1,
  mockdata1,
  mockdata1,
  mockdata1,
  mockdata1,
];

const Dashboard = () => {
  // const url = "https://assetcaredemo.keppelom.com/ah2";
  //const url = "http://localhost:5000/ah2stagingwebservice/";
  const url = process.env.REACT_APP_LOCALHOSTURL;
  const [product, setProduct] = useState(null);
  const [device, setDevice] = useState(null);
  const [pdata, setPdata] = useState(_pdata);
  const [pdata1, setPdata1] = useState(_pdata1);
  const [volume, setVolume] = useState(1);
  const [volume2, setVolume2] = useState(1);
  const [rerender, setRerender] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dbConnection, setDbConnetion] = useState(false);
  const [data, setData] = useState({
    speed: 10,
    time: 0,
    position: [51.505, -0.09],
  });
  console.log(product, "product");

  const timeFilter = (time) => {
    let strTime;
    console.log(time, "time", typeof time);
    if (typeof time === "string") {
      strTime = time.substring(11, 16);
    } else {
      strTime = "str is not a string";
    }
    return strTime;
  };
  useEffect(() => {
    getData();
    getMapData();
    const interval1 = setInterval(() => {
      // for chart data
      getData();
    }, timeInterval * 1000);
    const interval2 = setInterval(() => {
      // for map data
      getMapData();
    }, (10 * 1000) / 1);
    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getLatLng = (field) => {
    console.log(field);
    // const arr = field.split(",");
    // const idx = arr.findIndex((e) => {
    //   return e.toLowerCase().indexOf("latitude") != -1;
    // });
    // console.log(idx,"idx")
    // const _lat = arr[idx].split(":");
    // const lat = _lat[_lat.length - 1];
    // const lat = field.Latitude;
    // // const _lon = arr[idx + 1].split(":");
    // const lon = field.Longitude;
    // // const _speed = arr[idx + 2].split(":");
    // const speed = field.Speed;
    // // const _time = arr[arr.length - 1];
    // // const idx2 = _time.indexOf(":");
    // const time = field.Receieveddatetime; //_time.substring(idx2 + 2, _time.length - 3);
    // // console.log(_lat);
    const {
      Latitude: lat,
      Longitude: lon,
      Speed: speed,
      Receieveddatetime: time,
    } = field;
    return [parseFloat(lat), parseFloat(lon), speed, time];
  };

  const getMapData = () => {
    axios
      .get(url + "getMapData")
      .then((res) => {
        console.log("Map", res.data);
        console.log(res.data[0].AH2Datafieldvalues);
        const [lat, lon, speed, time] = getLatLng(
          JSON.parse(res.data[0].AH2Datafieldvalues).Positions
        );
        /*         buildMap(lat, lon, speed, time);*/
        setData({
          position: [lat, lon],
          speed,
          time,
        });
      })
      .catch((err) => console.log(err));
  };

  //function buildMap(lat, lon, speed, time) {
  // console.log(typeof lat, lat, typeof lon, lon)
  /*  document.getElementById('weathermap').innerHTML =
      "<div id='map' style='width: 100%; height: 800px;'></div>"; */
  /* var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      osmAttribution =
        'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors,' +
        ' <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
      osmLayer = new L.TileLayer(osmUrl, {
        maxZoom: 18,
        attribution: osmAttribution,
      }); */
  /* var map = new L.Map('map');
    map.setView(new L.LatLng(lat, lon), 14);
    map.addLayer(osmLayer); */
  /* var marker = L.marker([lat, lon], { icon: shipIcon }).addTo(map); */
  /* marker
      .bindPopup(
        `<span>Asset Name: Asian Hercules 2</span><br><span>Speed: ${speed}</span><br><span>Last Update: ${time} (Singapore Standard Timezone)</span>`,
        { closeButton: false }
      )
      .openPopup(); */
  // var validatorsLayer = new OsmJs.Weather.LeafletLayer({lang: 'en'});
  // map.addLayer(validatorsLayer);
  // L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  // attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  // maxZoom: 18,
  // id: 'mapbox/streets-v11',
  // tileSize: 512,
  // zoomOffset: -1,
  // accessToken: 'your.mapbox.access.token'
  // }).addTo(map);
  //}

  const getData = () => {
    axios
      .get(url)
      .then((res) => {
        console.log(res.data, "ReceivedDateTime");
        const oneData = {
          TIME: timeFilter(res.data[0].ReceivedDateTime),
          BOOMANGLE: res.data.BOOMANGLE,
        };
        // temp1.push(oneData);
        // console.log(temp1);
        // if(temp1.length > 20) temp1.shift();
        setPdata1((oldArray) => {
          let newArray = [...oldArray, oneData];
          if (newArray.length > 10) newArray.shift();
          return newArray;
        });
        setProduct(res.data[0]);
        // let pdata1_new = [...pdata1, oneData];
        // let pdata1_new = pdata1.concat([oneData]);
        // console.log(pdata1_new);
        // if (pdata1_new.length > 10) {
        //   console.log('leng', pdata1_new.length)
        //   pdata1_new.shift();
        // }
        // setPdata1(pdata1_new);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(url + "getAssets")
      .then((res) => {
        const oneData = {
          AFRAME_LOAD: res.data[1].Load,
          JIB_LOAD: res.data[0].Load,
          OUTREACH_AFRAME: product ? product.AFCURR : 0,
          OUTREACH_JIB: product ? product.JIBCURR : 0,
          TIME: timeFilter(res.data[0].ReceivedDateTime),
        };
        setPdata((oldArray) => {
          let newArray = [...oldArray, oneData];
          if (newArray.length > 10) newArray.shift();
          return newArray;
        });
        setDevice(res.data);
        // let pdata_new = [...pdata, oneData];
        // let pdata_new = pdata.concat([oneData]);
        // console.log(pdata_new);
        // if (pdata_new.length > 20) pdata_new.shift();
        // setPdata(pdata_new);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  var markerIcon = L.icon({
    iconUrl: "/ship-64.png",

    iconSize: [30, 30], // size of the icon
    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
  });

  return (
    <>
      {product && device && (
        <div className="home-dashboard space-between">
          <div className="container-fluid">
            <Row>
              <Col xs={12} sm={12} md={12} lg={8}>
                <div className="section-frame">
                  <div className="section-frame-header">
                    <div className="A-Fram">
                      <div className="afram-homee aframe-left">
                        <div className="Abtn-home">
                          <div className="text-home">
                            <h3>A-FRAME(TON)</h3>
                          </div>
                          <button className="btn-agroup-home">
                            <span>M2</span>
                            <br />
                            {device[1].Load}
                          </button>
                          <button
                            className="btn-agroup-home"
                            style={{ opacity: "0.3" }}
                          >
                            <span>M</span>
                            <br />0
                          </button>
                          <button
                            className="btn-agroup-home"
                            style={{ opacity: "0.3" }}
                          >
                            <span>M</span>
                            <br />0
                          </button>
                          <button className="btn-agroup-home">
                            <span>M3</span>
                            <br />
                            {device[2].Load}
                          </button>
                          <button
                            className="btn-agroup-home"
                            style={{ opacity: "0.3" }}
                          >
                            <span>M</span>
                            <br />0
                          </button>
                          <button
                            className="btn-agroup-home"
                            style={{ opacity: "0.3" }}
                          >
                            <span>M</span>
                            <br />0
                          </button>
                        </div>
                      </div>
                      <div className="afram-homee aframe-right">
                        {/* <div className="jlb"> */}
                        {/* <div className="jbtn"> */}
                        <div className="Abtn-home">
                          <div className="text-home">
                            <h3>JIB(TON)</h3>
                          </div>
                          <button className="btn-jgroup-home">
                            <span>M1</span>
                            <br />
                            {device[0].Load}
                          </button>
                          <button className="btn-jgroup-home">
                            <span>M4</span>
                            <br />
                            {device[3].Load}
                          </button>
                          {/* <button className="btn-jgroup-home" style={{opacity: '0.3'}}>
                    <span>M</span>
                    <br />0
                  </button>
                  <button className="btn-jgroup-home" style={{opacity: '0.3'}}>
                    <span>M</span>
                    <br />0
                  </button>
                  <button className="btn-jgroup-home" style={{opacity: '0.3'}}>
                    <span>M</span>
                    <br />0
                  </button>
                  <button className="btn-jgroup-home" style={{opacity: '0.3'}}>
                    <span>M</span>
                    <br />0
                  </button> */}
                        </div>
                        {/* </div> */}
                      </div>
                    </div>
                  </div>

                  <div className="phase2">
                    <h3 className="heading">A-FRAME &amp; JIB(TON)</h3>
                    <div className="App" id="phase2">
                      <Row>
                        <Col xs={6} sm={6} md={6} lg={6} xl={4}>
                          <div className="barchart-side">
                            <h4>outreach (meter)</h4>
                            <div className="barchart-bar">
                              <div className="input">
                                <p style={{ marginBottom: 65 }}>A-Frame</p>
                                <div className="Afram-home">
                                  <span className="max-value">
                                    {product.AFMAX}
                                  </span>
                                  <span
                                    className="max-value"
                                    style={{ top: 12 }}
                                  >
                                    {product.AFCURR}
                                  </span>
                                  <span className="min-value">0</span>
                                  <input
                                    type="range"
                                    min={0}
                                    max={product.AFMAX}
                                    step={0.0002}
                                    defaultValue={product.AFCURR}
                                    onChange={(event) => {
                                      setVolume(event.target.value);
                                    }}
                                    disabled
                                  />
                                </div>
                              </div>
                              <div className="input">
                                <p style={{ marginBottom: 65 }}>JIB</p>
                                <div className="Afram-home">
                                  <span className="max-value">
                                    {product.JIBMAX}
                                  </span>
                                  <span
                                    className="max-value"
                                    style={{ top: 12 }}
                                  >
                                    {product.JIBCURR}
                                  </span>
                                  <span className="min-value">0</span>
                                  <input
                                    type="range"
                                    min={0}
                                    max={product.JIBMAX}
                                    step={0.0002}
                                    defaultValue={product.JIBCURR}
                                    onChange={(event) => {
                                      setVolume2(event.target.value);
                                    }}
                                    disabled
                                  ></input>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Col>
                        <Col xs={6} sm={6} md={6} lg={6} xl={2}>
                          <div className="output-bar">
                            <div className="form-group">
                              <span className="title">
                                a-frame
                                <br />
                                load(ton)
                              </span>
                              <span className="detail">{product.AFCURR}</span>
                            </div>
                            <div className="form-group">
                              <span className="title">jib load (ton)</span>
                              <span className="detail">{product.JIBCURR}</span>
                            </div>
                          </div>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={6}>
                          <div className="rescontainer-home">
                            <ResponsiveContainer width="100%">
                              <LineChart data={pdata} margin={{ right: 50 }}>
                                <CartesianGrid horizontal={false} />
                                <XAxis
                                  dataKey="TIME"
                                  interval={"preserveStartEnd"}
                                />
                                <YAxis />
                                {/* <YAxis yAxisId="right" orientation="right"/> */}
                                <Legend
                                  verticalAlign="top"
                                  iconType={"square"}
                                />
                                <Tooltip />
                                <Line
                                  dataKey="AFRAME_LOAD"
                                  stroke="blue"
                                  dot={false}
                                />
                                <Line
                                  dataKey="JIB_LOAD"
                                  stroke="red"
                                  dot={false}
                                />
                                <Line
                                  dataKey="OUTREACH_AFRAME"
                                  stroke="green"
                                  dot={false}
                                />
                                <Line
                                  dataKey="OUTREACH_JIB"
                                  stroke="yellow"
                                  dot={false}
                                />
                              </LineChart>
                            </ResponsiveContainer>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </div>

                  <div className="phase3">
                    <h3 className="heading">Boom Angle(Degree)</h3>
                    <div className="App" id="phase3">
                      <Row>
                        <Col xs={12} sm={12} md={12} lg={12} xl={5}>
                          <div className="speedometer">
                            <label className="speedometer-pic"></label>
                            <div className="form-group speedometer-form">
                              <span className="title">
                                boom angel
                                <br />
                                (degree)
                              </span>
                              <span className="detail">
                                {product.BOOMANGLE}
                              </span>
                            </div>
                            <ReactSpeedometer
                              minValue={0}
                              maxValue={180}
                              textColor={"white"}
                              segments={7}
                              needleHeightRatio={0.8}
                              ringWidth={60}
                              value={product.BOOMANGLE}
                              customSegmentStops={[0, 30, 60, 90, 180]}
                              segmentColors={[
                                "#1e2832",
                                "#02ffa2",
                                "#1e2832",
                                "#04394D",
                                "#04394D",
                                "#04394D",
                              ]}
                              needleColor="#c98d2c"
                            />
                          </div>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={7}>
                          <div className="chart">
                            <ResponsiveContainer width="100%" height="100%">
                              <LineChart data={pdata1} margin={{ right: 50 }}>
                                <CartesianGrid horizontal={false} />
                                <XAxis
                                  tickCount={10}
                                  dataKey="TIME"
                                  interval={"preserveStartEnd"}
                                />
                                <YAxis
                                  tickCount={15}
                                  domain={["dataMin - 10", "dataMax + 10"]}
                                ></YAxis>
                                {/* <Tooltip /> */}
                                <Line
                                  dataKey="BOOMANGLE"
                                  stroke="blue"
                                  strokeWidth="5"
                                  dot={false}
                                />
                              </LineChart>
                            </ResponsiveContainer>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </div>
              </Col>
              <Col xs={12} sm={12} md={12} lg={4}>
                <div className="section-map">
                  <h5 className="heading">VESSEL OPERATIONAL STATUS</h5>
                  <MapContainer
                    key={JSON.stringify([data.position])}
                    center={data.position}
                    zoom={14}
                    maxZoom={18}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {/* <Marker
                      position={data.position}
                      icon={L.icon({
                        iconUrl: "ship-64.png",
                        // shadowUrl: 'leaf-shadow.png',
                        iconSize: [30, 30], // size of the icon
                        // shadowSize:   [50, 64], // size of the shadow
                        iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
                        // shadowAnchor: [4, 62],  // the same for the shadow
                        popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
                      })}
                    > */}
                    <Marker position={data.position} icon={markerIcon}>
                      <Popup>
                        <span>Asset Name: Asian Hercules 2</span>
                        <br />
                        <span>Speed: {data.speed}</span>
                        <br />
                        <span>
                          Last Update: {data.time} (Singapore Standard Timezone)
                        </span>
                      </Popup>
                    </Marker>
                  </MapContainer>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
