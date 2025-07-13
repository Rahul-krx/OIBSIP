# Modern Calculator App

A beautiful, fully functional calculator built with HTML, CSS, and JavaScript featuring a modern design and comprehensive mathematical operations.

## Features

### 🎨 **Modern Design**
- Sleek glassmorphism design with backdrop blur effects
- Responsive layout that works on all devices
- Smooth animations and hover effects
- Dark theme with beautiful color scheme

### 🧮 **Mathematical Operations**
- **Basic Operations**: Addition (+), Subtraction (−), Multiplication (×), Division (÷)
- **Additional Features**: Percentage calculations (%)
- **Utility Functions**: Clear (AC), Delete (DEL), Decimal point support

### ⌨️ **User Interface**
- **Dual Display**: Shows current input and previous operation
- **Grid Layout**: CSS Grid for perfect button alignment
- **Interactive Buttons**: Visual feedback on hover and click
- **Keyboard Support**: Full keyboard functionality

### 🔧 **Technical Features**
- **Event Listeners**: Comprehensive click and keyboard event handling
- **State Management**: Proper calculator state tracking
- **Error Handling**: Division by zero protection
- **Number Formatting**: Automatic comma separation for large numbers

## How to Use

### Mouse/Touch Interface
1. Click number buttons to input values
2. Click operator buttons (+, −, ×, ÷, %) to perform operations
3. Click equals (=) to see the result
4. Use AC to clear everything or DEL to delete the last digit

### Keyboard Shortcuts
- **Numbers**: 0-9 keys
- **Operators**: +, -, *, /, %
- **Equals**: Enter or = key
- **Clear**: Escape key
- **Delete**: Backspace key
- **Decimal**: . key

## File Structure

```
Calculator App/
├── index.html      # HTML structure and layout
├── styles.css      # Modern CSS styling with grid system
├── script.js       # JavaScript functionality and logic
└── README.md       # This documentation
```

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## Getting Started

1. Open `index.html` in your web browser
2. Start calculating!

## Technical Implementation

### CSS Grid System
The calculator uses CSS Grid for perfect button alignment:
```css
.buttons {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
}
```

### JavaScript Features
- **Class-based Architecture**: Organized Calculator class
- **Event Delegation**: Efficient event handling
- **State Management**: Tracks current and previous operands
- **Input Validation**: Prevents invalid operations
- **Keyboard Support**: Full keyboard accessibility

### Mathematical Operations
All basic operations are implemented with proper error handling:
- Addition, subtraction, multiplication, division
- Percentage calculations
- Division by zero protection
- Decimal point support

## Customization

The calculator is highly customizable:
- Colors can be modified in `styles.css`
- Button layout can be adjusted in the grid system
- Additional operations can be added to the JavaScript class
- Responsive breakpoints can be modified for different screen sizes

Enjoy your new calculator! 🎉 