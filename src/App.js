import React, { Component, PureComponent } from 'react';
import './App.css';

class Todo extends Component {
  onCheckedChange = event => this.props.onToggle(this.props.id, event)
  onClickDelete = event => this.props.onDelete(this.props.id, event)

  shouldComponentUpdate = nextProps => this.props.todo.done !== nextProps.todo.done

  render = () => {
    const { done, text } = this.props.todo;

    return <li>
      <label style={{ textDecoration: done ? 'line-through' : 'none' }}><input 
        type="checkbox" 
        checked={done} 
        onChange={this.onCheckedChange} />
          {text}
        </label>
        <button onClick={this.onClickDelete}>Kustuta</button>
    </li>
  }
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
      todos: prevState.todos.map((todo, $index) => index === $index ? {
        ...todo,
        done: checked
      } : todo)
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
            todo={todo} 
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