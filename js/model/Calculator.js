export default class Calculator {
  constructor() {
    this.expression = '';
    this.numberCount = 0;
    this.buffer = {
      value: 0,
      numberCount: 0,
    };
  }

  appendNumber(number) {
    this.expression += number;
    this.numberCount += 1;
  }

  appendBasicSymbols(symbol) {
    this.expression += symbol;
    this.numberCount = 0;
  }

  appendComplexOperations(operation) {
    if (operation === '1/x') {
      if (this.expression.length === this.numberCount) {
        this.expression = '1/' + this.expression;
      } else {
        this.expression = this.expression.slice(0, -this.numberCount) + '1/' + this.expression.slice(-this.numberCount);
      }
    } else if (operation === '+-') {
      if (this.expression.length === this.numberCount) {
        if (this.expression.at(0) === '-') {
          this.expression = this.expression.slice(1);
          this.numberCount -= 1;
        } else {
            this.expression = '-' + this.expression;
            this.numberCount += 1;
        }
      } else if (this.expression.at(-this.numberCount - 1) === '+') {
        this.expression = this.expression.slice(0, -this.numberCount - 1) + '-' + this.expression.slice(-this.numberCount);
      } else if (this.expression.at(-this.numberCount - 1) === '-') {
        this.expression = this.expression.slice(0, -this.numberCount - 1) + '+' + this.expression.slice(-this.numberCount);
      }
    } else if (operation === 'pow2') {
      this.expression += '^2';
    } else if (operation === 'sqrt') {
      this.expression += '^0.5';
    }
  }

  clear() {
    this.expression = '';
    this.numberCount = 0;
  }

  backspace() {
    this.expression = this.expression.slice(0, -1);
    if (this.numberCount > 0) {
      this.numberCount -= 1;
    }
  }

  memoryOperations(operation) {
    if (operation === 'MC') {
      this.buffer.value = 0;
      this.buffer.numberCount = 0;
    } else if (operation === 'MR') {
      if (this.numberCount !== 0) {
        this.expression = this.expression.slice(0, -this.numberCount) + this.buffer.value.toString();
      } else {
        this.expression += this.buffer.value.toString();
      }
      this.numberCount = this.buffer.numberCount;
    } else if (operation === 'M+') {
      if (this.expression.length === this.numberCount) {
        this.buffer.value += Number(this.expression);
        this.buffer.numberCount = (this.buffer.value.toString()).length;
      }
    } else if (operation === 'M-') {
      if (this.expression.length === this.numberCount) {
        this.buffer.value -= Number(this.expression);
        this.buffer.numberCount = (this.buffer.value.toString()).length;
      }
    } else if (operation === 'MS') {
      if (this.expression.length === this.numberCount) {
        this.buffer.value = Number(this.expression);
        this.buffer.numberCount = (this.buffer.value.toString()).length;
      }
    }
  }

  calculate() {
    try {
        this.expression = math.evaluate(this.expression).toString();
        this.numberCount = this.expression.length;
        return this.expression;
      } catch (err) {
        return null;
      }
  }
}
