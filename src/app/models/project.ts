import { Resource } from './resource';
export class Project {
  id: number;
  name: string;
  type: string;
  // clubID: number;
  description: number;
  startDate: Date;
  endDate?: Date;
  status: string;
  resources: [Resource];
}
