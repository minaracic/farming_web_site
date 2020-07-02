
export interface Order{
  _id: String,
  enterpriseId: String,
  articlIds: String[],
  gardenId: String,
  dateOfOrder: Date,
  status: Number
}
