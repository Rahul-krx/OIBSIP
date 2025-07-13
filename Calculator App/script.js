class Calculator {
    constructor() {
        this.previousOperand = '';
        this.currentOperand = '0';
        this.operation = undefined;
        this.shouldResetScreen = false;
        
        this.previousOperandElement = document.getElementById('previous-operand');
        this.currentOperandElement = document.getElementById('current-operand');
        
        this.initializeEventListeners();
    }
    
    initializeEventListeners() {
        // Number buttons
        document.querySelectorAll('.btn.number').forEach(button => {
            button.addEventListener('click', () => {
                this.appendNumber(button.dataset.number);
                this.updateDisplay();
            });
        });
        
        // Operator buttons
        document.querySelectorAll('.btn.operator').forEach(button => {
            button.addEventListener('click', () => {
                this.handleOperator(button.dataset.action);
                this.updateDisplay();
            });
        });
        
        // Clear button
        document.querySelector('.btn.clear').addEventListener('click', () => {
            this.clear();
            this.updateDisplay();
        });
        
        // Equals button
        document.querySelector('.btn.equals').addEventListener('click', () => {
            this.compute();
            this.updateDisplay();
        });
        
        // Keyboard support
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardInput(e);
        });
    }
    
    handleKeyboardInput(e) {
        if (e.key >= '0' && e.key <= '9' || e.key === '.') {
            this.appendNumber(e.key);
        } else if (e.key === '+' || e.key === '-') {
            this.handleOperator(e.key === '+' ? 'add' : 'subtract');
        } else if (e.key === '*') {
            this.handleOperator('multiply');
        } else if (e.key === '/') {
            this.handleOperator('divide');
        } else if (e.key === '%') {
            this.handleOperator('percent');
        } else if (e.key === 'Enter' || e.key === '=') {
            this.compute();
        } else if (e.key === 'Escape') {
            this.clear();
        } else if (e.key === 'Backspace') {
            this.delete();
        }
        this.updateDisplay();
    }
    
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        if (this.shouldResetScreen) {
            this.currentOperand = '';
            this.shouldResetScreen = false;
        }
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number;
        } else {
            this.currentOperand += number;
        }
    }
    
    handleOperator(operation) {
        if (this.currentOperand === '') return;
        
        if (this.previousOperand !== '') {
            this.compute();
        }
        
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.shouldResetScreen = true;
    }
    
    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        
        if (isNaN(prev) || isNaN(current)) return;
        
        switch (this.operation) {
            case 'add':
                computation = prev + current;
                break;
            case 'subtract':
                computation = prev - current;
                break;
            case 'multiply':
                computation = prev * current;
                break;
            case 'divide':
                if (current === 0) {
                    alert('Cannot divide by zero!');
                    return;
                }
                computation = prev / current;
                break;
            case 'percent':
                computation = prev * (current / 100);
                break;
            default:
                return;
        }
        
        this.currentOperand = computation.toString();
        this.operation = undefined;
        this.previousOperand = '';
        this.shouldResetScreen = true;
    }
    
    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
        this.shouldResetScreen = false;
    }
    
    delete() {
        if (this.currentOperand.length === 1) {
            this.currentOperand = '0';
        } else {
            this.currentOperand = this.currentOperand.slice(0, -1);
        }
    }
    
    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            });
        }
        
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }
    
    getOperationSymbol(operation) {
        switch (operation) {
            case 'add':
                return '+';
            case 'subtract':
                return '−';
            case 'multiply':
                return '×';
            case 'divide':
                return '÷';
            case 'percent':
                return '%';
            default:
                return '';
        }
    }
    
    updateDisplay() {
        this.currentOperandElement.textContent = this.getDisplayNumber(this.currentOperand);
        
        if (this.operation != null) {
            this.previousOperandElement.textContent = 
                `${this.getDisplayNumber(this.previousOperand)} ${this.getOperationSymbol(this.operation)}`;
        } else {
            this.previousOperandElement.textContent = '';
        }
    }
}

// Initialize calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Calculator();
});

// Add some visual feedback for button presses
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mousedown', () => {
            button.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('mouseup', () => {
            button.style.transform = '';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = '';
        });
    });
}); 