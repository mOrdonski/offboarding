import { Equipment } from './equipment.dto';

export interface User {
  id: string;
  name: string;
  department: string;
  status: string;
  email: string;
  equipments: Equipment[];
}
