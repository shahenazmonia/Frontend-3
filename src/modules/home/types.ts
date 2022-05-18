export interface Project {
  projectId: string;
  name: string;
  description: string;
  gatewayIds: string[];
  image: string;
  industry: string;
  userIds: string[];
}

export interface Gateway {
  gatewayId: string;
  name: string;
  description: string;
  type: string;
  apiKey: string;
}

export interface PaymentInput {
  from: string;
  to: string;
  projectId: string;
  gatewayId: string;
}

export interface Payment {
  paymentId: string;
  amount: number;
  projectId: string;
  gatewayId: string;
  userIds: string;
  modified: string;
  created: string;
  gatewayTitle?: string;
}

export interface Report {
  title: string;
  total: number;
  data: Payment[];
}

export interface Filters {
  selectedProject: string;
  selectedGateway: string;
  startDate: string;
  endDate: string;
  hasResult: boolean;
}
