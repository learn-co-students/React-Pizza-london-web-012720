import React, { Component, Fragment } from "react";
import Header from "./components/Header";
import PizzaForm from "./components/PizzaForm";
import PizzaList from "./containers/PizzaList";
class App extends Component {
  constructor() {
    super();
    this.state = {
      pizza: [],
      pizzaId: "",
      topping: "",
      size: "",
      vegetarian: "",
    };
  }
  componentDidMount() {
    this.fetchPizza();
  }
  render() {
    return (
      <Fragment>
        <Header />
        <PizzaForm
          topping={this.state.topping}
          size={this.state.size}
          vegetarian={this.state.vegetarian}
          submitEdit={this.submitEdit}
          onChange={this.onChange}
        />
        <PizzaList pizzas={this.state.pizza} editPizzaBtn={this.editPizzaBtn} />
      </Fragment>
    );
  }
  fetchPizza = () => {
    fetch("http://localhost:3000/pizzas")
      .then((res) => res.json())
      .then((pizzas) => this.setState({ pizza: pizzas }));
  };
  editPizzaBtn = (pizza) => {
    this.setState({
      pizzaId: pizza.id,
      topping: pizza.topping,
      size: pizza.size,
      vegetarian: pizza.vegetarian,
    });
  };
  submitEdit = (e) => {
    e.preventDefault();
    const body = {
      topping: this.state.topping,
      size: this.state.size,
      vegetarian: this.state.vegetarian ? true : false,
    };
    fetch(`http://localhost:3000/pizzas/${this.state.pizzaId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(body),
    }).then(this.fetchPizza());
  };
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
}

export default App;
