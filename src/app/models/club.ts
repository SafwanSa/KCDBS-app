import { Department } from './department';

export class Club {
  id: number;
  name: string;
  email?: string;
  address?: string;
  status: string;
  phone?: string;
  description: string;
  department?: Department;

}
