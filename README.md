# eKart – Full Stack E-Commerce Web Application

A full-stack e-commerce web application developed to provide users with a convenient and interactive online shopping experience. The platform allows users to browse products, search for specific items, check product availability, explore discounted products, view detailed product information, and manage their shopping cart.

The application is built using **Angular and TypeScript** for the frontend, **Python Flask** for the backend, and **Microsoft SQL Server** for database management. It follows a client-server architecture in which Angular communicates with Flask REST APIs to retrieve product information stored in the SQL Server database.

The project focuses on implementing essential e-commerce functionalities, including dynamic product loading, product filtering, product detail views, shopping cart management, and persistent cart storage using browser Local Storage.

## Key Features

### 1. Dynamic Product Listing

- Display products retrieved directly from the Microsoft SQL Server database.
- Dynamically load product information through Flask REST APIs.
- Display product names, descriptions, prices, brands, categories, and images.
- Show product availability and stock information.
- Display original prices and discounted prices where applicable.
- Organize products into a structured product catalogue.
- Maintain sample product data as a fallback when database data is unavailable.

### 2. Product Search & Filtering

- Search products by name.
- Search using product descriptions and brand names.
- Search products by category and colour.
- Support keyword-based search.
- Filter products based on stock availability.
- Display in-stock and out-of-stock products.
- Combine search terms with stock availability filters.

### 3. Sale Products

- Dedicated Sale section for discounted products.
- Automatically identify products with valid discounted prices.
- Compare original prices with discounted prices.
- Display only eligible discounted products on the Sale page.
- Integrate Sale filtering with the existing product catalogue.

### 4. Product Details

- Display detailed information about individual products.
- Show product descriptions, brand, category, and pricing.
- Display available product sizes.
- Display available product colours.
- Allow users to select their preferred size and colour.
- Check product stock availability.
- Allow users to select the required quantity.
- Add selected products to the shopping cart.
- Prevent invalid selections when required options are unavailable.

### 5. Shopping Cart Management

- Add products to the shopping cart.
- Display selected product information.
- Show selected product size and colour.
- Increase or decrease individual product quantities.
- Remove individual products from the cart.
- Automatically calculate item subtotals.
- Calculate the overall cart total.
- Maintain separate cart entries for different product variations.
- Synchronize cart information across application components.

### 6. Persistent Cart Storage

- Store shopping cart information using browser Local Storage.
- Retain cart items after refreshing the browser.
- Restore previously saved cart information when the application is reopened.
- Update stored cart information whenever quantities change.
- Synchronize cart updates using Angular services and RxJS `BehaviorSubject`.
- Maintain a shared cart state across the header and shopping cart components.

### 7. Shopping Cart Summary

- Display the total number of items in the cart.
- Show individual product quantities.
- Display product prices and calculated subtotals.
- Automatically update the total when cart quantities change.
- Provide options to increase, decrease, or remove products.
- Display the checkout option as a planned feature.

### 8. Navigation & User Interface

- Responsive application header.
- eKart branding and logo integration.
- Navigation links for Home, Products, Sale, New Arrival, Contact, and Services.
- Shopping cart navigation.
- Dynamic cart item count in the header.
- Consistent styling across application components.
- Responsive layouts for different screen sizes.

## Technology Stack

| Category | Technologies |
|---|---|
| Frontend | Angular, TypeScript |
| UI Development | HTML5, CSS3 |
| Backend | Python, Flask |
| Database | Microsoft SQL Server |
| Database Management | SQL Server Management Studio (SSMS) |
| Database Connectivity | PyODBC |
| API Communication | REST API, Angular HttpClient |
| State Management | Angular Services, RxJS BehaviorSubject |
| Client-Side Storage | Browser Local Storage |
| Routing | Angular Router |
| Development Tools | Visual Studio Code, PowerShell |
| Runtime Environment | Python 3.12, Node.js, npm |

## Application Architecture

The application follows a **three-layer client-server architecture**, separating the frontend interface, backend processing, and database storage.

### 1. Frontend – Angular

Angular is responsible for the application's user interface and customer interactions.

Responsibilities include:

- Rendering product listings.
- Displaying product information dynamically.
- Handling product search and filtering.
- Managing navigation through Angular Router.
- Displaying product details.
- Managing size and colour selection.
- Handling shopping cart operations.
- Communicating with backend REST APIs.
- Maintaining shared cart state through Angular services.
- Persisting cart information using Local Storage.

### 2. Backend – Python Flask

Flask handles backend processing and communication with the SQL Server database.

Responsibilities include:

- Providing REST API endpoints.
- Connecting to Microsoft SQL Server.
- Retrieving product records.
- Returning product information in JSON format.
- Handling database queries.
- Providing backend health-check functionality.
- Supporting communication between the frontend and database.

### 3. Database – Microsoft SQL Server

Microsoft SQL Server is used for persistent product data storage.

The database maintains product information, including:

- Product ID.
- Product name.
- Description.
- Price.
- Image URL.
- Category.
- Stock quantity.
- Brand.
- Gender.
- Available sizes.
- Available colours.
- Discount price.
- Product slug.

### 4. Cart State Management

The shopping cart uses Angular services and RxJS `BehaviorSubject` to maintain synchronized cart information across components.

