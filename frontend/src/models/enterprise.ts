import { StickyDirection } from '@angular/cdk/table';

export interface Enterprise{
  _id: String,
  companyName: String,
  username: String,
  password: String,
  dateOfCreation: Date,
  address: String,
  email: String,
  availablePostman: Number
}
