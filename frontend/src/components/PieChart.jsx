"use client";

import React from "react";
import dynamic from "next/dynamic";

// SSR-disabled wrapper
const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false });

/**
 * data: Array<{ name: string, value: number }>
 * title: string
 */
export default function PieChart({ data = [], title = "" }) {
  const option = {
    title: {
      text: title,
      left: "center",
      top: 10,
      textStyle: { fontSize: 16, fontWeight: 700 },
    },
    tooltip: {
      trigger: "item",
      formatter: "{b}: {c} ({d}%)",
    },
    legend: {
      orient: "horizontal",
      bottom: 10,
    },
    series: [
      {
        name: title,
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        label: {
          show: true,
          position: "outside",
          formatter: "{b}\n{d}%",
        },
        labelLine: {
          length: 8,
          length2: 12,
        },
        data,
      },
    ],
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <ReactECharts option={option} style={{ height: 350 }} />
    </div>
  );
}
