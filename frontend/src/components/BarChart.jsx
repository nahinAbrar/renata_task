"use client";

import React from "react";
import dynamic from "next/dynamic";

// Load the React wrapper without SSR
const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false });

export default function BarChart({ data }) {
    // 1) Sort by TotalSales descending
    const sorted = [...data].sort((a, b) => b.TotalSales - a.TotalSales);

    // 2) Extract categories and values
    const products = sorted.map(r => r.Product);
    const sales = sorted.map(r => r.TotalSales);
    const totalValues = sorted.map(r => r.TotalValue);

    const maxSales = Math.max(...sales);
    const roundedMax = Math.ceil(maxSales / 2) * 2; // round up to nearest even number

    // 3) Build the ECharts option
    const option = {
        title: {
            text: "3 Variable Interactive Bar Chart",
            left: "left",
            textStyle: { fontSize: 16, fontWeight: 700 }
        },
        dataset: {
            // supply the array of objects directly
            source: sorted,
            dimensions: ["Product", "TotalSales", "TotalValue"]
        },
        grid: { top: 50, bottom: 50, left: 60, right: 100 },
        xAxis: {
            type: "category",
            data: products,
            name: "Product",             // ← Here’s your title
            nameLocation: "middle",      // positions the title
            nameGap: 30,                 // distance from axis line
            nameTextStyle: {
                color: "#374151"
            },
            axisLine: { lineStyle: { color: "#e5e7eb" } },
            axisTick: { show: false },
            axisLabel: { color: "#6b7280", fontSize: 12 }
        },
        yAxis: {
            type: "value",
            name: "TotalSales",
            nameLocation: "middle",
            nameGap: 40,
            min: 0,
            max: roundedMax,
            splitNumber: roundedMax / 2,        // controls the number of segments
            axisLine: { show: false },
            splitLine: { lineStyle: { color: "#e5e7eb", type: "dashed" } },
            axisLabel: { color: "#6b7280", fontSize: 12 }
        },
        visualMap: {
            show: true,
            type: "continuous",
            min: 10,
            max: 40,
            dimension: 2,             // use TotalValue for coloring
            orient: "vertical",
            right: "5%",
            top: "10%",
            bottom: "10%",
            itemHeight: 300,          // height of the legend
            text: ["Total Value", ""],                 // hide default “High”/“Low” labels
            inRange: {
                color: [
                    "#FFF3E6",  // low
                    "#F27C2D",  // mid
                    "#802706"   // high
                ]
            }
        },
        series: [
            {
                type: "bar",
                // the series will automatically take TotalSales for y,
                // because we encode it below
                encode: {
                    x: "Product",
                    y: "TotalSales",
                    tooltip: ["TotalSales", "TotalValue"]
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
