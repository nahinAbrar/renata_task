"use client";

import React from "react";
import dynamic from "next/dynamic";

const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false });

function formatNumber(v) {
    if (v >= 1_000_000) return (v / 1_000_000).toFixed(1) + "m";
    if (v >= 1_000) return (v / 1_000).toFixed(1) + "k";
    return v.toString();
}

export default function GaugeChart({ value = 0, min = 0, max = 10 }) {

    const option = {
        tooltip: {
            formatter: () => {
                if (value <= 3_000_000) return "Low";
                if (value < 7_000_000) return "Medium";
                return "High";
            }

        },
        series: [
            {
                name: "Sales",
                type: "gauge",
                radius: "90%",
                startAngle: 220,
                endAngle: -40,
                min: min,
                max,
                splitNumber: 5,
                axisLine: {
                    lineStyle: {
                        roundCap: true,
                        width: 15,
                        color: [
                            [0.3, "#EF4444"],
                            [0.7, "#F59E0B"],
                            [1.0, "#3B82F6"]
                        ]
                    }
                },
                pointer: {
                    length: "60%",
                    width: 8,
                    itemStyle: { color: "#374151" },
                    cap: { show: true, color: "#374151", radius: 6 }
                },
                axisTick: {
                    show: false,
                },
                splitLine: {
                    distance: -30,
                    length: 12,
                    lineStyle: { color: "#999", width: 3 },

                },
                axisLabel: {
                    distance: -20,
                    color: "#6B7280",
                    fontSize: 12,
                    formatter: val => formatNumber(val)
                },
                detail: {
                    valueAnimation: true,
                    formatter: () => formatNumber(value),
                    color: "#111856",
                    fontSize: 24,
                    offsetCenter: [0, "50%"]
                },
                title: {
                    offsetCenter: [0, "-30%"],
                    fontSize: 16,
                    color: "#374151",
                    fontWeight: 600,
                    show: true,
                    text: "Sales"
                },
                data: [{ value }]
            }
        ]
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <ReactECharts option={option} style={{ height: 400, padding: 20, }} />
        </div>
    );
}
