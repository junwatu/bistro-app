import * as yup from 'yup';

export const orderValidationSchema = yup.object().shape({
  status: yup.string().required(),
  restaurant_id: yup.string().nullable(),
  customer_service_representative_id: yup.string().nullable(),
  operations_manager_id: yup.string().nullable(),
  delivery_driver_id: yup.string().nullable(),
});
