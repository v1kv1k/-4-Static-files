# Express Server with Static Files, Cookies, and JWT

This is an Express server application that demonstrates how to work with static files, cookies for theme preferences, and JWT authentication.

## Features

- **Static Files**: Serves favicon and static assets from the `public` folder
- **Multiple Template Engines**: Uses both PUG and EJS templates with favicon integration
- **Theme Selection**: Allows users to select and save their preferred theme using cookies
- **JWT Authentication**: Implements user registration, login, and protected routes using JWT

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd static-files-cookies-jwt
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory with the following content:
   ```
   PORT=3000
   JWT_SECRET=your_super_secret_key
   NODE_ENV=development
   ```

4. Start the server:
   ```
   node app.js
   ```

The application will be available at http://localhost:3000

## Routes

### Public Routes

- **GET /** - Home page rendered with PUG
- **GET /ejs-example** - Example page rendered with EJS

### Theme Routes

- **GET /theme** - Get current theme from cookies
- **POST /theme** - Set theme preference in cookies
  - Body: `{ "theme": "light" | "dark" | "blue" | "green" }`

### Authentication Routes

- **POST /auth/register** - Register a new user and get JWT token
  - Body: `{ "username": "username", "password": "password" }`
- **POST /auth/login** - Login and get JWT token
  - Body: `{ "username": "username", "password": "password" }`
- **POST /auth/logout** - Clear JWT token from cookies

### Protected Routes (Require JWT)

- **GET /protected/dashboard** - Protected dashboard page rendered with PUG
- **GET /protected/profile** - User profile page rendered with EJS
- **GET /protected/data** - Protected API route that returns JSON data

## Implementation Details

### Static Files

The server is configured to serve static files from the `public` directory, including the favicon.ico that is included in all HTML pages through the template files:

```javascript
// Configuring static files in Express
app.use(express.static(path.join(__dirname, 'public')));
```

Both PUG and EJS templates include the favicon link:
```html
<link rel="icon" href="/favicon.ico">
```

### Cookies for Theme Preferences

The application uses cookies to store the user's preferred theme choice:

- The cookie-parser middleware is used to handle cookies
- Theme is stored as a non-HTTP-only cookie so it can be accessed by JavaScript
- The default theme is "light" if no cookie is present

### JWT Authentication

The application uses JWT tokens for user authentication:

- Tokens are generated upon registration and login
- Tokens are stored in HTTP-only cookies for security
- A middleware verifies the token for protected routes
- Tokens expire after 1 hour

## Security Considerations

- JWT tokens are stored in HTTP-only cookies to prevent XSS attacks
- Sensitive routes are protected by middleware that verifies the JWT
- In a production environment, the application should use HTTPS
- Password hashing is not implemented in this demo but would be essential in a real application 