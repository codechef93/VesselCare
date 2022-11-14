import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Row,
  Col,
  Container,
  DropdownButton,
  Dropdown,
  ButtonToolbar,
  ButtonGroup,
  Button,
} from "react-bootstrap";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import sidebarItemsCLMS from "../../assets/icons/AH2-CLMS_icon.png";
import Sidebar from "../../components/Sidebar";
import "../../scss/asset-management.scss";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: false,
      text: "HOOK LOAD MONITORING",
    },
  },
};

// let labels = [];
let tabURL = "/assetmanagement";
let timer = null;
const steps = [1, 6, 12, 24, 24 * 7, 24 * 14, 24 * 30];

let _data = {
  labels: [],
  datasets: [
    {
      label: "M1",
      // data: [0, 10, 5, 2, 20, 30, 45],
      data: [],
      borderColor: "rgb(220, 24, 24)",
      backgroundColor: "rgba(220, 24, 24, 0.5)",
    },
    {
      label: "M2",
      // data: [1, 2, 3, 4, 5, 6, 7, 56, 545, 89],
      data: [],
      borderColor: "rgb(73, 150, 39)",
      backgroundColor: "rgba(73, 150, 39, 0.5)",
    },
    {
      label: "M3",
      // data: [0, 45, 520, 78, 127, 897, 345],
      data: [],
      borderColor: "rgb(7, 61, 122)",
      backgroundColor: "rgba(7, 61, 122, 0.5)",
    },
    {
      label: "M4",
      // data: [0, 200, 300, 400, 500, 600, 700, 565, 545, 852],
      data: [],
      borderColor: "rgb(199, 174, 23)",
      backgroundColor: "rgba(199, 174, 23, 0.5)",
    },
  ],
};

//const url = "http://localhost:5000/ah2stagingwebservice/getAssets";
const url = process.env.REACT_APP_LOCALHOSTURL + "getAssets";

const AssetManagement = () => {
  const [intervals, setIntervals] = useState(1);
  const [duration, setDuration] = useState(1);
  const [lineData, setLineData] = useState(_data);
  const [render, setRender] = useState(false);

  const timeFilter = (time) => {
    return time.substring(11, 16);
  };

  const getData = () => {
    setRender(false);
    axios
      .get(url)
      .then((res) => {
        console.log(res);
        setLineData((oldData) => {
          console.log("oldData", oldData);
          const _interval = intervals ? intervals : 1;
          const count = (steps[duration - 1] * 60) / _interval / 5;
          let newData = oldData;
          for (var index = 0; index < 4; index++) {
            newData.datasets[index].data.push(Number(res.data[index].Load));
            if (newData.datasets[index].data.length > count)
              newData.datasets[index].data.shift();
          }
          newData.labels.push(timeFilter(res.data[0].ReceivedDateTime));
          if (newData.labels.length > count) newData.labels.shift();
          console.log("new", newData);
          return newData;
        });
      })
      .catch((err) => console.log(err));
    setRender(true);
  };

  useEffect(() => {
    // setRender(false)
    getData();
    const _interval = intervals ? intervals : 1;
    if (timer) clearInterval(timer);
    const _timer = setInterval(() => {
      getData();
    }, (_interval * 5 * 60 * 1000) / 60 / 5);
    return () => clearInterval(_timer);
    // setRender(true)
  }, []);
  console.log(lineData.labels, "return render");
  return (
    <div className="home-manage">
      <Container fluid>
        <Row>
          <Col xs={12} sm={12} md={3} lg={2}>
            <Sidebar
              itemTitle="CLMS"
              itemURL={sidebarItemsCLMS}
              tabURL={tabURL}
            />
          </Col>
          <Col xs={12} sm={12} md={9} lg={10}>
            <div className="hook-monitor">
              <h5 className="hook-monitor-title">HOOK LOAD MONITORING</h5>

              <div className="interval-filter filters">
                <Row>
                  <Col
                    xs={12}
                    sm={2}
                    lg={2}
                    md={3}
                    xl={2}
                    className="align-self-center"
                  >
                    <p className="filters-title">Interval:</p>
                  </Col>
                  <Col xs={12} sm={10} lg={10} md={9} xl={10}>
                    <DropdownButton
                      id="dropdown-basic-button"
                      title={
                        intervals ? 5 * intervals + " Mins" : "Select Interval"
                      }
                      onSelect={(e) => setIntervals(e)}
                    >
                      <Dropdown.Item eventKey={1}>5 Mins</Dropdown.Item>
                      <Dropdown.Item eventKey={2}>10 Mins</Dropdown.Item>
                      <Dropdown.Item eventKey={3}>15 Mins</Dropdown.Item>
                      <Dropdown.Item eventKey={4}>20 Mins</Dropdown.Item>
                      <Dropdown.Item eventKey={5}>25 Mins</Dropdown.Item>
                      <Dropdown.Item eventKey={6}>30 Mins</Dropdown.Item>
                    </DropdownButton>
                  </Col>
                </Row>
              </div>
              <div className="duration-filter filters">
                <Row>
                  <Col
                    xs={12}
                    sm={2}
                    lg={2}
                    md={3}
                    xl={2}
                    className="align-self-center"
                  >
                    <p className="filters-title">Duration:</p>
                  </Col>
                  <Col xs={12} sm={10} lg={10} md={9} xl={10}>
                    <ButtonToolbar aria-label="Toolbar with button groups">
                      <ButtonGroup className="" aria-label="First group">
                        <Button
                          onClick={() => setDuration(1)}
                          className={duration == 1 ? "activeBtn" : ""}
                        >
                          1 Hour
                        </Button>
                        <Button
                          onClick={() => setDuration(2)}
                          className={duration == 2 ? "activeBtn" : ""}
                        >
                          6 Hours
                        </Button>
                        <Button
                          onClick={() => setDuration(3)}
                          className={duration == 3 ? "activeBtn" : ""}
                        >
                          12 Hours
                        </Button>
                        <Button
                          onClick={() => setDuration(4)}
                          className={duration == 4 ? "activeBtn" : ""}
                        >
                          1 Day
                        </Button>
                        <Button
                          onClick={() => setDuration(5)}
                          className={duration == 5 ? "activeBtn" : ""}
                        >
                          1 Week
                        </Button>
                        <Button
                          onClick={() => setDuration(6)}
                          className={duration == 6 ? "activeBtn" : ""}
                        >
                          2 Weeks
                        </Button>
                        <Button
                          onClick={() => setDuration(7)}
                          className={duration == 7 ? "activeBtn" : ""}
                        >
                          1 Month
                        </Button>
                      </ButtonGroup>
                    </ButtonToolbar>
                  </Col>
                </Row>
              </div>
              <div className="hook-chart">
                {render ? <Line options={options} data={lineData} /> : null}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AssetManagement;
