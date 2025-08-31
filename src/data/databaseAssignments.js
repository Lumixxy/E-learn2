const databaseAssignments = {
  'db-assignment-1': {
    title: 'E-commerce Database Design',
    description: 'Design and implement a complete e-commerce database schema with proper relationships and constraints.',
    requirements: [
      'Create tables for Users, Products, Categories, Orders, and OrderItems',
      'Implement proper primary and foreign key relationships',
      'Add appropriate constraints and data validation',
      'Create indexes for performance optimization',
      'Write SQL queries for common e-commerce operations',
      'Implement user authentication and order management',
      'Add sample data to demonstrate functionality'
    ],
    starterCode: `-- E-commerce Database Schema
-- TODO: Create Users table
CREATE TABLE Users (
    -- Add user fields: id, username, email, password, created_at
);

-- TODO: Create Categories table
CREATE TABLE Categories (
    -- Add category fields: id, name, description
);

-- TODO: Create Products table
CREATE TABLE Products (
    -- Add product fields: id, name, description, price, category_id, stock_quantity
);

-- TODO: Create Orders table
CREATE TABLE Orders (
    -- Add order fields: id, user_id, total_amount, order_date, status
);

-- TODO: Create OrderItems table
CREATE TABLE OrderItems (
    -- Add order item fields: id, order_id, product_id, quantity, price
);

-- TODO: Add foreign key constraints

-- TODO: Create indexes for performance

-- Sample Queries to Implement:
-- 1. Get all products in a specific category
-- 2. Get order history for a user
-- 3. Calculate total sales by category
-- 4. Find top-selling products
-- 5. Get order details with product information`,
    rubric: [
      {
        criterion: 'Database schema design with proper relationships',
        points: 25,
        description: 'Correct table structure with primary and foreign keys'
      },
      {
        criterion: 'Data constraints and validation implemented',
        points: 20,
        description: 'Appropriate constraints, data types, and validation rules'
      },
      {
        criterion: 'SQL queries for e-commerce operations',
        points: 25,
        description: 'Functional queries for common business operations'
      },
      {
        criterion: 'Performance optimization with indexes',
        points: 15,
        description: 'Strategic indexing for query performance'
      },
      {
        criterion: 'Sample data and testing',
        points: 15,
        description: 'Comprehensive test data and query validation'
      }
    ]
  },
  'db-assignment-2': {
    title: 'Analytics Dashboard Database',
    description: 'Build a data analytics dashboard with complex queries, aggregations, and reporting functionality.',
    requirements: [
      'Create tables for Sales, Customers, Products, and Regions',
      'Implement data warehouse concepts with fact and dimension tables',
      'Write complex analytical queries with GROUP BY and aggregations',
      'Create views for common reporting needs',
      'Implement stored procedures for data processing',
      'Add triggers for data validation and auditing',
      'Create a reporting interface with key metrics'
    ],
    starterCode: `-- Analytics Dashboard Database
-- Fact Table: Sales
CREATE TABLE Sales (
    -- TODO: Add fields: sale_id, customer_id, product_id, region_id, sale_date, quantity, revenue
);

-- Dimension Tables
CREATE TABLE Customers (
    -- TODO: Add customer dimension fields
);

CREATE TABLE Products (
    -- TODO: Add product dimension fields
);

CREATE TABLE Regions (
    -- TODO: Add region dimension fields
);

-- TODO: Create views for reporting
CREATE VIEW MonthlySalesReport AS
-- Write query to show monthly sales totals

CREATE VIEW TopCustomers AS
-- Write query to show top customers by revenue

CREATE VIEW ProductPerformance AS
-- Write query to show product sales performance

-- TODO: Create stored procedures
DELIMITER //
CREATE PROCEDURE GetSalesByRegion(IN region_name VARCHAR(100))
BEGIN
    -- Write procedure to get sales data by region
END //
DELIMITER ;

-- TODO: Create triggers for auditing
CREATE TRIGGER sales_audit_trigger
    AFTER INSERT ON Sales
    FOR EACH ROW
    -- Add audit logic

-- Sample Analytics Queries to Implement:
-- 1. Monthly revenue trends
-- 2. Top 10 products by sales volume
-- 3. Customer lifetime value analysis
-- 4. Regional performance comparison
-- 5. Seasonal sales patterns`,
    rubric: [
      {
        criterion: 'Data warehouse design with fact and dimension tables',
        points: 25,
        description: 'Proper star schema design with fact and dimension tables'
      },
      {
        criterion: 'Complex analytical queries and aggregations',
        points: 25,
        description: 'Advanced SQL queries with GROUP BY, HAVING, and window functions'
      },
      {
        criterion: 'Views and stored procedures implementation',
        points: 20,
        description: 'Functional views and stored procedures for reporting'
      },
      {
        criterion: 'Triggers and data auditing',
        points: 15,
        description: 'Proper trigger implementation for data validation and auditing'
      },
      {
        criterion: 'Performance and optimization',
        points: 15,
        description: 'Query optimization and performance considerations'
      }
    ]
  }
};

export default databaseAssignments;
