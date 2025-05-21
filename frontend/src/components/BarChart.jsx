"use client";

import React from "react";
import dynamic from "next/dynamic";

const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false });

export default function BarChart({
  data = [],
  xKey = "category",
  yKey = "value",
  colorKey = null,
  xLabel = xKey,
  yLabel = yKey,
  onEvents = {}, 
}) {
  // Sort by yKey descending
  const sorted = [...data].sort((a, b) => b[yKey] - a[yKey]);

  
  const categories = sorted.map(r => r[xKey]);
  const values     = sorted.map(r => r[yKey]);

  
  let visualMap = null;
  if (colorKey) {
    const colorValues = sorted.map(r => r[colorKey]);
    visualMap = {
      show: true,
      type: "continuous",
      min: Math.min(...colorValues),
      max: Math.max(...colorValues),
      dimension: 2,           
      orient: "vertical",
      right: "5%",
      top: "10%",
      bottom: "10%",
      itemHeight: 300,
      text: [colorKey, ""],
      inRange: {
        color: ["#FFF3E6", "#F27C2D", "#802706"]
      }
    };
  }

  // Build the option
  const option = {
    title: {
      text: `${yLabel} by ${xLabel}`,
      left: "left",
      textStyle: { fontSize: 16, fontWeight: 700 }
    },
    dataset: {
      source: sorted,
      dimensions: colorKey
        ? [xKey, yKey, colorKey]
        : [xKey, yKey]
    },
    grid: { top: 50, bottom: 50, left: 60, right: colorKey ? 100 : 60 },
    xAxis: {
      type: "category",
      name: xLabel,
      nameLocation: "middle",
      nameGap: 30,
      axisLine: { lineStyle: { color: "#e5e7eb" } },
      axisTick: { show: false },
      axisLabel: { color: "#6b7280", fontSize: 12 }
    },
    yAxis: {
      type: "value",
      name: yLabel,
      nameLocation: "middle",
      nameGap: 40,
      axisLine: { show: false },
      splitLine: { lineStyle: { color: "#e5e7eb", type: "dashed" } },
      axisLabel: { color: "#6b7280", fontSize: 12 }
    },
    ...(visualMap && { visualMap }),
    series: [
      {
        type: "bar",
        encode: {
          x: xKey,
          y: yKey,
          ...(colorKey && { tooltip: [yKey, colorKey] })
        },
        barWidth: "40%",
        itemStyle: { borderRadius: [4, 4, 0, 0] }
      }
    ],
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
      formatter: params => {
        const p = params[0];
        const idx = p.dataIndex;
        let tpl = `\n${xKey}: ${categories[idx]}<br/>${yKey}: ${values[idx]}`;
        if (colorKey) tpl += `<br/>${colorKey}: ${sorted[idx][colorKey]}`;
        return tpl;
      }
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <ReactECharts option={option} style={{ height: 400, width: "100%" }} onEvents={onEvents} />
    </div>
  );
}
