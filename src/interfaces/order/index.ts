import { RestaurantInterface } from 'interfaces/restaurant';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface OrderInterface {
  id?: string;
  status: string;
  restaurant_id?: string;
  customer_service_representative_id?: string;
  operations_manager_id?: string;
  delivery_driver_id?: string;
  created_at?: any;
  updated_at?: any;

  restaurant?: RestaurantInterface;
  user_order_customer_service_representative_idTouser?: UserInterface;
  user_order_operations_manager_idTouser?: UserInterface;
  user_order_delivery_driver_idTouser?: UserInterface;
  _count?: {};
}

export interface OrderGetQueryInterface extends GetQueryInterface {
  id?: string;
  status?: string;
  restaurant_id?: string;
  customer_service_representative_id?: string;
  operations_manager_id?: string;
  delivery_driver_id?: string;
}
