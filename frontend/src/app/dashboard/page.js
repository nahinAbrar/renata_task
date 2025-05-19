"use client";

import React from "react";
import Link from "next/link";
import { useCustomers } from "@/utils/useCustomers";
import { useFilters } from "@/contexts/FilterContext";

import {
    Box,
    Grid,
    Card,
    CardActionArea,
    CardContent,
    Typography,
    CircularProgress,
} from "@mui/material";

import PeopleIcon from "@mui/icons-material/People";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BarChartIcon from "@mui/icons-material/BarChart";
import SpeedIcon from "@mui/icons-material/Speed";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import PieChartIcon from "@mui/icons-material/PieChart";
import FilterPanel from "@/components/FilterPanel";

export default function DashboardHome() {
    const customers = useCustomers();
    const { division, gender, ageRange, incomeRange } = useFilters();

    if (!customers.length) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
                <CircularProgress />
            </Box>
        );
    }

    // apply filters
    const filtered = customers.filter(c =>
        (division ? c.division === division : true) &&
        (gender ? c.gender === gender : true) &&
        c.age >= ageRange[0] &&
        c.age <= ageRange[1]
    );

    // KPI computations
    const totalCustomers = filtered.length;
    const avgIncome =
        filtered.reduce((sum, c) => sum + c.income, 0) / totalCustomers || 0;
    const marriedPct =
        (filtered.filter(c => c.married).length / totalCustomers) * 100 || 0;

    const kpis = [
        {
            label: "Total Customers",
            value: totalCustomers,
            icon: <PeopleIcon fontSize="large" color="primary" />,
        },
        {
            label: "Avg. Income",
            value: `$${(avgIncome / 1000).toFixed(1)}k`,
            icon: <AttachMoneyIcon fontSize="large" color="secondary" />,
        },
        {
            label: "% Married",
            value: `${marriedPct.toFixed(1)}%`,
            icon: <FavoriteIcon fontSize="large" sx={{ color: "#f59e0b" }} />,
        },
    ];

    // Visual cards
    const visuals = [
        {
            label: "Sales by Product",
            href: "/dashboard/bar",
            icon: <BarChartIcon fontSize="large" color="action" />,
            subtitle: "Bar chart view of product sales",
        },
        {
            label: "Monthly Sales",
            href: "/dashboard/gauge",
            icon: <SpeedIcon fontSize="large" color="action" />,
            subtitle: "Gauge chart view of monthly performance",
        },
        {
            label: "Gender Split",
            href: "/dashboard/gender",
            icon: <PieChartIcon fontSize="large" color="action" />,
            subtitle: "Pie chart view of gender ratio",
        },
        {
            label: "Age Distribution",
            href: "/dashboard/age",
            icon: <QueryStatsIcon fontSize="large" color="action" />,
            subtitle: "Histogram of customer ages",
        },
    ];

    return (
        <Box>

            <FilterPanel />

            {/* KPI Row */}
            <Grid container spacing={2} sx={{ mb: 4 }}>
                {kpis.map(({ label, value, icon }) => (
                    <Grid item xs={12} sm={4} key={label}>
                        <Card elevation={3}>
                            <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                {icon}
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        {label}
                                    </Typography>
                                    <Typography variant="h5">{value}</Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Visuals Grid */}
            <Grid container spacing={2}>
                {visuals.map(({ label, href, icon, subtitle }) => (
                    <Grid item xs={12} sm={6} key={href}>
                        <Card elevation={2} sx={{ height: 140 }}>
                            <CardActionArea
                                component={Link}
                                href={href}
                                sx={{ height: "100%" }}
                            >
                                <CardContent
                                    sx={{
                                        height: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        gap: 1
                                    }}
                                >
                                    {icon}
                                    <Typography variant="h6">{label}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {subtitle}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
