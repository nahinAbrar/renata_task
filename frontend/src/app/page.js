'use client';
import { useEffect, useState } from "react";
import { loadCsvFromFile } from "@/utils/loadCsv";
import BarChart from "@/components/BarChart";

export default function Home() {
  const [barData, setBarData] = useState([]);

  useEffect(() => {
    loadCsvFromFile("/data/task1BarChart.csv").then(setBarData);
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Renata PLC FrontEnd Taks</h1>
      {barData.length
        ? <BarChart data={barData} />
        : <p>Loading chart…</p>
      }
    </main>
  );
}
