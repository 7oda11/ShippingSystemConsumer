import {AddOrderItem} from './AddOrderItem'
export interface AddOrder {
  customerName: string;
  customerPhone1: string;
  customerPhone2?: string;
  email?: string;
  governmentId: number;
  cityId: number;
  villageName?: string;
  isShippedToVillage: boolean;
  shippingTypeId: number;
  vendorName: string;
  vendorAddress: string;
 
  totalPrice: number;
  notes?: string;
  totalWeight?: number;
  orderItems: AddOrderItem[];
}