Responsibilities include:

- Maintaining a centralized cart state.
- Adding products to the cart.
- Updating product quantities.
- Removing individual cart items.
- Calculating cart item counts.
- Synchronizing cart information with the header.
- Saving cart data to browser Local Storage.
- Restoring cart data after page refreshes.

## Application Workflow

1. User opens the eKart application.
2. Angular loads the home page and product catalogue.
3. Angular requests product information from the Flask backend.
4. Flask retrieves product records from Microsoft SQL Server.
5. The backend returns product information through a REST API.
6. Angular displays the products dynamically.
7. User searches for products or applies stock filters.
8. User can navigate to the Sale section to view discounted products.
9. User selects a product to view its details.
10. User selects the required size, colour, and quantity.
11. The selected product is added to the shopping cart.
12. CartService updates the shared cart state.
13. Cart information is saved in browser Local Storage.
14. The header cart count updates automatically.
15. User opens the shopping cart to review selected products.
16. User can update quantities or remove individual items.
17. The cart subtotal and total are recalculated automatically.

### Product Data Management

The database stores the information required to display and manage the product catalogue.

| Field | Description |
|---|---|
| ProductId | Unique product identifier |
| ProductName | Product name |
| Description | Product description |
| Price | Original product price |
| ImageURL | Product image location |
| Category | Product category |
| Stock | Available stock quantity |
| Brand | Product brand |
| Gender | Product gender category |
| Size | Available product sizes |
| Color | Available product colours |
| DiscountPrice | Discounted product price |
| Slug | Product URL identifier |

## Shopping Cart Implementation

The shopping cart is managed through a centralized Angular service.

### CartService

The `CartService` uses RxJS `BehaviorSubject` to maintain a shared cart state across the application.

Implemented operations include:

- `addToCart()` – Adds a product to the shopping cart.
- `removeFromCart()` – Removes a selected cart item.
- `updateQuantity()` – Updates the quantity of an individual cart item.
- `getCartCount()` – Calculates the total number of items.
- `clearCart()` – Clears the shopping cart.

### Local Storage Integration

Browser Local Storage is used to persist cart information.

This allows the application to restore saved cart information after a browser refresh.

The cart also uses unique cart item identifiers to ensure that quantity updates and removal operations affect the correct product variation.

## UI Design and User Experience

The application is designed with a clean e-commerce interface focused on product discovery and shopping cart usability.

### Main UI Components

- Header and navigation.
- Home page.
- Product catalogue.
- Product search and filtering.
- Sale product section.
- Product detail view.
- Shopping cart.
- Footer.

### Design Principles

- Clean and organized product presentation.
- Consistent navigation across pages.
- Clear product pricing and discount information.
- Easy product selection.
- Accessible cart controls.
- Responsive layouts.
- Consistent branding and visual styling.

## Testing and Validation

The application was tested during development to verify communication between Angular, Flask, and Microsoft SQL Server.

Testing included:

- Flask backend startup verification.
- Backend health endpoint testing.
- SQL Server database connectivity testing.
- Product API response verification.
- Dynamic product loading in Angular.
- Product search functionality.
- Stock availability filtering.
- Sale product filtering.
- Product size and colour selection.
- Adding products to the shopping cart.
- Increasing and decreasing cart quantities.
- Removing individual cart items.
- Cart total calculation.
- Cart persistence after browser refresh.
- Header cart count synchronization.

## Security and Development Considerations

- SQL Server connection configuration is maintained in the backend.
- Database access is handled through the Flask backend rather than directly from Angular.
- Database queries are executed through PyODBC.
- Backend and frontend communication is configured through Flask CORS.
- Database credentials and sensitive configuration should not be committed to public repositories.
- The application is currently configured for local development.

**Production consideration:** Before deployment, implement appropriate input validation, secure configuration management, HTTPS, database access restrictions, and server-side cart and order validation.

## Future Enhancements

The following features can be considered for future development:

- Customer registration and login.
- User profile management.
- Wishlist functionality.
- Checkout process.
- Secure payment gateway integration.
- Order placement and order history.
- Order tracking.
- Inventory management.
- Product reviews and ratings.
- Admin dashboard for product management.
- Product recommendations.
- Email notifications for order updates.

## Learning Outcomes

Through this project, I gained practical experience in full-stack web application development, including:

- Developing frontend applications using Angular and TypeScript.
- Creating reusable Angular components and services.
- Implementing Angular routing.
- Building backend REST APIs using Python Flask.
- Integrating Angular applications with Flask APIs.
- Connecting Python applications to Microsoft SQL Server.
- Working with SQL Server Management Studio.
- Retrieving and displaying database records dynamically.
- Implementing product search and filtering.
- Managing shared application state using RxJS `BehaviorSubject`.
- Implementing browser Local Storage for data persistence.
- Handling product variations and individual cart item identification.
- Performing API testing and troubleshooting.
- Managing frontend-backend communication.

## Author

**Lizhone Remeh**

Full Stack Development Project

---

**eKart – Full Stack E-Commerce Web Application**

*An interactive online shopping platform demonstrating full-stack development, REST API integration, relational database connectivity, and persistent shopping cart management.*
