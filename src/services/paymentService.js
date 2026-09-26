import apiRequest from './api';
const paymentService = {
  checkout: (cart) => apiRequest('/payments/checkout', { method: 'POST', body: JSON.stringify(cart) }),
  order: (id) => apiRequest(`/payments/orders/${encodeURIComponent(id)}`),
  history: () => apiRequest('/payments/orders'),
};
export default paymentService;
