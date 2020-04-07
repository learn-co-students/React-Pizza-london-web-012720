import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'

class App extends Component {
  
  constructor(){
    super()
    this.state = {
      allPizzas: [],
      topping: "",
      size: "",
      vegetarian: "",
      pizzaId: ""
    }
  }

  componentDidMount(){
    this.fetchData()
  }

  fetchData = () => {
    fetch("http://localhost:3000/pizzas")
    .then(response => response.json())
    .then(json => 
      this.setState({allPizzas:json}))
  }

  handleEdit = (pizza) => {
    this.setState({
      topping: pizza.topping,
      size: pizza.size,
      vegetarian: pizza.vegetarian,
      pizzaId: pizza.id
    })
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]:event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const body = {
      topping: this.state.topping,
      size: this.state.size,
      vegetarian: this.state.vegetarian
    }
    fetch(`http://localhost:3000/pizzas/${this.state.pizzaId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type':'application/json',
        'accept':'application/json'
      },
      body: JSON.stringify(body)
    })
    .then(this.fetchData)
  }

  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm 
        topping={this.state.topping} 
        size={this.state.size} 
        vegetarian={this.state.vegetarian} 
        onChange={this.onChange}
        handleSubmit={this.handleSubmit}/>
        <PizzaList 
        allPizzas={this.state.allPizzas} 
        handleEdit={this.handleEdit}
        />
      </Fragment>
    );
  }
}

export default App;
