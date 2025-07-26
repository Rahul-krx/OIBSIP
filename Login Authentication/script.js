// User data storage (in a real app, this would be in a database)
let users = JSON.parse(localStorage.getItem('users')) || [];
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

// DOM Elements
const authContainer = document.getElementById('authContainer');
const backgroundContent = document.getElementById('backgroundContent');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const loginBox = document.querySelector('.auth-box');
const registerBox = document.getElementById('registerBox');
const showRegisterLink = document.getElementById('showRegister');
const showLoginLink = document.getElementById('showLogin');
const successMessage = document.getElementById('successMessage');
const continueShoppingBtn = document.getElementById('continueShopping');

// Check if user is already logged in
if (currentUser) {
    showAuthenticatedView();
}

// Event Listeners
loginForm.addEventListener('submit', handleLogin);
registerForm.addEventListener('submit', handleRegister);
showRegisterLink.addEventListener('click', showRegisterForm);
showLoginLink.addEventListener('click', showLoginForm);
continueShoppingBtn.addEventListener('click', hideSuccessMessage);

// Form switching functions
function showRegisterForm(e) {
    e.preventDefault();
    loginBox.style.display = 'none';
    registerBox.style.display = 'block';
}

function showLoginForm(e) {
    e.preventDefault();
    registerBox.style.display = 'none';
    loginBox.style.display = 'block';
}

// Login handler
function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    // Validate inputs
    if (!email || !password) {
        showError('Please fill in all fields');
        return;
    }
    
    // Find user
    const user = users.find(u => u.email === email);
    
    if (!user) {
        showError('User not found. Please register first.');
        return;
    }
    
    // Check password (in a real app, this would be hashed)
    if (user.password !== password) {
        showError('Invalid password');
        return;
    }
    
    // Login successful
    currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    if (rememberMe) {
        localStorage.setItem('rememberMe', 'true');
    }
    
    showSuccessMessage();
}

// Register handler
function handleRegister(e) {
    e.preventDefault();
    
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const agreeTerms = document.getElementById('agreeTerms').checked;
    
    // Validate inputs
    if (!name || !email || !password || !confirmPassword) {
        showError('Please fill in all fields');
        return;
    }
    
    if (password !== confirmPassword) {
        showError('Passwords do not match');
        return;
    }
    
    if (password.length < 6) {
        showError('Password must be at least 6 characters long');
        return;
    }
    
    if (!agreeTerms) {
        showError('Please agree to the Terms & Conditions');
        return;
    }
    
    // Check if user already exists
    if (users.find(u => u.email === email)) {
        showError('User with this email already exists');
        return;
    }
    
    // Create new user
    const newUser = {
        id: Date.now(),
        name,
        email,
        password,
        createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Auto login after registration
    currentUser = newUser;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    showSuccessMessage();
}

// Google OAuth handler
function handleGoogleSignIn(response) {
    // Decode the JWT token
    const payload = decodeJwtResponse(response.credential);
    
    // Check if user exists
    let user = users.find(u => u.email === payload.email);
    
    if (!user) {
        // Create new user from Google data
        user = {
            id: Date.now(),
            name: payload.name,
            email: payload.email,
            picture: payload.picture,
            googleId: payload.sub,
            createdAt: new Date().toISOString()
        };
        
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
    }
    
    // Login successful
    currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    showSuccessMessage();
}

// JWT decoder function
function decodeJwtResponse(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    
    return JSON.parse(jsonPayload);
}

// Show success message
function showSuccessMessage() {
    successMessage.style.display = 'flex';
    
    // Hide auth container
    authContainer.style.display = 'none';
}

// Hide success message and show authenticated view
function hideSuccessMessage() {
    successMessage.style.display = 'none';
    showAuthenticatedView();
}

// Show authenticated view
function showAuthenticatedView() {
    // Hide auth container
    authContainer.style.display = 'none';
    
    // Show background content without blur
    backgroundContent.classList.add('visible');
    
    // Add user info to the page
    addUserInfo();
    
    // Add logout functionality
    addLogoutButton();
}

// Add user info to the page
function addUserInfo() {
    if (!currentUser) return;
    
    const navbar = document.querySelector('.navbar');
    const userInfo = document.createElement('div');
    userInfo.className = 'user-info';
    userInfo.innerHTML = `
        <div class="user-profile">
            ${currentUser.picture ? `<img src="${currentUser.picture}" alt="${currentUser.name}" class="user-avatar">` : ''}
            <span class="user-name">Welcome, ${currentUser.name}</span>
            <button class="btn-logout" onclick="logout()">Logout</button>
        </div>
    `;
    
    navbar.appendChild(userInfo);
}

// Add logout button styles
function addLogoutButton() {
    const style = document.createElement('style');
    style.textContent = `
        .user-info {
            display: flex;
            align-items: center;
        }
        
        .user-profile {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            background: rgba(255, 255, 255, 0.9);
            padding: 0.5rem 1rem;
            border-radius: 25px;
            backdrop-filter: blur(10px);
        }
        
        .user-avatar {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            object-fit: cover;
        }
        
        .user-name {
            font-weight: 500;
            color: #333;
        }
        
        .btn-logout {
            background: #ff4757;
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 20px;
            cursor: pointer;
            font-size: 0.8rem;
            font-weight: 600;
            transition: background 0.3s ease;
        }
        
        .btn-logout:hover {
            background: #ff3742;
        }
    `;
    document.head.appendChild(style);
}

// Logout function
function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    localStorage.removeItem('rememberMe');
    
    // Reload page to reset state
    location.reload();
}

