import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const OrderSuccess: React.FC = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const orderId = urlParams.get('order_id');

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <div className="max-w-md mx-auto text-center">
        <CheckCircle className="w-16 h-16 text-accent mx-auto mb-6" />
        <h1 className="text-3xl font-bold mb-4 gradient-text">Payment Successful!</h1>
        <p className="text-muted-foreground mb-8">
          Your order <span className="font-semibold">{orderId}</span> was confirmed.
        </p>
        <Button onClick={() => window.location.href = '/shop'}>
          Continue Shopping
        </Button>
      </div>
    </div>
  );
};

export default OrderSuccess;