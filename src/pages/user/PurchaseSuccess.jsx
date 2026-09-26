import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import paymentService from '../../services/paymentService';
import LoadingSkeleton from '../../components/common/LoadingSkeleton';

export default function PurchaseSuccess() {
  const [params] = useSearchParams();
  const transactionId = params.get('transactionId');
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');
  const [refresh, setRefresh] = useState(0);
  useEffect(() => {
    let active = true;
    let timer;
    let attempts = 0;
    async function load() {
      try {
        if (!transactionId) throw new Error('No transaction was specified.');
        const result = await paymentService.order(transactionId);
        if (!active) return;
        setOrder(result.order);
        setError('');
        if (result.order.status === 'pending' && ++attempts < 10) timer = setTimeout(load, 3000);
      } catch (error) { if (active) setError(error.message); }
    }
    load();
    return () => { active = false; clearTimeout(timer); };
  }, [transactionId, refresh]);
  const titles = { paid: 'Tickets confirmed', pending: 'Payment verification pending', failed: 'Payment unsuccessful', cancelled: 'Payment cancelled' };
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-16">
      <div className="mx-auto max-w-xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        {!order && !error ? <div className="p-8"><LoadingSkeleton variant="details" /></div> : (
          <>
            {order?.eventImage && <img src={order.eventImage} alt={order.eventTitle} className="aspect-video w-full object-cover" />}
            <div className="p-8">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Sandbox checkout</p>
              <h1 className="mt-2 text-2xl font-bold">{titles[order?.status] || 'Payment status'}</h1>
              {error && <p role="alert" className="mt-4 text-red-600">{error}</p>}
              {order && <>
                <h2 className="mt-4 text-lg font-medium">{order.eventTitle}</h2>
                <ul className="mt-4 divide-y divide-gray-100">
                  {order.items.map(item => <li key={item.ticketId} className="flex justify-between gap-4 py-3"><span>{item.ticketName} × {item.quantity}</span><span>{(item.unitPrice * item.quantity).toFixed(2)} BDT</span></li>)}
                </ul>
                <p className="mt-4 font-semibold">Total: {order.total.toFixed(2)} BDT</p>
                <p className="mt-3 break-all text-xs text-gray-500">Transaction: {order.transactionId}</p>
                {order.status === 'pending' && <p role="status" className="mt-4 text-sm text-gray-600">Confirmation has not arrived yet. Refresh the status before trying another payment.</p>}
                {['failed', 'cancelled'].includes(order.status) && <Link className="mt-5 inline-block font-medium underline" to={`/events/${order.eventId}/buy-ticket`}>Return to checkout</Link>}
              </>}
              {(error || order?.status !== 'paid') && <button onClick={() => setRefresh(n => n + 1)} className="mt-5 block text-sm underline">Refresh payment status</button>}
              <Link to="/profile" className="mt-6 block rounded-lg bg-black px-6 py-3 text-center font-semibold text-white">My tickets</Link>
              <Link to="/events" className="mt-4 block text-center text-sm text-gray-600">Explore events</Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