// Error handling
function showError(message) {
    // Remove existing error messages
    const existingError = document.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Create error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        background: #ff4757;
        color: white;
        padding: 0.75rem;
        border-radius: 8px;
        margin-bottom: 1rem;
        text-align: center;
        font-size: 0.9rem;
    `;
    
    // Insert error message
    const authForm = document.querySelector('.auth-form');
    authForm.insertBefore(errorDiv, authForm.firstChild);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.remove();
        }
    }, 3000);
}

// Form validation helpers
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePassword(password) {
    return password.length >= 6;
}

// Add real-time validation
document.getElementById('loginEmail').addEventListener('blur', function() {
    const email = this.value;
    if (email && !validateEmail(email)) {
        this.style.borderColor = '#ff4757';
    } else {
        this.style.borderColor = '#e1e5e9';
    }
});

document.getElementById('registerEmail').addEventListener('blur', function() {
    const email = this.value;
    if (email && !validateEmail(email)) {
        this.style.borderColor = '#ff4757';
    } else {
        this.style.borderColor = '#e1e5e9';
    }
});

document.getElementById('registerPassword').addEventListener('blur', function() {
    const password = this.value;
    if (password && !validatePassword(password)) {
        this.style.borderColor = '#ff4757';
    } else {
        this.style.borderColor = '#e1e5e9';
    }
});

document.getElementById('confirmPassword').addEventListener('blur', function() {
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = this.value;
    if (confirmPassword && password !== confirmPassword) {
        this.style.borderColor = '#ff4757';
    } else {
        this.style.borderColor = '#e1e5e9';
    }
});

// Add some demo users for testing
if (users.length === 0) {
    const demoUsers = [
        {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            password: 'password123',
            createdAt: new Date().toISOString()
        },
        {
            id: 2,
            name: 'Jane Smith',
            email: 'jane@example.com',
            password: 'password123',
            createdAt: new Date().toISOString()
        }
    ];
    
    users = demoUsers;
    localStorage.setItem('users', JSON.stringify(users));
}

// Add some interactive features to the ecommerce page
document.addEventListener('DOMContentLoaded', function() {
    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('.btn-add-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (!currentUser) {
                showError('Please login to add items to cart');
                return;
            }
            
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            
            // Show success message
            this.textContent = 'Added to Cart!';
            this.style.background = '#4CAF50';
            
            setTimeout(() => {
                this.textContent = 'Add to Cart';
                this.style.background = '#667eea';
            }, 2000);
            
            console.log(`Added ${productName} to cart for user ${currentUser.name}`);
        });
    });
    
    // Hero section buttons
    const shopNowBtn = document.querySelector('.btn-primary');
    const learnMoreBtn = document.querySelector('.btn-secondary');
    
    shopNowBtn.addEventListener('click', function() {
        if (!currentUser) {
            showError('Please login to shop');
            return;
        }
        alert('Welcome to our shop! Browse our products.');
    });
    
    learnMoreBtn.addEventListener('click', function() {
        alert('Learn more about our amazing products and services!');
    });
});

// Add smooth scrolling for navigation links
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
}); 