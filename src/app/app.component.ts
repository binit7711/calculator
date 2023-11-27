import { Component, HostListener } from '@angular/core';
import { Button, buttons } from './buttons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  btns = buttons;
  expression: Button[] = [];
  title = 'calculator';
  firstOperand = '';

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    switch (event.key) {
      case '=':
        this.handleButtonClick({
          function: 'equal',
          label: '=',
        });
        break;

      case '*':
        this.handleButtonClick({
          label: '*',
          function: 'operation',
          operation: (a, b) => {
            return parseFloat(a) * parseFloat(b);
          },
        });
        break;

      case '+':
        this.handleButtonClick({
          label: '+',
          function: 'operation',
          operation: (a, b) => {
            return parseFloat(a) + parseFloat(b);
          },
        });
        break;

      case '-':
        this.handleButtonClick({
          label: '-',
          function: 'operation',
          operation: (a, b) => {
            return parseFloat(a) - parseFloat(b);
          },
        });
        break;

      case '/':
        this.handleButtonClick({
          label: '/',
          operation: (a, b) => {
            return parseFloat(a) / parseFloat(b);
          },
          function: 'operation',
        });
        break;

      default:
        var digitRegex = /[0-9]/;
        if (digitRegex.test(event.key)) {
          this.handleButtonClick({
            label: event.key,
            function: 'number',
          });
        }
    }
  }

  handleButtonClick(button: Button) {
    switch (button.function) {
      case 'number':
        this.firstOperand += button.label;
        break;

      case 'operation':
        if (this.expression.at(-1) === undefined && this.firstOperand === '')
          return;
        if (
          this.expression.at(-1)?.function === 'operation' &&
          this.firstOperand === ''
        ) {
          this.expression.pop();
        } else {
          this.expression.push({
            function: 'number',
            label: this.firstOperand,
          });
          this.firstOperand = '';
        }
        this.expression.push(button);
        break;

      case 'clear':
        this.firstOperand = '';
        this.expression = [];
        break;

      case 'equal':
        this.expression.push({
          function: 'number',
          label: this.firstOperand,
        });
        this.firstOperand = '';
        this.calculateExpression();
        break;

      case 'decimal':
        if (this.firstOperand.includes('.')) return;
        this.firstOperand += '.';
        break;

      case 'delete':
        this.firstOperand = this.firstOperand.slice(0, -1);
        break;
    }
  }

  calculateExpression() {
    while (this.expression.length > 1) {
      this.calculate();
    }

    this.firstOperand = this.expression[0].label;
    this.expression = [];
  }

  calculate() {
    const multiply = this.expression.findIndex((value) => value.label === '*');
    const divide = this.expression.findIndex((value) => value.label === '/');
    const addSubtract = this.expression.findIndex(
      (value) => value.label === '-' || value.label === '+'
    );

    if (divide !== -1) {
      this.doCalculation(divide);
    } else if (multiply !== -1) {
      this.doCalculation(multiply);
    } else if (addSubtract !== -1) {
      this.doCalculation(addSubtract);
    }
  }

  doCalculation(index: number) {
    const perform = this.expression.slice(index - 1, index + 2);

    this.expression.splice(index - 1, 3, {
      label: perform[1].operation!(
        perform[0].label,
        perform[2].label
      ).toString(),
      function: 'number',
    });
  }
}
