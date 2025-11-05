import React, { useEffect, useState } from 'react';
import { CheckCircle, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface OrderData {
  cart: CartItem[];
  address: {
    name: string;
    email: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  orderId: string;
  total: number;
}

const OrderSuccess: React.FC = () => {
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [verificationStatus, setVerificationStatus] = useState<'verifying' | 'success' | 'failed'>('verifying');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const orderIdParam = urlParams.get('order_id');
    const verifyParam = urlParams.get('verify');

    if (orderIdParam && verifyParam === 'true') {
      // Retrieve order data from localStorage
      const storedData = localStorage.getItem('orderData');
      if (storedData) {
        const parsedData: OrderData = JSON.parse(storedData);
        setOrderData(parsedData);

        // Verify payment
        fetch("/.netlify/functions/verifyPayment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId: orderIdParam }),
        })
          .then(res => res.json())
          .then(data => {
            if (data.success) {
              setVerificationStatus('success');
              // Clear localStorage after successful verification
              localStorage.removeItem('orderData');
            } else {
              setVerificationStatus('failed');
            }
          })
          .catch(error => {
            console.error("Payment verification error:", error);
            setVerificationStatus('failed');
          });
      } else {
        setVerificationStatus('failed');
      }
    } else {
      setVerificationStatus('failed');
    }
  }, []);

  if (verificationStatus === 'verifying') {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Verifying Payment...</h2>
          <p>Please wait while we confirm your payment.</p>
        </div>
      </div>
    );
  }

  if (verificationStatus === 'failed' || !orderData) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-red-500">Payment Verification Failed</h2>
          <p>Please contact support if you believe this is an error.</p>
          <Button onClick={() => window.location.href = '/shop'} className="mt-4">
            <Home className="w-4 h-4 mr-2" />
            Back to Shop
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto px-6 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4 gradient-text">Order Confirmed!</h2>
          <p className="text-muted-foreground mb-8">
            Thank you for your purchase. Your order has been successfully placed and payment verified.
          </p>
          <Card className="glass mb-8">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Order ID: {orderData.orderId}</h4>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Shipping Address:</h4>
                  <p className="text-sm text-muted-foreground">
                    {orderData.address.name}<br />
                    {orderData.address.street}<br />
                    {orderData.address.city}, {orderData.address.state} {orderData.address.zip}<br />
                    {orderData.address.email} | {orderData.address.phone}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Items:</h4>
                  {orderData.cart.map(item => (
                    <div key={item.id} className="flex justify-between mb-2">
                      <span>{item.name} x{item.quantity}</span>
                      <span>Rs {(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>Rs {orderData.total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Button onClick={() => window.location.href = '/shop'}>
            <Home className="w-4 h-4 mr-2" />
            Continue Shopping
          </Button>
        </div>
      </main>
    </div>
  );
};

export default OrderSuccess;
