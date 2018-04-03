import React, { Component, PureComponent } from 'react';
import './App.css';

class Todo extends PureComponent {
  onCheckedChange = event => this.props.onToggle(this.props.id, event)
  onClickDelete = event => this.props.onDelete(this.props.id, event)

  render = () => <li>
    <label style={{ textDecoration: this.props.done ? 'line-through' : 'none' }}><input 
      type="checkbox" 
      checked={this.props.done} 
      onChange={this.onCheckedChange} />
        {this.props.text}
      </label>
      <button onClick={this.onClickDelete}>Kustuta</button>
  </li>
}

class Count extends PureComponent {
  render = () => <h3>Ülesandeid: {this.props.doneCount}/{this.props.totalCount}</h3>
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
            onToggle={this.toggleTodo}
            onDelete={this.deleteTodo}
            id={index}
            key={index} />)}
        </ul>

        <Count 
          doneCount={this.state.todos.filter(todo => todo.done).length}
          totalCount={this.state.todos.length} />

        <pre>
          {JSON.stringify(this.state, undefined, 4)}
        </pre>
      </div>
    );
  }
}

export default App;
