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

  // constructor(
  //   name: string = '',
  //   email?: string = '',
  //   address?: string = '',
  //   status: string = '',
  //   phone?: string = '',
  //   description: string = '',
  //   department?: Department
  // ) {
  //   this.name = name;
  //   this.email = email;
  //   this.address = address;
  //   this.status = 'This should be a club status';
  //   this.phone = phone;
  //   this.description = description;
  // }
}
