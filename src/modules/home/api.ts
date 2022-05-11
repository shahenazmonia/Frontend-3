import axios from "axios";
import { Gateway, Payment, PaymentInput, Project } from "./types";

const api = "http://178.63.13.157:8090/mock-api/api";

// all the requests should be handled by redux or context
export const getProjects = async () => {
  let result: Project[] = [];
  await axios.get(`${api}/projects`).then(({ data }) => {
    result = data.data;
  });
  return result;
};

export const getGateways = async () => {
  let result: Gateway[] = [];
  await axios.get(`${api}/gateways`).then(({ data }) => {
    result = data.data;
  });

  return result;
};

export const getUsers = () => {
  axios.get(`${api}/users`).then(({ data }) => {
    return data;
  });
};

export const getPayments = async (input: PaymentInput) => {
  let payments: Payment[] = [];
  await axios.post(`${api}/report`, { ...input }).then(({ data }) => {
    payments = data.data;
  });
  return payments;
};
