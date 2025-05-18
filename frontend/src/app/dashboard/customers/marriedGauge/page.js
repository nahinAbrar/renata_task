// src/app/dashboard/customers/marriedGauge/page.js
"use client";

import { useCustomers } from "@/utils/useCustomers";
import GaugeChart from "@/components/GaugeChart"; // tweak for percent

export default function MarriedGauge() {
  const customers = useCustomers();
  if (!customers.length) return <div>Loading…</div>;

  const total = customers.length;
  const marriedCount = customers.filter(c => c.married).length;
  const percent = (marriedCount / total) * 100;

  return <GaugeChart value={percent} max={100} />;
}
