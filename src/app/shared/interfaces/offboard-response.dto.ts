export interface OffboardResponse {
  id: string;
  address: Address;
  notes: string;
  phone: string;
  email: string;
}

interface Address {
  streetLine1: string;
  country: string;
  postalCode: string;
  receiver: string;
}
