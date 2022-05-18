import React, { useState } from "react";
import { Row, Table, Typography } from "antd";
import { Filters, Gateway, Project, Report } from "../../types";
import { getRoundUp, renderColums } from "../../utils";
import { ALL_GATEWAYS, ALL_PROJECTS } from "../../../../constant";

interface Props {
  report: Report;
  gateways: Gateway[];
  filters: Filters;
}

export const DataTable = ({ report, gateways, filters }: Props) => {
  const [isExpandable, setIsExpandable] = useState<boolean>(true);
  const { selectedProject, selectedGateway } = filters;
  const AreProjectAndGateway =
    selectedProject !== ALL_PROJECTS && selectedGateway !== ALL_GATEWAYS;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columns: any = renderColums(filters, gateways);

  const onProjectClick = () => {
    setIsExpandable(!isExpandable);
  };

  return (
    <div onClick={onProjectClick}>
      {!AreProjectAndGateway && (
        <Row className="table-field" justify="space-between">
          <Typography.Text className="text">{report.title}</Typography.Text>
          <Typography.Text className="text">
            TOTAL: {getRoundUp(report.total, 4)} USD
          </Typography.Text>
        </Row>
      )}
      <Row>
        {isExpandable || AreProjectAndGateway ? (
          <Table
            columns={columns}
            dataSource={report.data}
            pagination={false}
          />
        ) : null}
      </Row>
    </div>
  );
};
