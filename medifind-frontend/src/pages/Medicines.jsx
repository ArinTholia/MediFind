import { useEffect, useState } from "react";
import api from "../services/api";

function Medicines() {

  const [medicines, setMedicines] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load all medicines
  const fetchMedicines = async () => {

    try {

      setLoading(true);
      setError("");

      const response = await api.get("/medicines");

      setMedicines(response.data);

    } catch (error) {

      console.error("Error fetching medicines:", error);
      setError("Unable to load medicines.");

    } finally {

      setLoading(false);

    }
  };

  // Automatically load medicines when page opens
  useEffect(() => {

    fetchMedicines();

  }, []);

  // Search medicine
  const handleSearch = async (e) => {

    e.preventDefault();

    // If search box is empty, show all medicines
    if (searchName.trim() === "") {

      fetchMedicines();
      return;

    }

    try {

      setLoading(true);
      setError("");

      const response = await api.get(
        `/medicines/search?name=${encodeURIComponent(searchName)}`
      );

      setMedicines(response.data);

    } catch (error) {

      console.error("Search error:", error);
      setError("Unable to search medicines.");

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="medicines-container">

      <h1>Available Medicines</h1>

      {/* Search Form */}

      <form
        className="medicine-search"
        onSubmit={handleSearch}
      >

        <input
          type="text"
          placeholder="Search medicine by name..."
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />

        <button type="submit">
          Search
        </button>

      </form>

      {error && <p>{error}</p>}

      {loading ? (

        <h2 className="loading-text">
          Loading medicines...
        </h2>

      ) : medicines.length === 0 ? (

        <p className="no-medicines">
          No medicines found.
        </p>

      ) : (

        <div className="medicine-grid">

          {medicines.map((medicine) => (

            <div
              className="medicine-card"
              key={medicine.id}
            >

              <h2>{medicine.name}</h2>

              <p>
                <strong>Manufacturer:</strong>{" "}
                {medicine.manufacturer || "Not available"}
              </p>

              <p>
                <strong>Price:</strong>{" "}
                {medicine.price != null
                  ? `₹${medicine.price}`
                  : "Not available"}
              </p>

              <p>
                <strong>Stock:</strong>{" "}
                {medicine.stock != null
                  ? medicine.stock
                  : "Not available"}
              </p>
                {medicine.stock == null ? (

  <span className="stock unknown">
    Availability Unknown
  </span>

) : medicine.stock === 0 ? (

  <span className="stock out">
    Out of Stock
  </span>

) : medicine.stock <= 10 ? (

  <span className="stock low">
    Low Stock
  </span>

) : (

  <span className="stock available">
    In Stock
  </span>

)}
              <p>
                <strong>Pharmacy:</strong>{" "}
                {medicine.pharmacyName || "Not available"}
              </p>

              <p>
                <strong>Location:</strong>{" "}
                {medicine.location || "Not available"}
              </p>

            </div>

          ))}

        </div>

      )}

    </div>

  );

}

export default Medicines;