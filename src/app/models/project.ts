import { Resource } from './resource';

export enum ProjectStatusType {
  Started = 'Started',
  Completed = 'Completed',
  Stopped = 'Stopped',
  Canceled = 'Canceled',
  Bending = 'Bending'
}

// tslint:disable-next-line:no-namespace
export namespace ProjectStatusType {
  export function values(): string[] {
    return Object.keys(ProjectStatusType).filter(
      (type) => isNaN(type as any) && type !== 'values'
    );
  }
}


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

export class ProjectType {
  id: number;
  name: string;
  description: string;
}
