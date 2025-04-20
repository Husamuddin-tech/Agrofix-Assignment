# Agri Bulk Orders

**Agri Bulk Orders** is a web application that facilitates bulk orders for vegetables and fruits. It allows buyers to browse available products, place bulk orders, and track the status of their orders. Admins can manage the product catalog, inventory, and orders efficiently.

## Features

- **Buyer Features:**
  - Browse products available for bulk purchase.
  - Place bulk orders by selecting products, quantities, and delivery details.
  - Track the status of their orders using order IDs.
  
- **Admin Features:**
  - Manage product catalog (add, update, delete products).
  - View and manage all orders.
  - Update order statuses (e.g., processing, shipped, delivered).
  
- **User Authentication:** (Optional)
  - Supports role-based access control for admins and buyers.
  
## Technologies Used

- **Frontend:** React.js (Next.js), Material UI
- **Backend:** Node.js, Prisma (ORM), PostgreSQL
- **State Management:** Zustand
- **Others:** Axios (for API calls)

## Setup Instructions

### Prerequisites

Make sure you have the following installed:

- Node.js (version 16+)
- PostgreSQL (or any database system you prefer)

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/agri-bulk-orders.git
cd agri-bulk-orders


2. Install Dependencies
Run the following command to install all the necessary dependencies:


npm install
3. Setup the Database
Make sure you have PostgreSQL installed and running locally or on a remote server.

Create a new database for the project (e.g., agri_bulk_orders).

Update the .env file with your database connection details:

env

DATABASE_URL="postgresql://user:password@localhost:5432/agri_bulk_orders?schema=public"
Run the Prisma migrations to create the necessary tables:

bash
Copy code
npx prisma migrate dev
Seed the database with mock data (optional, for testing):


npx prisma db seed
4. Running the Application
To run the application locally:


npm run dev
This will start the development server, and you can access the app in your browser at http://localhost:3000.

5. Using Prisma Studio (Optional)
If you want to view or modify data directly in the database, you can use Prisma Studio:


npx prisma studio
Other Relevant Information
Environment Variables: Make sure to update .env with the necessary environment variables for API keys, database configurations, etc.

Deployment: For production, you can deploy the app using Vercel, AWS, or any other preferred platform. Ensure that the database is also hosted appropriately.

Testing: You can add tests using Jest, React Testing Library, or any other testing framework.

