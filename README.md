# Renata Analytics Dashboard

**Deadline:** May 21, 2025  
**Tech Stack:**  
- **Frontend:** Next.js (React)  
- **Charts:** --
- **Styling / UI:** Tailwind CSS 
- **Deployment:** Vercel  

---

## Project Overview

Build an interactive analytics dashboard for Renata PLC that includes:

1. **Task 1 (Frontend)**  
   - A 3‑variable bar chart  
   - A 2‑variable gauge chart with Low/Medium/High tooltips  

2. **Task 2 (Full‑Stack Dashboard)**  
   - ERD design for the given dataset  
   - Sidebar + dashboard layout with multiple visuals and filters  
   - Role‑based login (Admin, Sales Rep, Viewer)  

---


## 🚀 Getting Started

1. **Clone & Install**

   ```bash
   git clone <repo-url>
   cd frontend
   npm install

2. **Data Files**

 Place Task 1 CSVs in public/data/task1BarChart.csv & public/data/task2GaugeChart.csv.

3. **Run Dev Server**

bash
Copy
Edit
npm run dev
Open http://localhost:3000.

🖥️ Pages & Routes
------------------

*   /Landing page with animated lamp, shooting stars, and **Task 1** / **Task 2** buttons.
    
*   /task1**Task 1**: Bar chart + Gauge chart from CSV.
    
*   /loginLogin form. Stores username & role in sessionStorage.
    
*   /dashboard**DashboardHome** (protected):
    
    *   Advanced Filters (Division, Gender, Age, Income)
        
    *   KPI cards (Total Customers, Avg Income, % Married)
        
    *   2×2 grid of visual cards
        
*   /dashboard/barAvg Income by Division bar chart (Admin: CSV export + drill‑down).
    
*   /dashboard/gaugeMonthly Sales gauge chart.
    
*   /dashboard/genderGender Split pie chart.
    
*   /dashboard/ageAge Distribution histogram.
    
*   /dashboard/customers _(optional)_CRUD table of customers (Admin edit/add/delete, SalesRep read‑only).
    

🎨 Styling & Fonts
------------------

*   **Tailwind CSS** for utility‑first styling.
    
*   **Montserrat** loaded via next/font/google as the global font-sans.
    
*   **MUI** for layout and controls (AppBar, Drawer, Cards, DataGrid, Sliders).
    
*   **ECharts** (via echarts-for-react) for interactive charts.
    
*   **Framer Motion** for entrance animations.
    

🔧 Key Components
-----------------

*   **FilterPanel**:Division select, Gender, Age & Income sliders. Respects role.
    
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
        

Use the **Impersonate SalesRep** switch in the AppBar to toggle views for testing.

📦 Build & Deploy
-----------------

*   bashCopyEditnpm run build
    
*   bashCopyEditnpm start
    

Deploy to Vercel or Netlify—public folder CSVs will be served directly.

📝 Notes
--------

*   Ensure CSV file paths match public/data/....
    
*   The optional **CRUD API** lives under src/app/api/customers/route.js.
    
*   Dark/light mode and skeleton loaders are provided as commented examples—implement as needed.