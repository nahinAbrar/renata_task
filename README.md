# Renata Analytics Dashboard

**Deadline:** May 21, 2025  
**Tech Stack:**  
- **Frontend:** Next.js (React)  
- **Charts:** React Echarts
- **Styling / UI:** Tailwind CSS 
- **Components:** Acternity UI, Material UI
- **Deployment:** Vercel  

---

## Project Overview

Build an interactive analytics dashboard that includes:

1. **Task 1 (Frontend)**  
   - A 3‑variable bar chart  
   - A 2‑variable gauge chart with Low/Medium/High tooltips  

2. **Task 2 (Full‑Stack Dashboard)**  
   - ERD design for the given dataset  
   - Sidebar + dashboard layout with multiple visuals and filters  
   - Role‑based login (Admin, Sales Rep)  

---


## 🚀 Getting Started

1. **Clone & Install**

   ```bash
   git clone https://github.com/nahinAbrar/renata_task
   cd frontend
   npm install

2. **Data Files**

 Place Task 1 CSVs in public/data/task1BarChart.csv & public/data/task2GaugeChart.csv.

3. **Run Dev Server**

npm run dev
Open http://localhost:3000.

🖥️ Pages & Routes
------------------

*   /Landing page with animated lamp, shooting stars, and **Task 1** / **Task 2** buttons.
    
*   /task1 Task 1: Bar chart + Gauge chart from CSV.
    
*   /login Login form. Stores username & role in sessionStorage.
    
*   /dashboard **DashboardHome** (protected):
    
    *   Advanced Filters (Division, Gender, Age, Income)
        
    *   KPI cards (Total Customers, Avg Income, % Married)
        
    *   2×2 grid of visual cards
        
*   /dashboard/bar Avg Income by Division bar chart (Admin: CSV export + drill‑down).
    
*   /dashboard/gender Gender Split pie chart.
    
*   /dashboard/age Age Distribution histogram.
    

🎨 Styling & Fonts
------------------

*   **Tailwind CSS** for utility‑first styling.
    
*   **Montserrat** loaded via next/font/google as the global font-sans.
    
*   **MUI** for layout and controls (AppBar, Drawer, Cards, DataGrid, Sliders).
    
*   **ECharts** (via echarts-for-react) for interactive charts.
    
*   **Motion** for entrance animations.
    

🔧 Key Components
-----------------

*   **FilterPanel**: Division select, Gender, Age & Income sliders. Respects role.
    
*   **BarChart | GaugeChart | PieChart**:Reusable ECharts wrappers.
    
*   **LampContainer**:Animated conic‑gradient lamp background.
    
*   **MagicBorderButton**:Spinning‑border button with customizable colors & text.
    
*   **useAuth**:Hook reading sessionStorage for role & username.
    
*   **useCustomers**:Loads and parses public/data/customers.csv.
    

📑 Role‑Based Access
--------------------

*   **Admin**
    
    *   All filters, KPI export icons, Add/Delete in Customers table, drill‑down.
        
*   **SalesRep**
    
    *   Only Division filter, read‑only charts & tables.
        

Use the **Toggle SalesRep** switch in the AppBar to toggle views for testing.

📦 Build & Deploy
-----------------

*   npm run build
    
*   npm start
    

Deploy to Vercel or Netlify—public folder CSVs will be served directly.

📝 Notes
--------

*   Ensure CSV file paths match public/data/....
    
*   Project Started: 16 May, Ended: 21 May