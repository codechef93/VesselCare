import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Container,
  ButtonToolbar,
  ButtonGroup,
  Button,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import sidebarItemsCLMS from "../../assets/icons/AH2-vesselTracking.png";
import Sidebar from "../../components/Sidebar";
import "../../scss/operation.scss";
import axios from "axios";

//var L = window.L;
import L from "leaflet";

let tabURL = "/operation";

const AssetManagement = () => {
  const [data, setData] = useState({
    speed: 10,
    time: 0,
    position: [51.505, -0.09],
  });
  useEffect(() => {
    getMapData();
    const interval2 = setInterval(() => {
      // for map data
      getMapData();
    }, (10 * 1000) / 1);
    return () => {
      clearInterval(interval2);
    };
  }, []);

  // const getLatLng = (field) => {
  //   const arr = field.split(",");
  //   const idx = arr.findIndex((e) => {
  //     return e.toLowerCase().indexOf("latitude") != -1;
  //   });
  //   const _lat = arr[idx].split(":");
  //   const lat = _lat[_lat.length - 1];
  //   const _lon = arr[idx + 1].split(":");
  //   const lon = _lon[_lon.length - 1];
  //   const _speed = arr[idx + 2].split(":");
  //   const speed = _speed[_speed.length - 1];
  //   const _time = arr[arr.length - 1];
  //   const idx2 = _time.indexOf(":");
  //   const time = _time.substring(idx2 + 2, _time.length - 3);
  //   // console.log(time);
  //   return [parseFloat(lat), parseFloat(lon), speed, time];
  // };

  const getLatLng = (field) => {
    // const lat = field.Latitude
    // const lon = field.Longitude
    // const speed = field.Speed
    // const time = field.Receieveddatetime//_time.substring(idx2 + 2, _time.length - 3);
    const {
      Latitude: lat,
      Longitude: lon,
      Speed: speed,
      Receieveddatetime: time,
    } = field;
    return [parseFloat(lat), parseFloat(lon), speed, time];
  };

  const getMapData = () => {
    //const url = "http://localhost:5000/ah2stagingwebservice/";
    const url = process.env.REACT_APP_LOCALHOSTURL;

    axios
      .get(url + "getMapData")
      .then((res) => {
        console.log("Map", res.data);
        console.log(res.data[0].AH2Datafieldvalues);
        const [lat, lon, speed, time] = getLatLng(
          JSON.parse(res.data[0].AH2Datafieldvalues).Positions
        );
        /* buildMap(lat, lon, speed, time); */
        setData({
          position: [lat, lon],
          speed,
          time,
        });
      })
      .catch((err) => console.log(err));
  };

  /* function buildMap(lat, lon, speed, time) {
    // console.log(typeof lat, lat, typeof lon, lon)
    document.getElementById("weathermap").innerHTML =
      "<div id='map' style='width: 100%; height: 800px;'></div>";
    var osmUrl = "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      osmAttribution =
        'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors,' +
        ' <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
      osmLayer = new L.TileLayer(osmUrl, {
        maxZoom: 18,
        attribution: osmAttribution,
      });
    var map = new L.Map("map");
    map.setView(new L.LatLng(lat, lon), 14);
    map.addLayer(osmLayer);
    var shipIcon = L.icon({
      iconUrl: "ship-64.png",
      // shadowUrl: 'leaf-shadow.png',

      iconSize: [30, 30], // size of the icon
      // shadowSize:   [50, 64], // size of the shadow
      iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
      // shadowAnchor: [4, 62],  // the same for the shadow
      popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
    });
    var marker = L.marker([lat, lon], { icon: shipIcon }).addTo(map);
    marker
      .bindPopup(
        `<span>Asset Name: Asian Hercules 2</span><br><span>Speed: ${speed}</span><br><span>Last Update: ${time} (Singapore Standard Timezone)</span>`,
        { closeButton: false }
      )
      .openPopup();
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
  } */

  var markerIcon = L.icon({
    iconUrl: "/ship-64.png",

    iconSize: [30, 30], // size of the icon
    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
  });

  return (
    <div className="operation-home">
      <Container fluid>
        <Row>
          <Col xs={12} sm={12} md={3} lg={2}>
            <Sidebar
              itemTitle="Vessel Tracking"
              itemURL={sidebarItemsCLMS}
              tabURL={tabURL}
            />
          </Col>
          <Col xs={12} sm={12} md={9} lg={10}>
            <div className="operation-monitor">
              <h5 className="operation-monitor-title">VESSEL TRACKING</h5>
              <div className="operation-map">
                <div className="duration-filter filters">
                  <Row>
                    <Col xs={12} sm={2} lg={2} md={3} xl={1}>
                      <p className="filters-title">Duration:</p>
                    </Col>
                    <Col xs={12} sm={10} lg={10} md={9} xl={11}>
                      <ButtonToolbar aria-label="Toolbar with button groups">
                        <ButtonGroup className="me-2" aria-label="First group">
                          <Button>1 Hour</Button> <Button>6 Hours</Button>{" "}
                          <Button>12 Hours</Button>
                          <Button>1 Day</Button>
                        </ButtonGroup>
                      </ButtonToolbar>
                    </Col>
                  </Row>
                </div>
                <div className="interval-filter filters">
                  <Row>
                    <Col xs={12} sm={2} lg={2} md={3} xl={1}>
                      <p className="filters-title">Interval:</p>
                    </Col>
                    <Col xs={12} sm={10} lg={10} md={9} xl={11}>
                      <DropdownButton
                        id="dropdown-basic-button"
                        title="Select Interval"
                      >
                        <Dropdown.Item to="#/action-1">5 Mins</Dropdown.Item>
                        <Dropdown.Item to="#/action-2">10 Mins</Dropdown.Item>
                        <Dropdown.Item to="#/action-3">15 Mins</Dropdown.Item>
                        <Dropdown.Item to="#/action-4">20 Mins</Dropdown.Item>
                        <Dropdown.Item to="#/action-5">25 Mins</Dropdown.Item>
                        <Dropdown.Item to="#/action-6">30 Mins</Dropdown.Item>
                      </DropdownButton>
                    </Col>
                  </Row>
                </div>
                {/* <MapSection location={location} zoomLevel={12} /> */}
                <MapContainer
                  key={JSON.stringify([data.position])}
                  style={{
                    width: "100%",
                    height: "849px",
                  }}
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
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AssetManagement;
