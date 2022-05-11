import { Col, Row } from "antd";
import React, { FunctionComponent } from "react";
import { icons } from "../../assets/icons";
import { Logo } from "../logo";

export const Header: FunctionComponent = () => {
  return (
    <Row className="header" justify="space-between">
      <Col className="logo-section">
        <Logo />
        <img src={icons.menu} className="menu-icon" />
      </Col>
      <Col className="username">
        <div className="short-name"> SM</div>
        <div className="full-name">Shahenaz Monia</div>
      </Col>
    </Row>
  );
};
