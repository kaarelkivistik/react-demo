import React, { Component, PureComponent } from 'react';
import './App.css';

class Todo extends PureComponent {
  render = () => <li>
    <label style={{ textDecoration: this.props.done ? 'line-through' : 'none' }}><input 
      type="checkbox" 
      checked={this.props.done} 
      onChange={this.props.onToggle} />
        {this.props.text}
      </label>
      <button onClick={this.props.onDelete}>Kustuta</button>
  </li>
}

class App extends Component {
  state = {
    input: "",

    todos: [{
      text: "vii prügi välja",
      done: true
    }, {
      text: "valmista ette Reacti bootcamp",
      done: false
    }]
  }

  updateInput = event => this.setState({ input: event.target.value })

  addTodo = event => {
    event.preventDefault();

    if(this.state.input.length === 0) return;

    this.setState(prevState => ({
      input: "",
      todos: [...prevState.todos, {
        text: prevState.input,
        done: false
      }]
    }))
  }

  toggleTodo = (index, event) => {
    const { checked } = event.target;

    this.setState(prevState => ({
      todos: prevState.todos.map((todo, $index) => ({
        ...todo,
        done: index === $index ? checked : todo.done
      }))
    }))
  }

  deleteTodo = index => this.setState(prevState => ({
    todos: prevState.todos.filter((todo, $index) => index !== $index)
  }))

  render = () => {
    const { input, todos } = this.state;

    return (
      <div className="App">
        <form onSubmit={this.addTodo}>
          <input type="text" value={input} onChange={this.updateInput} />
        </form>
        
        <ul>
          {todos.map((todo, index) => <Todo 
            {...todo} 
            onToggle={this.toggleTodo.bind(this, index)}
            onDelete={this.deleteTodo.bind(this, index)}
            key={index} />)}
        </ul>

        <pre>
          {JSON.stringify(this.state, undefined, 4)}
        </pre>
      </div>
    );
  }
}

export default App;
