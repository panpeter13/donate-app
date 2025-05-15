import { Component } from '../core/Component';
import { Form } from './Form';
import { List } from './List';
import { ListItem } from './ListItem';

export class App extends Component {
  setup(props) {
    this.state = {
      total: 0,
      donates: []
    };

    this.$rootElement = document.createElement('div');
    this.$rootElement.className = 'app';

    const $title = document.createElement('h1');
    $title.className = 'total-amount';
    $title.textContent = 'Итого: $';

    const $totalAmount = document.createElement('span');
    $totalAmount.textContent = this.state.total;
    this.$total = $totalAmount;
    $title.appendChild($totalAmount);

    this.$rootElement.appendChild($title);

    const donateForm = new Form({
      onSubmit: this.onItemCreate.bind(this)
    });
    this.$rootElement.appendChild(donateForm.$rootElement);


    this.donateList = new List();
    this.$rootElement.appendChild(this.donateList.$rootElement);

  }
  
  onItemCreate(amount) {
    const item = new ListItem({ 
      amount,
      onRemove: this.onItemRemove.bind(this)
    });


    this.state.donates.push(item);
    this.donateList.addItem(item);

    this.state.total += amount;
    this.$total.textContent = this.state.total;
  
  }
  
  onItemRemove(item) {
    this.state.donates = this.state.donates.filter(d => d !== item);
    this.state.total -= item.state.amount;
    this.$total.textContent = this.state.total;

    item.$rootElement.remove();
  }
}