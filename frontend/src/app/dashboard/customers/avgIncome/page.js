"use client";

import { useCustomers } from "@/utils/useCustomers";
import BarChart from "@/components/BarChart"; // tweak to accept generic x/y data

export default function AvgIncomeByDivision() {
  const customers = useCustomers();
  if (!customers.length) return <div>Loading…</div>;

  // compute average income per division
  const byDiv = {};
  customers.forEach(c => {
    byDiv[c.division] = byDiv[c.division] || { sum: 0, cnt: 0 };
    byDiv[c.division].sum += c.income;
    byDiv[c.division].cnt += 1;
  });
  const data = Object.entries(byDiv).map(([div, { sum, cnt }]) => ({
    category: div,
    avgIncome: sum / cnt
  }));

  return <BarChart data={data} xKey="category" yKey="avgIncome" />;
}
