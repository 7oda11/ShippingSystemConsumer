// import { Order } from '../models/GetOrder';
// import { UpdateOrderDTO } from '../models/UpdateOrder';
// import { GovernmentName } from '../models/GovernmentName';
// import { City } from '../models/City';

// export function mapOrderToUpdateDTO(
//   order: Order,
//   governments: GovernmentName[],
//   cities: City[]
// ): UpdateOrderDTO {
//   const selectedGov = governments.find(g => g.name === order.governmennt);
//   const selectedCity = cities.find(c => c.name === order.city);

//   return {
//     id: order.id.toString(),
//     customerName: order.customerName,
//     customerPhone1: order.customerPhone,
//     customerPhone2: '',
//     email: order.email ?? '',
//     governmentId: Number(selectedGov?.id) || 0,
//     cityId: Number(selectedCity?.id) || 0,
//     villageName: order.villageName ?? '',
//     isShippedToVillage: order.isShippedToVillage ?? false,
//     shippingTypeId: order.shippingTypeId ?? 0,
//     vendorName: order.vendorName ?? '',
//     vendorAddress: order.vendorAddress ?? '',
//     statusId: order.statusId ?? 0,
//     vendorId: order.vendorId ?? undefined,
//     totalPrice: order.totalPrice,
//     notes: order.notes ?? '',
//     totalWeight: order.totalWeight ?? 0,
//     orderItems: order.orderItems ?? []
//   };
// }
