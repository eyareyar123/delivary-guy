'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';


type DeliveryPoint = {
  id: number;
  clientName: string;
  address: string;
  crates: number;
};

export default function Home() {
  const [deliveryPoints, setDeliveryPoints] = useState<DeliveryPoint[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [clientName, setClientName] = useState('');
  const [address, setAddress] = useState('');
  const [crates, setCrates] = useState(0);

  const handleAddPoint = () => {
    const newPoint: DeliveryPoint = {
      id: Date.now(),
      clientName,
      address,
      crates,
    };
    setDeliveryPoints([...deliveryPoints, newPoint]);
    setClientName('');
    setAddress('');
    setCrates(0);
    setShowForm(false);
  };

  return (
    <main style={{ padding: '2rem' }}>
      <main className="flex items-center justify-center">
        <h1 className="text-4xl font-bold">Delivery Line Manager</h1>
      </main>

      {/* <button onClick={() => setShowForm(true)}>Add Delivery Point</button> */}

      <Button onClick={() => setShowForm(true)}>Add Delivery Point</Button>


      {showForm && (
        <div className="flex flex-col space-y-4 mt-4 max-w-md">
          <div>
            <Label htmlFor="clientName">Client Name</Label>
            <Input
              id="clientName"
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="Client Name"
            />
          </div>

          <div>
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address"
            />
          </div>

          <div>
            <Label htmlFor="crates">Number of Crates</Label>
            <Input
              id="crates"
              type="number"
              value={crates}
              onChange={(e) => setCrates(parseInt(e.target.value) || 0)}
              placeholder="Crates"
              min={0}
            />
          </div>

          <Button onClick={handleAddPoint}>Save</Button>
        </div>

      )}

      <ul style={{ marginTop: '2rem' }}>
        {deliveryPoints.map((point) => (
          <li key={point.id}>
            🧍 {point.clientName} — 📍 {point.address} — 📦 {point.crates} crate{point.crates !== 1 ? 's' : ''}
          </li>
        ))}
      </ul>
    </main>
  );
}
