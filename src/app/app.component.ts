import { Component } from '@angular/core';
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
  secondOperand = '';
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
    const multiplyDivideIndex = this.expression.findIndex(
      (value) => value.label == '*' || value.label == '/'
    );

    if (multiplyDivideIndex !== -1) {
      this.doCalculation(multiplyDivideIndex);
    } else {
      const addSubtractIndex = this.expression.findIndex(
        (value) => value.label === '-' || value.label === '+'
      );

      if (addSubtractIndex !== -1) {
        this.doCalculation(addSubtractIndex);
      }
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
