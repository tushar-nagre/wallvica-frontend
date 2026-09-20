import { paymentApi, type Address } from '../api/payments'
import type { Product } from '../types/product'

type PaymentDetails = { product: Product; styleName: string; fileNames: string[]; address: Address; customerName: string; customerEmail: string; customerPhone?: string }

declare global { interface Window { Razorpay?: new (options: Record<string, unknown>) => { open: () => void } } }

function loadCheckoutScript() {
  if (window.Razorpay) return Promise.resolve()
  return new Promise<void>((resolve, reject) => {
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Razorpay checkout could not be loaded.'))
    document.body.appendChild(script)
  })
}

export function useRazorpayCheckout() {
  const startPayment = async (details: PaymentDetails, onPaid: () => void) => {
    const checkout = await paymentApi.createCheckout({ product_id: details.product.id, quantity: 1, style_name: details.styleName, file_names: details.fileNames, shipping_address: details.address })
    await loadCheckoutScript()
    if (!window.Razorpay) throw new Error('Razorpay checkout could not be loaded.')
    new window.Razorpay({ key: checkout.key_id, amount: checkout.amount, currency: checkout.currency, name: 'Wallvica', description: details.product.name, order_id: checkout.razorpay_order_id, prefill: { name: details.customerName, email: details.customerEmail, contact: details.customerPhone }, theme: { color: '#7b67e8' }, handler: async (response: unknown) => { await paymentApi.verify({ ...(response as { razorpay_payment_id: string; razorpay_order_id: string; razorpay_signature: string }), order_id: checkout.order_id }); onPaid() } }).open()
  }
  return { startPayment }
}
