export interface AddDelivery {
  userName: string;
  email: string;
  password: string;
  fullName: string;
  phone: string;
  cityId: number;
  cityName?: string; // Optional field for the name
}
