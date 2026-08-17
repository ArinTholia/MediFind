# 🏥 MediFind

**MediFind** is a full-stack medicine search platform that connects patients with pharmacies. It allows users to search for medicines, check real-time stock availability, compare prices, and locate nearby pharmacies.

## 🚀 Features
- **Smart Search:** Instantly search for medicines by name.
- **Stock Tracking:** View real-time availability of medicines before visiting a pharmacy.
- **Price Comparison:** Sort medicines by price to find the most affordable options.
- **Location Support:** Locate which pharmacies have your medicine in stock.
- **Secure Authentication:** User registration and login using JWT for secure access.
- **User Dashboard:** Track platform statistics and manage your account.

## 💻 Tech Stack
### **Frontend**
- **React.js** (Vite)
- **CSS3** (Custom Premium Design System)
- **React Router** for navigation
- **Axios** for API communication
- **React Icons**

### **Backend**
- **Java Spring Boot** 
- **Spring Data JPA** for database interactions
- **Spring Security & JWT** for authentication
- **MySQL** Database
- **Maven** for dependency management

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v16+)
- Java JDK (v17+)
- MySQL Server
- Maven

### Backend Setup
1. Open MySQL and create a database named `medifind`:
   ```sql
   CREATE DATABASE medifind;
   ```
2. Navigate to the backend directory:
   ```bash
   cd src/main/resources
   ```
3. Update `application.properties` with your MySQL credentials:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/medifind
   spring.datasource.username=root
   spring.datasource.password=your_password
   ```
4. Run the Spring Boot application (from the root of the backend project):
   ```bash
   mvn spring-boot:run
   ```
   *The backend will start on `http://localhost:8080`*

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd medifind-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   *The frontend will start on `http://localhost:5173`*

## 📱 Screenshots
*(Add screenshots of your Home, Login, Dashboard, and Medicines pages here)*

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
