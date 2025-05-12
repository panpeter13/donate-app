import { Component } from '../core/Component';

export class Form extends Component {
  setup(props) {
    this.state = {
      amount: ''
    };

    this.$rootElement = document.createElement('form');
    this.$rootElement.className = 'donate-form';

    const $label = document.createElement('label');
    $label.className = 'donate-form__input-label';
    $label.textContent = 'Введите сумму в $'

    const $input = document.createElement('input');
    $input.className = 'donate-form__donate-input';
    $input.type = 'number';
    $input.name = 'amount';
    $input.min = '1';
    $input.max = '100';
    $input.required = true;

    $label.appendChild($input);

    const $button = document.createElement('button');
    $button.className = 'donate-form__submit-button';
    $button.type = 'submit';
    $button.disabled = true;
    $button.textContent = 'Задонатить';

    this.$input = $input;
    this.$button = $button;

    this.$rootElement.appendChild($label);
    this.$rootElement.appendChild($button);
    
    
    this.$input.addEventListener('input', this.handleInput.bind(this));
    this.$rootElement.addEventListener('submit', this.handleSubmit.bind(this));
  }

      get isValid() {
      const value = Number(this.state.amount);
      return value >= 1 && value <= 100;
    }

  handleInput(event) { 
    console.log(event.target.value);
    this.state.amount = event.target.value;
    console.log(this.isValid);
    this.$button.disabled = !this.isValid;

  }

  handleSubmit(event) {
    event.preventDefault(); 
    if (this.isValid) {
      const amount = Number(this.state.amount);
      if (typeof this.props.onSubmit === 'function') {
        this.props.onSubmit(amount);
      }

      this.state.amount = '';
      this.$input.value = '';
      this.$button.disabled = true;

    }
  }
}
