import { Row } from "antd";
import React from "react";
import { icons } from "../../assets/icons";

export const Sidebar = () => {
  return (
    <Row className="sidebar-wrapper" gutter={22}>
      <img src={icons.statistics} />
      <img src={icons.grid} />
      <img src={icons.tv} />
      <img src={icons.report} />
      <img src={icons.switchOff} />
    </Row>
  );
};
