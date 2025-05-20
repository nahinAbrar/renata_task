"use client";

import React, { useMemo } from "react";
import { useCustomers } from "@/utils/useCustomers";
import { useFilters }   from "@/contexts/FilterContext";
import dynamic          from "next/dynamic";

import {
  Box,
  Paper,
  Typography,
  CircularProgress
} from "@mui/material";

const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false });

export default function AgeDistributionPage() {
  // 1) Always call hooks first
  const customers = useCustomers();
  const { division, gender, ageRange, incomeRange } = useFilters();

  // 2) Apply filters (safe even if customers is empty)
  const filtered = customers.filter(c =>
    (division ? c.division === division : true) &&
    (gender   ? c.gender   === gender   : true) &&
    c.age >= ageRange[0] && c.age <= ageRange[1] &&
    c.income >= incomeRange[0] && c.income <= incomeRange[1]
  );

  // 3) Compute bins & counts via useMemo
  const { bins, counts } = useMemo(() => {
    const ages = filtered.map(c => c.age);
    if (!ages.length) return { bins: [], counts: [] };

    const binSize = 10;
    const minAge = Math.min(...ages);
    const maxAge = Math.max(...ages);
    const start  = Math.floor(minAge / binSize) * binSize;
    const end    = Math.ceil(maxAge / binSize) * binSize;

    const binLabels = [];
    for (let b = start; b < end; b += binSize) {
      binLabels.push(`${b}–${b + binSize - 1}`);
    }

    const cnts = Array(binLabels.length).fill(0);
    filtered.forEach(c => {
      const idx = Math.min(
        Math.floor((c.age - start) / binSize),
        binLabels.length - 1
      );
      cnts[idx]++;
    });

    return { bins: binLabels, counts: cnts };
  }, [filtered]);

  // 4) If still loading customers, show spinner
  if (!customers.length) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  // 5) Render the chart
  const option = {
    title: { text: "Age Distribution", left: "center" },
    tooltip: { trigger: "axis", formatter: p => `${p[0].name}<br/>Count: ${p[0].value}` },
    xAxis: {
      type: "category",
      data: bins,
      name: "Age Range",
      axisLabel: { rotate: 45 }
    },
    yAxis: { type: "value", name: "Count" },
    series: [{ type: "bar", data: counts, barWidth: "60%", itemStyle: { borderRadius: [4,4,0,0] } }],
    grid: { top: 60, bottom: 80, left: 60, right: 40 }
  };

  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h6" gutterBottom>
        Customer Age Distribution
      </Typography>
      {bins.length ? (
        <ReactECharts option={option} style={{ height: 400 }} />
      ) : (
        <Typography>No data to display.</Typography>
      )}
    </Paper>
  );
}
