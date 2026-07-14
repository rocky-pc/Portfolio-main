import { useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, MapPin, Package, CreditCard, Clock } from "lucide-react";
import TechGadgetProImage from '../images/Tech Gadget Pro.webp';
import WirelessHeadphonesImage from '../images/Wireless Headphones.webp';
import SmartWatchImage from '../images/Smart Watch.jpg';
import LaptopStandImage from '../images/laptop stand.jpg';
import GamingMouseImage from '../images/Gaming Mouse.avif';
import BluetoothSpeakerImage from '../images/Bluetooth Speaker.webp';
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  id: string;
  orderId: string;
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
  total: number;
  timestamp: any;
  status: string;
}

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user?.email) {
        setUserEmail(user.email);
        try {
          const q = query(collection(db, "orders"), where("userId", "==", user.uid));
          const snap = await getDocs(q);
          const data = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Order[];
          // Sort orders by timestamp (newest first)
          data.sort((a, b) => {
            const aTime = a.timestamp?.toDate?.() || new Date(0);
            const bTime = b.timestamp?.toDate?.() || new Date(0);
            return bTime.getTime() - aTime.getTime();
          });
          setOrders(data);
        } catch (error) {
          console.error("Error fetching orders:", error);
        }
      } else {
        setUserEmail(null);
        setOrders([]);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'processing':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'shipped':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'delivered':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'N/A';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Function to get the correct image for each product
  const getProductImage = (itemName: string) => {
    const imageMap: { [key: string]: string } = {
      'Gaming Pad': TechGadgetProImage,
      'Wireless Headphones': WirelessHeadphonesImage,
      'Smart Watch': SmartWatchImage,
      'Laptop Stand': LaptopStandImage,
      'Gaming Mouse': GamingMouseImage,
      'Bluetooth Speaker': BluetoothSpeakerImage,
    };
    return imageMap[itemName] || '/placeholder.svg';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-8 gradient-text">Your Orders</h1>
            <div className="animate-pulse">Loading your orders...</div>
          </div>
        </div>
      </div>
    );
  }

  if (!userEmail) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <Card className="glass max-w-md mx-auto text-center">
          <CardContent className="p-8">
            <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-xl font-semibold mb-2">Please Log In</h2>
            <p className="text-muted-foreground">You need to be logged in to view your orders.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4 gradient-text">Your Orders</h1>
          <p className="text-muted-foreground">Track and manage your purchase history</p>
        </div>

        {orders.length === 0 ? (
          <Card className="glass max-w-md mx-auto text-center">
            <CardContent className="p-8">
              <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No Orders Yet</h3>
              <p className="text-muted-foreground mb-4">You haven't placed any orders yet.</p>
              <a href="/shop" className="inline-block px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                Start Shopping
              </a>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order.id} className="glass overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <CardTitle className="text-lg mb-2">Order #{order.orderId}</CardTitle>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(order.timestamp)}
                        </div>
                        <Badge className={`border ${getStatusColor(order.status)}`}>
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold gradient-text">₹{order.total.toFixed(2)}</div>
                      <div className="text-sm text-muted-foreground">{order.cart?.length || 0} item{order.cart?.length !== 1 ? 's' : ''}</div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Order Items */}
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Package className="w-4 h-4" />
                      Order Items
                    </h4>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {order.cart?.map((item, index) => (
                        <div key={index} className="flex gap-3 p-3 rounded-lg bg-card/50 border">
                          <img
                            src={getProductImage(item.name)}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                            onError={(e) => {
                              e.currentTarget.src = '/placeholder.svg';
                            }}
                          />
                          <div className="flex-1 min-w-0">
                            <h5 className="font-medium text-sm truncate">{item.name}</h5>
                            <div className="text-xs text-muted-foreground mt-1">
                              Quantity: {item.quantity}
                            </div>
                            <div className="text-sm font-semibold text-primary mt-1">
                              ₹{(item.price * item.quantity).toFixed(2)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Shipping Address */}
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Shipping Address
                    </h4>
                    <div className="bg-card/50 p-4 rounded-lg">
                      <div className="font-medium">{order.address?.name}</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {order.address?.street}<br />
                        {order.address?.city}, {order.address?.state} {order.address?.zip}
                      </div>
                      <div className="text-sm text-muted-foreground mt-2">
                        📧 {order.address?.email}<br />
                        📞 {order.address?.phone}
                      </div>
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="bg-primary/5 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4" />
                        <span className="font-medium">Order Total</span>
                      </div>
                      <div className="text-xl font-bold gradient-text">₹{order.total.toFixed(2)}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
      <div className="text-center mt-8">
        <Button onClick={() => navigate('/shop')}>Continue Shopping</Button>
      </div>
    </div>
  );
}
