// src/app/dashboard/bar/page.js
"use client";

import React from "react";
import { useCustomers } from "@/utils/useCustomers";
import { useFilters } from "@/contexts/FilterContext";
import BarChart from "@/components/BarChart";
import { CircularProgress, Box, Typography, Paper } from "@mui/material";

export default function AvgIncomeBarPage() {
    // 1) Hooks at the top
    const customers = useCustomers();
    const { division, gender, ageRange } = useFilters();

    // 2) Loading state
    if (!customers.length) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
                <CircularProgress />
            </Box>
        );
    }

    // 3) Apply filters
    const filtered = customers.filter(c =>
        (division ? c.division === division : true) &&
        (gender ? c.gender === gender : true) &&
        c.age >= ageRange[0] &&
        c.age <= ageRange[1]
    );

    // 4) Aggregate: average income per division
    const sums = {};
    filtered.forEach(c => {
        if (!sums[c.division]) sums[c.division] = { total: 0, count: 0 };
        sums[c.division].total += c.income;
        sums[c.division].count += 1;
    });
    const data = Object.entries(sums).map(([div, { total, count }]) => ({
        category: div,
        value: count ? total / count : 0
    }));

    // 5) Render
    return (
        <Paper sx={{ p: 4 }}>
            <Typography variant="h6" gutterBottom>
                Average Income by Division
            </Typography>
            {data.length ? (
                <BarChart
                    data={data} 
                    xKey="category"
                    yKey="value"
                    xLabel="Division"
                    yLabel="Avg Income (TAKA)"
                />
            ) : (
                <Typography>No data to display.</Typography>
            )}
        </Paper>
    );
}
