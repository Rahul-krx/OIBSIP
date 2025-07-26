#  Authentication System

A modern, responsive authentication system with Google OAuth integration and a beautiful ecommerce landing page. The system features a blurred background that becomes clear after successful authentication.

## Features

### 🔐 Authentication
- **Normal Login/Register**: Email and password authentication
- **Google OAuth**: One-click sign-in with Google
- **Form Validation**: Real-time validation with error messages
- **Remember Me**: Persistent login functionality
- **Secure Storage**: User data stored in localStorage (demo purposes)

### 🎨 User Interface
- **Modern Design**: Clean, responsive interface with smooth animations
- **Blur Effect**: Background ecommerce page is blurred until authentication
- **Interactive Elements**: Hover effects, transitions, and micro-interactions
- **Mobile Responsive**: Works perfectly on all device sizes

### 🛍️ Ecommerce Features
- **Product Showcase**: Featured products with pricing
- **Add to Cart**: Interactive shopping cart functionality
- **User Profile**: Displays user information after login
- **Logout Functionality**: Secure logout with session clearing

## Demo Credentials

For testing purposes, the following demo accounts are pre-loaded:

| Email | Password |
|-------|----------|
| john@example.com | password123 |
| jane@example.com | password123 |

## Setup Instructions

### 1. Basic Setup
1. Clone or download the project files
2. Open `index.html` in a web browser
3. The application will work immediately with demo data

### 2. Google OAuth Setup (Optional)
To enable Google OAuth functionality:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to "Credentials" and create an OAuth 2.0 Client ID
5. Add your domain to authorized origins
6. Replace `YOUR_GOOGLE_CLIENT_ID` in `index.html` with your actual client ID:

```html
<div id="g_id_onload"
     data-client_id="YOUR_ACTUAL_CLIENT_ID_HERE"
     data-callback="handleGoogleSignIn"
     data-auto_prompt="false">
</div>
```

## File Structure

```
├── index.html          # Main HTML file with authentication forms
├── styles.css          # CSS styles and animations
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## How It Works

### Authentication Flow
1. **Initial State**: Ecommerce landing page is blurred in the background
2. **Login Form**: User can choose between normal login or Google OAuth
3. **Validation**: Real-time form validation with error messages
4. **Success**: After successful authentication, background becomes clear
5. **User Experience**: User can interact with the ecommerce features

### Security Features
- Password validation (minimum 6 characters)
- Email format validation
- Duplicate user prevention
- Session management
- Secure logout functionality


## Technologies Used

- **HTML5**: Semantic markup and modern structure
- **CSS3**: Flexbox, Grid, animations, and responsive design
- **JavaScript (ES6+)**: Modern JavaScript with async/await
- **Google OAuth**: One-tap sign-in integration
- **Font Awesome**: Icons and visual elements
- **Google Fonts**: Inter font family

## Contributing

Feel free to fork this project and submit pull requests for improvements. Some ideas for enhancement:

- Add more OAuth providers (Facebook, GitHub, etc.)
- Implement password reset functionality
- Add user profile management
- Create a shopping cart system
- Add product search and filtering
- Implement a checkout process

## License

This project is open source and available under the [MIT License](LICENSE).
