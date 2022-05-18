import React, { FunctionComponent, useEffect, useState } from "react";
import {
  Button,
  Col,
  DatePicker,
  Divider,
  Row,
  Select,
  Typography,
} from "antd";
import { Header } from "../../components/header";
import { Sidebar } from "../../components/sidebar";
import { CaretDownOutlined } from "@ant-design/icons";
import { getGateways, getPayments, getProjects } from "./api";
import { Reports } from "./components/report";
import {
  Filters,
  Gateway,
  Payment,
  PaymentInput,
  Project,
  Report,
} from "./types";
import { getDataByGroup, getGatwayName, getProjectName } from "./utils";
import { NoReportData } from "./components/no_report_data";
import { ALL_GATEWAYS, ALL_PROJECTS } from "../../constant";

interface ProjectGroup {
  [key: string]: Payment[];
}

export const Home: FunctionComponent = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [gateways, setGateways] = useState<Gateway[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [filters, setFilters] = useState<Filters>({
    selectedProject: "",
    selectedGateway: "",
    startDate: "",
    endDate: "",
    hasResult: false,
  });
  // this is only to update the used state in the report once clicking on generate-report button
  const [generateReportfilters, setGenerateReportFilters] = useState<Filters>({
    selectedProject: "",
    selectedGateway: "",
    startDate: "",
    endDate: "",
    hasResult: false,
  });

  const onProjectChange = (value: string) => {
    setFilters({ ...filters, selectedProject: value });
  };

  const onGatewayChange = (value: string) => {
    setFilters({ ...filters, selectedGateway: value, hasResult: false });
  };

  const onDateChange = (dateString: string, type: string) => {
    if (type == "FROM") {
      setFilters({ ...filters, startDate: dateString, hasResult: false });
    } else {
      setFilters({ ...filters, endDate: dateString, hasResult: false });
    }
  };

  const initProjects = async () => {
    const projects = await getProjects();
    setProjects(projects);
  };

  const initGateways = async () => {
    const gateways = await getGateways();
    setGateways(gateways);
  };

  const getReprot = async (values: PaymentInput) => {
    // get payments data from the endpoint
    const payments = await getPayments(values);
    const groupDataByProject: ProjectGroup = getDataByGroup(payments, filters);
    const updatedPayments = Object.keys(groupDataByProject).map((key) => {
      let total = 0;
      const data = groupDataByProject[key];
      const result = data.map((elm) => {
        total += elm.amount;
        return elm;
      });
      return {
        title:
          getProjectName(projects, key) || getGatwayName(gateways, key) || "",
        total,
        data: result,
      };
    });
    setReports(updatedPayments);
    setFilters({ ...filters, hasResult: true });
    setGenerateReportFilters(filters);
  };

  useEffect(() => {
    initProjects();
    initGateways();
  }, []);

  const generateReport = () => {
    const { selectedGateway, selectedProject, startDate, endDate } = filters;
    getReprot({
      projectId: selectedProject !== ALL_PROJECTS ? selectedProject : "",
      gatewayId: selectedGateway !== ALL_GATEWAYS ? selectedGateway : "",
      from: startDate,
      to: endDate,
    });
  };

  return (
    <div className="home">
      <Header />
      <Divider type="horizontal" />

      <Row className="home-wrapper">
        <Col span={1}>
          <Sidebar />
        </Col>
        <Col span={23} className="reports-wrapper">
          <Row justify="space-between">
            <Col>
              <h3 className="title">Reports</h3>
              <Typography.Text className="description">
                Easily generate a report of your transactions
              </Typography.Text>
            </Col>
            <Col>
              <Row gutter={24}>
                <Col>
                  <Select
                    placeholder="Select project"
                    className="select-wrapper project-select"
                    dropdownClassName="select-dropdown"
                    suffixIcon={<CaretDownOutlined />}
                    onChange={onProjectChange}
                  >
                    <Select.Option value={ALL_PROJECTS}>
                      All Projects
                    </Select.Option>
                    {projects.map((elm) => {
                      return (
                        <Select.Option
                          key={elm.projectId}
                          value={elm.projectId}
                        >
                          {elm.name}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Col>
                <Col>
                  <Select
                    placeholder="Select gateway"
                    className="select-wrapper gateway-select"
                    dropdownClassName="select-dropdown"
                    suffixIcon={<CaretDownOutlined />}
                    onChange={onGatewayChange}
                  >
                    <Select.Option value={ALL_GATEWAYS}>
                      All Gateways
                    </Select.Option>
                    {gateways.map((elm) => {
                      return (
                        <Select.Option
                          key={elm.gatewayId}
                          value={elm.gatewayId}
                        >
                          {elm.name}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Col>
                <Col>
                  <DatePicker
                    placeholder="From date"
                    className="date-picker"
                    onChange={(date, dateString) =>
                      onDateChange(dateString, "FROM")
                    }
                  />
                </Col>
                <Col>
                  <DatePicker
                    placeholder="To Date"
                    className="date-picker"
                    onChange={(date, dateString) =>
                      onDateChange(dateString, "TO")
                    }
                  />
                </Col>
                <Col>
                  <Button className="sumbit-btn" onClick={generateReport}>
                    Generate report
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
          {reports.length > 0 && (
            <Reports
              reports={reports}
              filters={generateReportfilters}
              gateways={gateways}
              projects={projects}
            />
          )}
          {reports.length == 0 && <NoReportData />}
        </Col>
      </Row>
    </div>
  );
};
