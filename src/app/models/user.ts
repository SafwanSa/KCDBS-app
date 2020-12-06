export class User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  type: string;
  status: string;
  phone: string;


  from?: Date;
  to?: Date;

  // These are club member attributes
  membershipStatus?: string;
  // These are club admin attributes
  role?: string;
}
