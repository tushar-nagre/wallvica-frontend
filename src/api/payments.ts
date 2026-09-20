import { apiClient } from './client'

export type Address = { full_name: string; phone: string; address_line_1: string; address_line_2?: string; city: string; state: string; postal_code: string; country: string }
type CheckoutInput = { product_id: string; quantity: number; style_name: string; file_names: string[]; shipping_address: Address }
type PaymentOrder = { order_id: string; order_number: string; razorpay_order_id: string; amount: number; currency: string; key_id: string }
type PaymentResponse = { razorpay_payment_id: string; razorpay_order_id: string; razorpay_signature: string }

export const paymentApi = {
  createCheckout: async (input: CheckoutInput) => (await apiClient.post<PaymentOrder>('/payments/checkout', input)).data,
  verify: async (input: PaymentResponse & { order_id: string }) => (await apiClient.post('/payments/verify', input)).data,
}
