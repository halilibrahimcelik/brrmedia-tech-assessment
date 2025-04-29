export enum AppRoutes {
  IT_REQUEST = '/it-request',
  STAFF_DIRECTORY = '/staff-directory',
  TICKETS = '/tickets',
  TODOS = '/todos',
}

export enum ApiRoutes {
  GET_STAFF = '/api/get-staff',
  GET_TICKETS = '/api/get-tickets',
}
export type StaffMember = {
  id: number;
  name: string;
  role: string;
  email: string;
  status: 'active' | 'inactive';
  lastLogin: string;
  driveUsage: string;
  device: string;
};
export type Ticket = {
  id: number;
  user: string; // Email of the user
  issue: string;
  description: string;
  priority: 'high' | 'medium' | 'normal';
  status: 'open' | 'closed';
  createdAt: string; // ISO 8601 date string
};
export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};
