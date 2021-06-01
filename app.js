//jshint esversion:6

class Calculator {
    constructor(prevOperandTextEl, currOperandTextEl) {
        this.prevOperandTextEl = prevOperandTextEl;
        this.currOperandTextEl = currOperandTextEl;
        this.reset();
    }

    reset() {
        this.currOperand = "";
        this.prevOperand = "";
        this.operation = undefined;
    }

    delete() {
        this.currOperand = this.currOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        //number: string
        if (number === '.' && this.currOperand.includes('.')) return;
        this.currOperand = this.currOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.currOperand === '') return;
        if (this.prevOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.prevOperand = this.currOperand;
        this.currOperand = '';
    }

    compute() {
        let computation;
        const prevNumber = parseFloat(this.prevOperand);
        const currNumber = parseFloat(this.currOperand);
        if (isNaN(prevNumber) || isNaN(currNumber)) return;
        switch (this.operation) {
            case '+':
                computation = prevNumber + currNumber;
                break;
            case '-':
                computation = prevNumber - currNumber;
                break;
            case 'x':
                computation = prevNumber * currNumber;
                break;
            case '/':
                computation = prevNumber / currNumber;
                break;
            default:
                return;
        }
        this.currOperand = computation;
        this.operation = undefined;
        this.prevOperand = '';
    }

    getDisplayNumber(number) {
        // number: string
        const stringNumber = number.toString();
        const intergerDigits = parseFloat(stringNumber.split('.')[0]);
        const demicalString = stringNumber.split('.')[1];
        let intergerDisplay;
        if (isNaN(intergerDigits))
            intergerDisplay = '';
        else
            intergerDisplay = intergerDigits.toLocaleString('en', { maximumFractionDigits: 0 });

        if (demicalString != null)
            return `${intergerDisplay}.${demicalString}`;
        else
            return intergerDisplay;

    }

    updateOutput() {
        this.currOperandTextEl.innerText = this.getDisplayNumber(this.currOperand);
        if (this.operation != null)
            this.prevOperandTextEl.innerText = ` ${this.getDisplayNumber(this.prevOperand)} ${this.operation}`;
        else
            this.prevOperandTextEl.innerText = '';
    }

}


const themeBtn = document.querySelector('.theme__btn');
const prevOperandTextEl = document.querySelector('.prev-operand');
const currOperandTextEl = document.querySelector('.curr-operand');
const numberBtns = document.querySelectorAll('.btn--number');
const operationBtns = document.querySelectorAll('.btn--operation');
const deleteBtn = document.querySelector('.btn--delete');
const resetBtn = document.querySelector('.btn--reset');
const equalBtn = document.querySelector('.btn--equal');
const themeSwitchBtn = document.querySelector('.slide__btn');
const calculator = new Calculator(prevOperandTextEl, currOperandTextEl);

let theme = 1;

numberBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        calculator.appendNumber(btn.innerText);
        calculator.updateOutput();
    });
});

operationBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const operation = btn.innerText;
        calculator.chooseOperation(operation);
        calculator.updateOutput();
    });
});

resetBtn.addEventListener('click', () => {
    calculator.reset();
    calculator.updateOutput();
});

deleteBtn.addEventListener('click', () => {
    calculator.delete();
    calculator.updateOutput();
});

equalBtn.addEventListener('click', () => {
    calculator.compute();
    calculator.updateOutput();
});

// Switch theme 
const switchTheme = function () {
    const translateX = `${theme*160}%`;
    if (theme < 3) {
        themeSwitchBtn.style.transform = `translate(${translateX}, -50%)`;
        theme++;
    } else {
        theme = 1;
        themeSwitchBtn.style.transform = `translate(0, -50%)`;
    }
    document.body.className = `theme--${theme}`;
};

themeSwitchBtn.addEventListener('click', switchTheme);