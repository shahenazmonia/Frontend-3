import { Col, Row } from "antd";
import React, { FunctionComponent } from "react";
import { ALL_GATEWAYS, ALL_PROJECTS } from "../../../../constant";
import { Filters, Gateway, Project, Report } from "../../types";
import { getGatwayName, getProjectName, getRoundUp } from "../../utils";
import { DataTable } from "../data_table";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";

Chart.register(ArcElement);

interface Props {
  reports: Report[];
  filters: Filters;
  gateways: Gateway[];
  projects: Project[];
}

export const Reports: FunctionComponent<Props> = ({
  reports,
  filters,
  gateways,
  projects,
}: Props) => {
  const { selectedGateway, selectedProject } = filters;
  let toalAmount: number = 0;
  reports.forEach((elm) => (toalAmount += elm.total));
  const projectTitle =
    getProjectName(projects, selectedProject) || ALL_PROJECTS;
  const gatewayTitle = getGatwayName(gateways, selectedGateway) || ALL_GATEWAYS;

  const isChart =
    (selectedProject == ALL_PROJECTS && selectedGateway !== ALL_GATEWAYS) ||
    (selectedGateway == ALL_GATEWAYS && selectedProject !== ALL_PROJECTS);

  const totalsData = reports.map((elm) => elm.total);
  const titlesData = reports.map((elm) => elm.title);

  const data = {
    // @TODO: the labels are not working, should be handled in a different way
    labels: titlesData,
    datasets: [
      {
        data: totalsData,
        backgroundColor: ["#A259FF", "#F24E1E", "#FFC107"],
        hoverBackgroundColor: ["#A259FF", "#F24E1E", "#FFC107"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Row gutter={12}>
      <Col span={isChart ? 14 : 24}>
        <div className="report-wrapper">
          <h3 className="head text">
            {projectTitle} | {gatewayTitle}
          </h3>
          {reports.length > 0 &&
            reports?.map((report) => {
              return (
                <DataTable
                  key={report.title}
                  report={report}
                  filters={filters}
                  gateways={gateways}
                />
              );
            })}
        </div>
        <div className="total-amount-wrapper">
          total: {getRoundUp(toalAmount, 3)}
        </div>
      </Col>
      <Col span={isChart ? 10 : 0}>
        <Row className="chart-wrapper" justify="center" align="middle">
          <Doughnut data={data} width={"270"} height={"270"} />
        </Row>
      </Col>
    </Row>
  );
};
