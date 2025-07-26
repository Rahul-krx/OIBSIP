
const CONFIG = {
   
    appName: 'ShopHub',
    appDescription: 'Discover amazing products at unbeatable prices',
    
    // Authentication Settings
    minPasswordLength: 6,
    enableRememberMe: true,
    enableGoogleOAuth: true,
    googleClientId: ClientId, // Replace with your actual Google Client ID
    
    // Demo Users (for testing)
    demoUsers: [
        {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            password: 'password123',
            createdAt: new Date().toISOString()
        },
        
    ],
    

    blurAmount: '8px',
    blurOpacity: 0.3,
    animationDuration: '0.5s',
    
    
    colors: {
        primary: '#667eea',
        secondary: '#764ba2',
        success: '#4CAF50',
        error: '#ff4757',
        warning: '#ffa502',
        text: '#333',
        textLight: '#666',
        background: '#f8f9fa',
        white: '#ffffff'
    },
    
    
    products: [
        {
            id: 1,
            name: 'Premium T-Shirt',
            price: 29.99,
            icon: 'fas fa-tshirt',
            description: 'High-quality cotton t-shirt'
        },
        {
            id: 2,
            name: 'Smartphone',
            price: 599.99,
            icon: 'fas fa-mobile-alt',
            description: 'Latest smartphone with advanced features'
        },
        {
            id: 3,
            name: 'Wireless Headphones',
            price: 89.99,
            icon: 'fas fa-headphones',
            description: 'Premium wireless headphones with noise cancellation'
        },
        {
            id: 4,
            name: 'Laptop',
            price: 899.99,
            icon: 'fas fa-laptop',
            description: 'High-performance laptop for work and gaming'
        }
    ],
    
    navLinks: [
        { name: 'Home', href: '#home' },
        { name: 'Products', href: '#products' },
        { name: 'About', href: '#about' },
        { name: 'Contact', href: '#contact' }
    ],
    
   
    features: {
        enableCart: true,
        enableUserProfile: true,
        enableSmoothScrolling: true,
        enableRealTimeValidation: true,
        enableAutoLogin: true
    },
    
  
    messages: {
        loginSuccess: 'Welcome to ShopHub! You have successfully logged in.',
        registerSuccess: 'Account created successfully! Welcome to ShopHub!',
        loginRequired: 'Please login to access this feature.',
        invalidCredentials: 'Invalid email or password.',
        userNotFound: 'User not found. Please register first.',
        emailExists: 'User with this email already exists.',
        passwordMismatch: 'Passwords do not match.',
        passwordTooShort: 'Password must be at least 6 characters long.',
        termsRequired: 'Please agree to the Terms & Conditions.',
        fillAllFields: 'Please fill in all fields.'
    }
};


if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
} else {
    
    window.CONFIG = CONFIG;
} 