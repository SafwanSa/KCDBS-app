import { Resource } from './resource';

export enum ProjectType {
  Started = 'Started',
  Completed = 'Completed',
  Stopped = 'Stopped',
  Canceled = 'Canceled',
  Bending = 'Bending'
}

// tslint:disable-next-line:no-namespace
export namespace ProjectType {
  export function values(): string[] {
    return Object.keys(ProjectType).filter(
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
