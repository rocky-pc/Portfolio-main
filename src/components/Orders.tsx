import { useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

interface Order {
  id: string;
  orderId: string;
  cart: any[];
  address: any;
  total: number;
  timestamp: any;
  status: string;
}

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user?.email) {
        setUserEmail(user.email);
        const q = query(collection(db, "orders"), where("userId", "==", user.uid));
        const snap = await getDocs(q);
        const data = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Order[];
        setOrders(data);
      } else {
        setUserEmail(null);
        setOrders([]);
      }
    });
    return () => unsubscribe();
  }, []);

  if (!userEmail) return <div className="text-center mt-10">Please log in to view your orders.</div>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul className="space-y-2">
          {orders.map((o) => (
            <li key={o.id} className="border p-4 rounded glass">
              <div className="flex justify-between items-start mb-2">
                <p><strong>Order ID:</strong> {o.orderId}</p>
                <p><strong>Status:</strong> {o.status}</p>
              </div>
              <p><strong>Total:</strong> ₹{o.total}</p>
              <p><strong>Date:</strong> {o.timestamp?.toDate?.()?.toLocaleString() || 'N/A'}</p>
              <div className="mt-2">
                <strong>Items:</strong>
                <ul className="ml-4 mt-1">
                  {o.cart?.map((item, index) => (
                    <li key={index} className="text-sm">
                      {item.name} × {item.quantity} - ₹{item.price * item.quantity}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-2">
                <strong>Shipping Address:</strong>
                <p className="text-sm ml-4">
                  {o.address?.name}<br />
                  {o.address?.street}, {o.address?.city}, {o.address?.state} {o.address?.zip}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
