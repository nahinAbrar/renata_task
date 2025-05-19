// src/app/dashboard/page.js
"use client";

import React from "react";
import Link from "next/link";
import { useCustomers } from "@/utils/useCustomers";
import {
    Box,
    Grid,
    Card,
    CardContent,
    Typography,
    CircularProgress,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useFilters } from "@/contexts/FilterContext";

export default function DashboardHome() {
    const customers = useCustomers();
    const filters = useFilters();

    // Show loader while data is fetching
    if (!customers.length) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
                <CircularProgress />
            </Box>
        );
    }

    const filtered = customers.filter(c =>
        (filters.division ? c.division === filters.division : true) &&
        (filters.gender ? c.gender === filters.gender : true) &&
        c.age >= filters.ageRange[0] &&
        c.age <= filters.ageRange[1]
    );

    // Compute KPIs
    const totalCustomers = customers.length;
    const avgIncome =
        filtered.reduce((sum, c) => sum + c.income, 0) / totalCustomers;
    const marriedPct =
        (filtered.filter(c => c.married).length / totalCustomers) * 100;

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

    return (
        <Box>
            {/* Existing Welcome & Cards */}
            <Typography variant="h4" gutterBottom>
                Welcome to the Renata Dashboard
            </Typography>
            <Typography variant="body1" gutterBottom>
                Select a view from the sidebar or click one of the cards below to get started.
            </Typography>


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



            <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={12} sm={6} md={4}>
                    <Link href="/dashboard/bar" passHref legacyBehavior>
                        <Card sx={{ cursor: "pointer" }} elevation={2}>
                            <CardContent>
                                <Typography variant="h6">Bar Chart</Typography>
                                <Typography variant="body2" color="text.secondary">
                                   Avg income by division
                                </Typography>
                            </CardContent>
                        </Card>
                    </Link>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <Link href="/dashboard/gender" passHref legacyBehavior>
                        <Card sx={{ cursor: "pointer" }} elevation={2}>
                            <CardContent>
                                <Typography variant="h6">Pie Chart</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    See Gender Split
                                </Typography>
                            </CardContent>
                        </Card>
                    </Link>
                </Grid>
            </Grid>
        </Box>
    );
}
