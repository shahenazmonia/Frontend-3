import { message } from "antd";
import axios from "axios";
import { PaymentInput } from "./types";

const api = "http://178.63.13.157:8090/mock-api/api";

/**  all the requests should be handled by using redux or context to pass the data to the global 
 state in case we need it in different places and to manage all the requests/errors from one place
*/

export const getProjects = () => {
  return axios
    .get(`${api}/projects`)
    .then(({ data }) => data.data)
    .catch((error) => message.error(error));
};

export const getGateways = () => {
  return axios
    .get(`${api}/gateways`)
    .then(({ data }) => data.data)
    .catch((error) => message.error(error));
};

export const getUsers = () => {
  return axios
    .get(`${api}/users`)
    .then(({ data }) => {
      return data;
    })
    .catch((error) => message.error(error));
};

export const getPayments = (input: PaymentInput) => {
  return axios
    .post(`${api}/report`, { ...input })
    .then(({ data }) => data.data)
    .catch((error) => message.error(error));
};
