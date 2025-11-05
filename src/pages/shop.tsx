import React, { useState } from 'react';
import TechGadgetProImage from '../images/Tech Gadget Pro.webp';
import WirelessHeadphonesImage from '../images/Wireless Headphones.webp';
import SmartWatchImage from '../images/Smart Watch.jpg';
import LaptopStandImage from '../images/laptop stand.jpg';
import GamingMouseImage from '../images/Gaming Mouse.avif';
import BluetoothSpeakerImage from '../images/Bluetooth Speaker.webp';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
// import { GradientButton } from '@/components/ui/gradient-button';
import { ShoppingCart, Plus, Minus, Trash2, CreditCard, MapPin, CheckCircle } from 'lucide-react';

// Declare Cashfree globally
declare global {
  interface Window {
    Cashfree: any;
  }
}

// Mock product data
const products = [
  {
    id: 1,
    name: 'Tech Gadget Pro',
    price: 1,
    image: TechGadgetProImage,
    description: 'Advanced tech gadget with cutting-edge features.',
  },
  {
    id: 2,
    name: 'Wireless Headphones',
    price: 1,
    image: WirelessHeadphonesImage,
    description: 'Premium wireless headphones with noise cancellation.',
  },
  {
    id: 3,
    name: 'Smart Watch',
    price: 1,
    image: SmartWatchImage,
    description: 'Feature-rich smart watch for fitness and connectivity.',
  },
  {
    id: 4,
    name: 'Laptop Stand',
    price: 1,
    image: LaptopStandImage,
    description: 'Ergonomic laptop stand for better posture.',
  },
  {
    id: 5,
    name: 'Gaming Mouse',
    price: 1,
    image: GamingMouseImage,
    description: 'High-precision gaming mouse with RGB lighting.',
  },
  {
    id: 6,
    name: 'Bluetooth Speaker',
    price: 1,
    image: BluetoothSpeakerImage,
    description: 'Portable Bluetooth speaker with excellent sound quality.',
  },
];

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const Shop: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [currentStep, setCurrentStep] = useState<'products' | 'checkout' | 'payment' | 'confirmation'>('products');
  const [address, setAddress] = useState({
    name: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zip: '',
  });
  const [payment, setPayment] = useState({
    method: 'cashfree', // Default to Cashfree for multiple methods
  });
  const [orderId, setOrderId] = useState<string>('');

  const addToCart = (product: typeof products[0]) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart(prev => prev.map(item =>
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const getTotal = () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep('payment');
  };

  const handlePaymentSubmit = async () => {
    const totalAmount = getTotal();
    const generatedOrderId = "order_" + Date.now();
    setOrderId(generatedOrderId);

    // Store order data in localStorage before payment
    const orderData = {
      cart,
      address,
      orderId: generatedOrderId,
      total: totalAmount,
    };
    localStorage.setItem('orderData', JSON.stringify(orderData));

    try {
      const res = await fetch("/.netlify/functions/createOrder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: generatedOrderId,
          amount: totalAmount,
          customerName: address.name,
          customerEmail: address.email,
          customerPhone: address.phone,
        }),
      });

      const data = await res.json();

      if (data.payment_session_id) {
        const paymentSessionId = data.payment_session_id;
        const orderId = generatedOrderId;

        // 2️⃣ Open Cashfree payment popup
        const cf = window.Cashfree({
          mode: "sandbox"
        });
        const dropin = cf.checkout({
          paymentSessionId: paymentSessionId,
          redirectTarget: "_modal",
          returnUrl: `${window.location.origin}/order-success?order_id=${orderId}&verify=true`,
          onVerify: (orderID) => {
            // Handle successful payment verification
            window.location.href = `/order-success?order_id=${orderID}&verify=true`;
          },
        });

        if (dropin.redirect) {
          // if the redirectTarget is not _modal
          console.log("redirecting to", dropin.redirect)
        }
        if (dropin.error) {
          // handle error
          console.error(dropin.error)
        }
      } else {
        alert("Error: could not create payment order.");
      }
    } catch (error) {
      console.error("Payment submission error:", error);
      alert("An error occurred while processing your payment. Please try again.");
    }
  };

  const resetOrder = () => {
    setCart([]);
    setCurrentStep('products');
    setAddress({ name: '', email: '', phone: '', street: '', city: '', state: '', zip: '' });
    setPayment({ method: 'cashfree' });
    setOrderId('');
  };



  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="glass sticky top-0 z-50 border-b border-border/30">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold gradient-text">Tech Shop</h1>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" className="relative">
                <ShoppingCart className="w-6 h-6" />
                {cart.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-primary text-primary-foreground">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="glass">
              <SheetHeader>
                <SheetTitle>Shopping Cart</SheetTitle>
                <SheetDescription>Your selected items</SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                {cart.length === 0 ? (
                  <p className="text-muted-foreground">Your cart is empty</p>
                ) : (
                  <>
                    {cart.map(item => (
                      <div key={item.id} className="flex items-center space-x-4">
                        <img src={item.image} alt={item.name} className="w-12 h-12 rounded" />
                        <div className="flex-1">
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">Rs {item.price}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span>{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Total: Rs {getTotal().toFixed(2)}</span>
                      <SheetTrigger asChild>
                        <Button onClick={() => setCurrentStep('checkout')}>
                          Checkout
                        </Button>
                      </SheetTrigger>
                    </div>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {currentStep === 'products' && (
          <>
            <h2 className="text-3xl font-bold mb-8 gradient-text">Our Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(product => (
                <Card key={product.id} className="glass-hover">
                  <CardHeader>
                    <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded" />
                    <CardTitle>{product.name}</CardTitle>
                    <CardDescription>{product.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold gradient-text">Rs {product.price}</span>
                      <Button onClick={() => addToCart(product)}>
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}

        {currentStep === 'checkout' && (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 gradient-text">Shipping Address</h2>
            <form onSubmit={handleAddressSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={address.name}
                    onChange={(e) => setAddress(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={address.email}
                    onChange={(e) => setAddress(prev => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={address.phone}
                    onChange={(e) => setAddress(prev => ({ ...prev, phone: e.target.value }))}
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="street">Street Address</Label>
                <Textarea
                  id="street"
                  value={address.street}
                  onChange={(e) => setAddress(prev => ({ ...prev, street: e.target.value }))}
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={address.city}
                    onChange={(e) => setAddress(prev => ({ ...prev, city: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={address.state}
                    onChange={(e) => setAddress(prev => ({ ...prev, state: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="zip">ZIP Code</Label>
                  <Input
                    id="zip"
                    value={address.zip}
                    onChange={(e) => setAddress(prev => ({ ...prev, zip: e.target.value }))}
                    required
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setCurrentStep('products')}>
                  Back to Products
                </Button>
                <Button type="submit">
                  <MapPin className="w-4 h-4 mr-2" />
                  Continue to Payment
                </Button>
              </div>
            </form>
          </div>
        )}

        {currentStep === 'payment' && (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 gradient-text">Payment Information</h2>
            <div className="space-y-6">
              <div className="glass p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Choose Payment Method</h3>
                <p className="text-muted-foreground mb-4">
                  You can pay using UPI, Card, or Net Banking through our secure payment gateway.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="cashfree"
                      name="paymentMethod"
                      value="cashfree"
                      checked={payment.method === 'cashfree'}
                      onChange={(e) => setPayment({ method: e.target.value })}
                    />
                    <Label htmlFor="cashfree">Cashfree (UPI, Card, Net Banking)</Label>
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setCurrentStep('checkout')}>
                  Back to Address
                </Button>
                <Button onClick={handlePaymentSubmit}>
                  <CreditCard className="w-4 h-4 mr-2" />
                  Proceed to Payment
                </Button>
              </div>
            </div>
          </div>
        )}

        {currentStep === 'confirmation' && (
          <div className="max-w-2xl mx-auto text-center">
            <CheckCircle className="w-16 h-16 text-accent mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4 gradient-text">Order Confirmed!</h2>
            <p className="text-muted-foreground mb-8">
              Thank you for your purchase. Your order has been successfully placed.
            </p>
            <div className="glass p-6 rounded-lg mb-8">
              <h3 className="font-semibold mb-4">Order Summary</h3>
              {cart.map(item => (
                <div key={item.id} className="flex justify-between mb-2">
                  <span>{item.name} x{item.quantity}</span>
                  <span>Rs {(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <Separator className="my-4" />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>Rs {getTotal().toFixed(2)}</span>
              </div>
            </div>
            <Button onClick={resetOrder}>
              Continue Shopping
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Shop;
