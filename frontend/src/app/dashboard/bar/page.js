"use client";

import React, { useState, useMemo } from "react";
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  Button,
  CircularProgress
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/FileDownload";
import CloseIcon    from "@mui/icons-material/Close";

import { useCustomers } from "@/utils/useCustomers";
import { useFilters }   from "@/contexts/FilterContext";
import { useAuth }      from "@/utils/useAuth";
import BarChart        from "@/components/BarChart";
import { saveAs }      from "file-saver"; // npm install file-saver

export default function AvgIncomeBarPage() {
    // 1) Hooks at the top
    const customers = useCustomers();
    const { division, gender, ageRange } = useFilters();
    const { role } = useAuth();

    // State for drill modal
    const [open, setOpen] = useState(false);
    const [drillDivision, setDrillDivision] = useState(null);


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

    // CSV Export
    const handleDownload = () => {
        // Build CSV: header + rows
        const header = ["Division", "AvgIncome"];
        const rows = data.map(r => [r.category, r.value.toFixed(2)]);
        const csv = [header, ...rows].map(r => r.join(",")).join("\n");
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
        saveAs(blob, "avg-income-by-division.csv");
    };

    // Bar click handler
    const onChartClick = params => {
        const clickedDiv = params.name;  // category name
        setDrillDivision(clickedDiv);
        setOpen(true);
    };

    // Customers in drilled division
    const drillCustomers = customers.filter(c => c.division === drillDivision);

    // 5) Render
    return (
        <Paper sx={{ p: 4, position: "relative" }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Average Income by Division
                </Typography>

                {role === "Admin" && (
                    <IconButton onClick={handleDownload} size="large">
                        <DownloadIcon />
                    </IconButton>
                )}
            </Box>

            <BarChart
                data={data}
                xKey="category"
                yKey="value"
                xLabel="Division"
                yLabel="Avg Income (USD)"
                // ECharts onClick binding
                onEvents={{ click: onChartClick }}
            />

            {/* Drill-down Dialog */}
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
                <DialogTitle sx={{ m: 0, p: 2 }}>
                    Customers in “{drillDivision}”
                    <IconButton
                        aria-label="close"
                        onClick={() => setOpen(false)}
                        sx={{ position: "absolute", right: 8, top: 8 }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    <List>
                        {drillCustomers.map(c => (
                            <ListItem key={c.id} divider>
                                <ListItemText
                                    primary={c.name}
                                    secondary={`Age: ${c.age}, Income: $${c.income.toLocaleString()}`}
                                />
                            </ListItem>
                        ))}
                    </List>
                </DialogContent>
            </Dialog>
        </Paper>
    );
}
