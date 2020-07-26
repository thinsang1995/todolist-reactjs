import React from 'react';
import './App.css';

class App extends React.Component {
  state = {
    tasks: [
      {text: 'task 1', done: false},
      {text: 'task 2', done: false},
      {text: 'task 3', done: false}
    ]
  }

  handleDelete = (index) => {
    const newArr = [...this.state.tasks]
    newArr.splice(index, 1)
    this.setState({tasks: newArr})
  }

  handleSubmit = (task) => {
    this.setState({tasks: [...this.state.tasks, task]})
  }

  handleCheck = (itemIndex) => {
    const todo = this.state.tasks[itemIndex]
    todo.done = !todo.done
    this.setState({tasks: this.state.tasks})
  }
  
  render() {
    return (
      <div className="wrapper">
        <div className="card">
          <Header numberTodo={(this.state.tasks.length) - (this.state.tasks.filter(item => item.done).length)} />
          <TodoList tasks={this.state.tasks} onDelete={this.handleDelete} onCheck={this.handleCheck} />
          <SubmitForm onSubmitForm={this.handleSubmit} />
        </div>
      </div>
    )
  }
}

const Header = (props) => {
  return (
    <div className="card-header">
      <h1>You have {props.numberTodo} todos</h1>
    </div>
  )
}

const TodoList = (props) => {
  const todos = props.tasks.map((todo, index) => {
    return <Todo content={todo.text}
      todo={todo}
      key={index}
      id={index} 
      done={todo.done}
      onDelete={props.onDelete} 
      onCheck={props.onCheck} />
  })
  return (
    <div className="list-wrapper">
      {todos}
    </div>
  )
}

class Todo extends React.Component {

  onDone = () => {
    this.props.onCheck(this.props.id)
  }

  render() {
    return (
      <div className="list-item">
        <span className="icon" onClick={this.onDone} />
        <div className="text" style={{textDecoration: this.props.done ? 'line-through' : '' }}>
          {this.props.content}
        </div>
        <button className="delete" onClick={() => {this.props.onDelete(this.props.id)}}>X</button>
      </div>
    )
  }
}

class SubmitForm extends React.Component {
  state = {text: '', done: false}

  handleSubmit = (e) => {
    e.preventDefault()
    if(this.state.text === '') return
    this.props.onSubmitForm(this.state)
    this.setState({text: ''})
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          className="input"
          placeholder="Enter Item"
          value={this.state.text}
          onChange={(e) => this.setState({text: e.target.value})} />
        <button className="button">Submit</button>
      </form>
    )
  }
}

export default App;