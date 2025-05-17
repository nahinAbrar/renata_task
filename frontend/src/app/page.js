'use client';
import { useEffect, useState } from "react";
import { loadCsvFromFile } from "@/utils/loadCsv";
import BarChart from "@/components/BarChart";
import GaugeChart from "@/components/GaugeChart";

export default function Home() {
  const [barData, setBarData] = useState([]);

  useEffect(() => {
    loadCsvFromFile("/data/task1BarChart.csv").then(setBarData);
  }, []);

  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(null);
  useEffect(() => {
    loadCsvFromFile("/data/task2GaugeChart.csv").then(raw => {
      const parsed = raw.map(r => ({ month: r.month, sales: Number(r.sales) }));
      setData(parsed);
    });
  }, []);

  const values = data.map(r => r.sales);
  const minSales = Math.min(...values);
  const maxSales = Math.max(...values);
  const gaugeMin = minSales;                      // e.g. 100 000
  const gaugeMax = Math.ceil(maxSales / 1_000_000) * 1_000_000;


  return (
    <section className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Renata PLC FrontEnd Taks</h1>
      <div className="flex flex-col">
        <div>
          {barData.length
            ? <BarChart data={barData} />
            : <p>Loading chart…</p>
          }
        </div>

        <div className="mt-40 w-full mx-auto">
          <h2 className="text-xl font-bold mb-4 text-center">Gauge Chart</h2>
          <div className="grid grid-cols-3 justify-around">
            {/* Month selector */}
            <div className="flex flex-col space-y-2 p-5 justify-center items-center">
              {data.map(d => (
                <button
                  key={d.month}
                  onClick={() => setSelected(d)}
                  className={`px-4 py-2 rounded w-[110px] ${selected?.month === d.month
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-800"
                    }`}
                >
                  {d.month}
                </button>
              ))}
            </div>

            {/* Gauge Chart */}
            <div className="flex-1 flex justify-center items-center">
              <GaugeChart
                value={selected?.sales ?? 0}
                min={gaugeMin}
                max={gaugeMax}
              />
            </div>

            {/* Status display */}
            <div className="flex-1 flex items-center">
              <span className="text-sm font-medium bg-blue-500 text-white px-3 py-2 rounded">
                Status:
              </span>
              <span className="ml-2 text-lg">
                {selected
                  ? selected.sales <= gaugeMax * 0.3
                    ? "Low"
                    : selected.sales <= gaugeMax * 0.7
                      ? "Medium"
                      : "High"
                  : "Select a month to view the status"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
