import { useEffect, useState } from "react";
import api from "../services/api";


function Dashboard() {

  const [dashboardData, setDashboardData] = useState({
    totalMedicines: 0,
    totalUsers: 0,
    lowStockMedicines: 0
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    const fetchDashboardData = async () => {

      try {

        const response = await api.get("/dashboard");

        setDashboardData(response.data);

      } catch (error) {

        console.error("Dashboard error:", error);

        setError("Unable to load dashboard data.");

      } finally {

        setLoading(false);

      }
    };

    fetchDashboardData();

  }, []);

  if (loading) {

    return (
      <div className="container">

        <h2>Loading dashboard...</h2>
      </div>
    );

  }

  return (

    <div className="dashboard-container">

      <h1>Dashboard</h1>

  

      {error && <p>{error}</p>}

      <div className="dashboard-cards">

        <div className="dashboard-card">

          <h3>Total Medicines</h3>

          <p>{dashboardData.totalMedicines}</p>

        </div>

        <div className="dashboard-card">

          <h3>Registered Users</h3>

          <p>{dashboardData.totalUsers}</p>

        </div>

        <div className="dashboard-card">

          <h3>Low Stock Medicines</h3>

          <p>{dashboardData.lowStockMedicines}</p>

        </div>

      </div>

    </div>

  );

}

export default Dashboard;