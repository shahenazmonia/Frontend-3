import { Row, Typography } from "antd";
import React, { FunctionComponent } from "react";
import noReports from "../../../../assets/images/no_reports.png";

export const NoReportData: FunctionComponent = () => {
  return (
    <div className="no-reports">
      <h1 className="title">No reports</h1>
      <p className="description">
        Currently you have no data for the reports to be generated. <br /> Once
        you start generating traffic through the Balance application <br /> the
        reports will be shown.
      </p>
      <img src={noReports} alt="no-reports" />
    </div>
  );
};
