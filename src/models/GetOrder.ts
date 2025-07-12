export interface OrderListResponse {
  data: Order[];
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
}
export interface Order {
  id: string;
  date: string;
  customerName: string;
  customerPhone: string;
  governmennt: string;
  city: string;
  status: string;
   statusId: number;
  totalPrice: number;
  vendorName:string;
  cancelledOrReturnedNotes?:string
}
