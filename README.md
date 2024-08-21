# Clickit

This is an Angular application that displays a list of products with authentication. The application has the following file structure:

```
* components
   * header
   * footer
   * product-card
   * paginator
* pages
   * product-list
   * login
* services
   * auth.service
   * products.service
* guards
   * auth.guard
* models
   * user.interface
   * category.interface
   * product.interface
```

## Features

1. **Product Listing**: The application displays a list of products with pagination.
2. **Authentication**: The application has a login page and an authentication guard to protect the product listing page.
3. **Token Validation**: When the application is initialized, it checks for a valid token. If the token is not valid, it tries to refresh the token or clear the authentication session and redirect the user to the login page.

## Components

1. **Header**: The header component contains the application's navigation menu.
2. **Footer**: The footer component contains the copyright information.
3. **Product-Card**: The product-card component displays the details of a single product.
4. **Paginator**: The paginator component handles the pagination of the product list.

## Pages

1. **Product-List**: The product-list page displays the list of products.
2. **Login**: The login page allows users to authenticate and access the product listing.

## Services

1. **Auth.Service**: The auth.service handles the authentication logic, including token validation, token refresh, and user session management.
2. **Products.Service**: The products.service handles the retrieval and management of product data.

## Guards

1. **Auth.Guard**: The auth.guard ensures that only authenticated users can access the product listing page.

## Models

1. **User.Interface**: The user.interface defines the structure of the user data.
2. **Category.Interface**: The category.interface defines the structure of the product category data.
3. **Product.Interface**: The product.interface defines the structure of the product data.

## Getting Started

1. Clone the repository: `git clone https://github.com/your-username/product-listing-with-authentication.git`
2. Install dependencies: `npm install`
3. Start the development server: `ng serve`
4. Open the application in your browser: `http://localhost:4200`

## Deployment

To deploy the application, follow these steps:

1. Build the application: `ng build --prod`
2. Deploy the build artifacts to your preferred hosting platform.

## N.B

This application has been developed for a simple task and may be the logic implemented on it has some limitations.
Add to cart functionality has been added here in the simplest way as no enough time to implement a customized flow for it. 