export enum AppRoutes {
  IT_REQUEST = '/it-request',
  STAFF_DIRECTORY = '/staff-directory',
  TICKETS = '/tickets',
  TODOS = '/todos',
}

export enum ApiRoutes {
  GET_STAFF = '/api/get-staff',
  GET_TICKETS = '/api/get-tickets',
  GET_TODOS = '/api/get-todos',
}
export type StaffMember = {
  id: number;
  name: string;
  role: string;
  issue: string;
  email: string;
  status: 'active' | 'inactive';
  lastLogin: string;
  driveUsage: string;
  device: string;
};
export type Priorty = 'high' | 'medium' | 'normal';
export type Ticket = {
  id: number;
  user: string; // Email of the user
  issue: string;
  description: string;
  priority: Priorty;
  status: 'open' | 'closed';
  createdAt: string; // ISO 8601 date string
};
export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};
