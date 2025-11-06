import { useState, useEffect } from "react";
import { db, auth } from "../firebaseConfig";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

export default function Orders() {
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [orders, setOrders] = useState<any[]>([]);

  const user = auth.currentUser;

  const handleSubmit = async () => {
    if (!user) return alert("Please log in first!");

    await addDoc(collection(db, "orders"), {
      userId: user.uid,
      item,
      quantity,
      timestamp: new Date(),
    });
    alert("Order placed!");
    fetchOrders();
  };

  const fetchOrders = async () => {
    if (!user) return;
    const q = query(collection(db, "orders"), where("userId", "==", user.uid));
    const snap = await getDocs(q);
    const data = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setOrders(data);
  };

  useEffect(() => {
    fetchOrders();
  }, [user]);

  return (
    <div>
      <h2>Place Order</h2>
      <input value={item} onChange={(e) => setItem(e.target.value)} placeholder="Item name" />
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        placeholder="Quantity"
      />
      <button onClick={handleSubmit}>Submit</button>

      <h3>My Orders</h3>
      <ul>
        {orders.map((o) => (
          <li key={o.id}>
            {o.item} × {o.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
}
