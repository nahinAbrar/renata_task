"use client";

import React from "react";
import dynamic from "next/dynamic";

// Load the React wrapper without SSR
const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false });

export default function BarChart({ data }) {
  // 1) Sort by TotalSales descending
  const sorted = [...data].sort((a, b) => b.TotalSales - a.TotalSales);

  // 2) Extract categories and values
  const products    = sorted.map(r => r.Product);
  const sales       = sorted.map(r => r.TotalSales);
  const totalValues = sorted.map(r => r.TotalValue);

  // 3) Build the ECharts option
  const option = {
    title: {
      text: "Sales by Product",
      left: "left",
      textStyle: { fontSize: 16, fontWeight: 700 }
    },
    grid: { top: 50, bottom: 50, left: 60, right: 100 },
    xAxis: {
      type: "category",
      data: products,
      axisLine: { lineStyle: { color: "#e5e7eb" } },
      axisTick: { show: false },
      axisLabel: { color: "#6b7280", fontSize: 12 }
    },
    yAxis: {
      type: "value",
      name: "TotalSales",
      nameLocation: "middle",
      nameGap: 40,
      axisLine: { show: false },
      splitLine: { lineStyle: { color: "#e5e7eb", type: "dashed" } },
      axisLabel: { color: "#6b7280", fontSize: 12 }
    },
    visualMap: {
      show: true,
      orient: "vertical",
      right: 10,
      top: "center",
      min: Math.min(...totalValues),
      max: Math.max(...totalValues),
      text: ["High", "Low"],
      textStyle: { color: "#374151" },
      inRange: {
        color: [
          "#fff7ed", // light (low)
          "#f97316", // mid
          "#7c2d12"  // dark (high)
        ]
      }
    },
    series: [
      {
        type: "bar",
        data: sales,
        barWidth: "40%",
        itemStyle: {
          borderRadius: [4, 4, 0, 0]
        },
        emphasis: {
          itemStyle: {
            color: "#d97706"
          }
        }
      }
    ],
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
      formatter: params => {
        const p = params[0];
        const idx = p.dataIndex;
        return `
          Product: ${products[idx]}<br/>
          TotalSales: ${sales[idx]}<br/>
          TotalValue: ${totalValues[idx]}
        `;
      }
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <ReactECharts option={option} style={{ height: 400 }} />
    </div>
  );
}
