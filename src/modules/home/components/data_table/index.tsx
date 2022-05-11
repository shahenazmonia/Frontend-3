import React from "react";
import { Table } from "antd";
import { Report } from "../../types";
import { getRoundUp } from "../../utils";

interface Props {
  report: Report;
}

export const DataTable = ({ report }: Props) => {
  const columns = [
    {
      title: "Date",
      dataIndex: "modified",
      key: "date",
    },
    {
      title: "Gateway",
      dataIndex: "gatewayId",
      key: "gateway",
    },
    {
      title: "Transaction ID",
      dataIndex: "gatewayId",
      key: "transaction",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (value: number) => `${getRoundUp(value, 0)} USD`,
    },
  ];

  return (
    <Table columns={columns} dataSource={report.data} pagination={false} />
  );
};
