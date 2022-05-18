import { ALL_GATEWAYS, ALL_PROJECTS } from "../../constant";
import { Filters, Gateway, Payment, Project } from "./types";

interface Group {
  [key: string]: Payment[];
}
const getProjectsByGatewayId = (data: Payment[], id: string) => {
  return data.reduce((group: Group, data) => {
    const { projectId, gatewayId } = data;
    group[projectId] = group[projectId] ?? [];
    if (gatewayId == id) {
      group[projectId].push(data);
    }
    return group;
  }, {});
};

const getGatewaysByProjectId = (data: Payment[], id: string) => {
  return data.reduce((group: Group, data) => {
    const { gatewayId, projectId } = data;
    group[gatewayId] = group[gatewayId] ?? [];
    if (projectId == id) {
      group[gatewayId].push(data);
    }
    return group;
  }, {});
};

/**
 *
 * @param data array of payment data
 * @param filters all the selected filters
 * @returns data grouped by the selected filters
 */
export const getDataByGroup = (data: Payment[], filters: Filters) => {
  const { selectedGateway, selectedProject } = filters;

  if (selectedProject == ALL_PROJECTS && selectedGateway !== ALL_GATEWAYS) {
    return getProjectsByGatewayId(data, selectedGateway);
  }

  if (selectedGateway == ALL_GATEWAYS && selectedProject !== ALL_PROJECTS) {
    return getGatewaysByProjectId(data, selectedProject);
  }

  if (selectedGateway !== ALL_GATEWAYS && selectedGateway !== ALL_GATEWAYS) {
    data.filter(
      (elm) =>
        elm.projectId == selectedProject && elm.gatewayId == selectedGateway
    );
  }

  // default result is grouping by project ids
  return data.reduce((group: Group, data) => {
    const { projectId } = data;
    group[projectId] = group[projectId] ?? [];
    group[projectId].push(data);
    return group;
  }, {});
};

/**
 *
 * @param value the number that should be rounded
 * @param round the number of round digits
 * @returns the rounded number for 4 digits after comma
 */
export const getRoundUp = (value: number, round: number) => {
  return value.toFixed(round);
};

export const getGatwayName = (data: Gateway[], id: string) => {
  const result = data.find((elm) => elm.gatewayId == id);
  return result?.name;
};

export const getProjectName = (data: Project[], id: string) => {
  const result = data.find((elm) => elm.projectId == id);
  return result?.name;
};

/**
 *
 * @param filters the selected filters
 * @param gateways all gatways in the system
 * @returns colums regarding the selected filters
 */
export const renderColums = (filters: Filters, gateways: Gateway[]) => {
  const { selectedProject, selectedGateway } = filters;
  const haveProjectAndGateway =
    selectedProject == ALL_PROJECTS && selectedGateway == ALL_GATEWAYS;

  // it should be handled by showing or hiding one col which is Gateway but the antd keeps the col width
  if (haveProjectAndGateway) {
    return [
      {
        title: "Date",
        dataIndex: "modified",
        key: "date",
      },
      {
        title: "Gateway",
        dataIndex: "gatewayId",
        key: "gateway",
        align: "center",
        render: (value: string) => getGatwayName(gateways, value),
      },
      {
        title: "Transaction ID",
        dataIndex: "gatewayId",
        key: "transaction",
        align: "center",
      },
      {
        title: "Amount",
        dataIndex: "amount",
        key: "amount",
        align: "right",
        render: (value: number) => `${getRoundUp(value, 0)} USD`,
      },
    ];
  }
  return [
    {
      title: "Date",
      dataIndex: "modified",
      key: "date",
    },
    {
      title: "Transaction ID",
      dataIndex: "gatewayId",
      key: "transaction",
      align: "center",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      align: "right",
      render: (value: number) => `${getRoundUp(value, 0)} USD`,
    },
  ];
};
