import { Component } from '../core/Component';

export class ListItem extends Component {
  setup(props) {
    this.props = props;


    this.state = {
      id: Date.now(),
      date: new Date(),
      amount: this.props.amount
    };

    this.$rootElement = document.createElement('div');
    this.$rootElement.className = 'donate-item';
    this.$rootElement.innerHTML = `
    ${this.state.date.toLocaleString()} - $${this.state.amount}`;

    const $btn = document.createElement('button');
    $btn.className = 'delete-button';
    $btn.textContent = 'Удалить';

    $btn.addEventListener('click', () => {
      this.props.onRemove(this);
    });

    this.$rootElement.appendChild($btn);
  }
}
