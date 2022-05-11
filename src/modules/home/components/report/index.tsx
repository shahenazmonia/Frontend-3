import { Row, Table, Typography } from "antd";
import React, { FunctionComponent, useState } from "react";
import { ALL_GATEWAYS, ALL_PROJECTS } from "../../../../constant";
import { Report } from "../../types";
import { getRoundUp } from "../../utils";
import { DataTable } from "../data_table";

interface Props {
  reports: Report[];
  selectedProject: string;
  selectedGateway: string;
}
export const Reports: FunctionComponent<Props> = ({
  reports,
  selectedProject,
  selectedGateway,
}: Props) => {
  const [isExpandable, setIsExpandable] = useState<boolean>(false);
  const [currentProjectTitle, setCurrentProjectTitle] = useState<string>("");

  const onProjectClick = (title: string) => {
    setIsExpandable(!isExpandable);
    setCurrentProjectTitle(title);
  };

  return (
    <div className="report-wrapper">
      <h3 className="head text">
        {selectedProject || ALL_PROJECTS} | {selectedGateway || ALL_GATEWAYS}
      </h3>
      {reports?.map((report) => {
        return (
          <div key={report.title} onClick={() => onProjectClick(report.title)}>
            <Row className="table-field" justify="space-between">
              <Typography.Text className="text">{report.title}</Typography.Text>
              <Typography.Text className="text">
                TOTAL: {getRoundUp(report.total, 4)} USD
              </Typography.Text>
            </Row>
            {isExpandable && report.title == currentProjectTitle && (
              <DataTable report={report} />
            )}
          </div>
        );
      })}
    </div>
  );
};
