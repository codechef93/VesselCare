import React from "react";
import { Link } from "react-router-dom";
import "./../scss/sidebar.scss";

const Sidebar = ({ itemTitle, itemURL, tabURL }) => {
  return (
    <div className="sidebar">
      <ul>
        <li className="sidebar-item selected">
          <img src={itemURL} alt={itemTitle} />
          <Link to={tabURL}>{itemTitle}</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
