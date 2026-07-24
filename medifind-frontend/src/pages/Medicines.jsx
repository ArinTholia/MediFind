import { useEffect, useState } from "react";
import api from "../services/api";

function Medicines() {

  // Stores medicines received from backend
  const [medicines, setMedicines] = useState([]);

  // Stores text entered in search box
  const [searchName, setSearchName] = useState("");

  // Loading state
  const [loading, setLoading] = useState(true);

  // Error message
  const [error, setError] = useState("");

  // Current availability filter
  const [filter, setFilter] = useState("all");


  // ==========================================
  // LOAD ALL MEDICINES
  // ==========================================

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


  // ==========================================
  // LOAD MEDICINES WHEN PAGE OPENS
  // ==========================================

  useEffect(() => {

    fetchMedicines();

  }, []);


  // ==========================================
  // SEARCH MEDICINE
  // ==========================================

  const handleSearch = async (e) => {

    e.preventDefault();

    // If search box is empty, show all medicines
    if (searchName.trim() === "") {

      setFilter("all");

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

      // Reset availability filter after searching
      setFilter("all");

    } catch (error) {

      console.error("Search error:", error);

      setError("Unable to search medicines.");

    } finally {

      setLoading(false);

    }

  };


  // ==========================================
  // CLEAR SEARCH
  // ==========================================

  const handleClear = () => {

    // Clear search box
    setSearchName("");

    // Reset filter to All
    setFilter("all");

    // Load all medicines again
    fetchMedicines();

  };


  // ==========================================
  // FILTER MEDICINES BY STOCK
  // ==========================================

  const filteredMedicines = medicines.filter((medicine) => {

    // IN STOCK
    // Stock greater than 10

    if (filter === "inStock") {

      return (
        medicine.stock != null &&
        medicine.stock > 10
      );

    }


    // LOW STOCK
    // Stock between 1 and 10

    if (filter === "lowStock") {

      return (
        medicine.stock != null &&
        medicine.stock > 0 &&
        medicine.stock <= 10
      );

    }


    // OUT OF STOCK
    // Stock exactly 0

    if (filter === "outOfStock") {

      return medicine.stock === 0;

    }


    // ALL
    return true;

  });


  // ==========================================
  // PAGE
  // ==========================================

  return (

    <div className="medicines-container">


      {/* PAGE TITLE */}

      <h1>
        Available Medicines
      </h1>


      {/* ======================================
          SEARCH BAR
      ====================================== */}

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


        {/* SEARCH BUTTON */}

        <button type="submit">

          Search

        </button>


        {/* CLEAR BUTTON */}

        <button
          type="button"
          className="clear-button"
          onClick={handleClear}
        >

          Clear

        </button>

      </form>


      {/* ======================================
          AVAILABILITY FILTER BUTTONS
      ====================================== */}

      <div className="filter-buttons">


        {/* ALL */}

        <button
          type="button"
          className={
            filter === "all"
              ? "active-filter"
              : ""
          }
          onClick={() => setFilter("all")}
        >

          All

        </button>


        {/* IN STOCK */}

        <button
          type="button"
          className={
            filter === "inStock"
              ? "active-filter"
              : ""
          }
          onClick={() => setFilter("inStock")}
        >

          In Stock

        </button>


        {/* LOW STOCK */}

        <button
          type="button"
          className={
            filter === "lowStock"
              ? "active-filter"
              : ""
          }
          onClick={() => setFilter("lowStock")}
        >

          Low Stock

        </button>


        {/* OUT OF STOCK */}

        <button
          type="button"
          className={
            filter === "outOfStock"
              ? "active-filter"
              : ""
          }
          onClick={() => setFilter("outOfStock")}
        >

          Out of Stock

        </button>

      </div>


      {/* ======================================
          RESULT COUNT
      ====================================== */}

      {!loading && !error && (

        <p className="result-count">

          {filteredMedicines.length}{" "}

          {filteredMedicines.length === 1
            ? "medicine"
            : "medicines"}{" "}

          found

        </p>

      )}


      {/* ======================================
          ERROR MESSAGE
      ====================================== */}

      {error && (

        <p className="no-medicines">

          {error}

        </p>

      )}


      {/* ======================================
          LOADING / NO RESULTS / MEDICINES
      ====================================== */}

      {loading ? (

        // LOADING

        <h2 className="loading-text">

          Loading medicines...

        </h2>

      ) : filteredMedicines.length === 0 ? (

        // NO MEDICINES FOUND

        <p className="no-medicines">

          No medicines found.

        </p>

      ) : (

        // MEDICINE CARDS

        <div className="medicine-grid">

          {filteredMedicines.map((medicine) => (

            <div
              className="medicine-card"
              key={medicine.id}
            >


              {/* MEDICINE NAME */}

              <h2>

                {medicine.name}

              </h2>


              {/* MANUFACTURER */}

              <p>

                <strong>
                  Manufacturer:
                </strong>{" "}

                {medicine.manufacturer ||
                  "Not available"}

              </p>


              {/* PRICE */}

              <p>

                <strong>
                  Price:
                </strong>{" "}

                {medicine.price != null
                  ? `₹${medicine.price}`
                  : "Not available"}

              </p>


              {/* STOCK */}

              <p>

                <strong>
                  Stock:
                </strong>{" "}

                {medicine.stock != null
                  ? medicine.stock
                  : "Not available"}

              </p>


              {/* ==================================
                  STOCK AVAILABILITY STATUS
              ================================== */}

              {medicine.stock == null ? (

                // UNKNOWN STOCK

                <span className="stock unknown">

                  Availability Unknown

                </span>

              ) : medicine.stock === 0 ? (

                // OUT OF STOCK

                <span className="stock out">

                  Out of Stock

                </span>

              ) : medicine.stock <= 10 ? (

                // LOW STOCK

                <span className="stock low">

                  Low Stock

                </span>

              ) : (

                // IN STOCK

                <span className="stock available">

                  In Stock

                </span>

              )}


              {/* PHARMACY */}

              <p>

                <strong>
                  Pharmacy:
                </strong>{" "}

                {medicine.pharmacyName ||
                  "Not available"}

              </p>


              {/* LOCATION */}

              <p>

                <strong>
                  Location:
                </strong>{" "}

                {medicine.location ||
                  "Not available"}

              </p>

            </div>

          ))}

        </div>

      )}

    </div>

  );

}

export default Medicines;