import React, { Component, Fragment } from 'react';
import TodoItem from './TodoItem';
import axios from 'axios'
import './style.css';
// {Component} ES6的结构化赋值 等价于 React.Component
// import { Component } from 'react'
// 等价于
// import React from 'react'
// const Component = React.Component
class TodoList extends Component {
  // 定义一个TodoList类继承React的Component类 
  // 当一个类继承了Component类的时候
  // 它就是React的一个组件了
  constructor(props) {
    super(props);
    this.state = {
      // state负责存储组件里面的数据
      inputValue: '',
      list: []
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleBtnClick = this.handleBtnClick.bind(this);
    this.handleItemDelete = this.handleItemDelete.bind(this);
     // bind改变handleInputChange作用域，也就是改变this的指向,使其指向TodoList组件
  }

  // 在组件即将被挂载到页面的时刻自动执行
  componentWillMount() {
    console.log('componentWillMount');
  }
  render() {
    return ( 
      <Fragment>
        <div>
          <label htmlFor='insertArea'>输入内容</label>
          <input
            id='insertArea'
            className='input'
            value={this.state.inputValue}
            onChange={this.handleInputChange}
            ref={(input) => {this.input = input}}
          />
          <button onClick={this.handleBtnClick}>提交</button>
        </div>
        <ul ref={(ul) => {this.ul = ul}}>
          {this.getTodoItem()}
        </ul>
      </Fragment>
    )
  }
  // 组件被挂载到页面之后，自动被执行
  componentDidMount() {
    axios.get('/api/todolist.json')
    .then((res) => {
      console.log(res.data);
      this.setState(() => {
        return {
          list: res.data
        }
      });
    })
    .catch(() => {
      alert('error')
    }) 
  }
  // 组件被更新之前，它会自动被执行
  shouldComponentUpdate() {
    console.log('shouldComponentUpdate');
    return true;
  }
  // 组件被更新之前，它会自动执行，但是他在shouldComponent之后被执行
  // 如果shouldComponentUpdate返回true它才执行
  // 如果返回false，这个函数就不会被执行了
  componentWillUpdate() {
    console.log('componentWillUpdate');
  }

  // 组件更新完成之后，它会被执行
  componentDidUpdate() {
    console.log('componentDidUpdate');
  }

  getTodoItem() {
    return this.state.list.map((item, index) => {
      // map方法实现数据循环
      return (
        <TodoItem
          key={index}
          content={item}
          index={index}
          deleteItem={this.handleItemDelete}
        />
      )
    })  
  }

  handleInputChange(e) {
  // 想要改变state的数据，需要React提供的setState方法来实现
    // this.setState({
    //   inputValue: e.target.value
    // })
  // 新版React可以让setState接收一个函数而不是一个对象了，由函数返回一个对象
  // ES6里函数返回对象不需要return, '()'就是简写的返回
  // 但是这里的setState如果传一个函数，它会是一个异步的setState,为了性能上的提升
  // 但是会有问题，所以需要在外部设一个变量保存一下再在内部使用
    const value = e.target.value;
    this.setState(( ) => ({
      inputValue: value
    })) 
  }
  handleBtnClick() {
  // preState是指你修改的数据之前的数据，等价于this.state
    this.setState((prevState) => ({
      list: [...prevState.list, prevState.inputValue],
      inputValue: ''
    }),()=>{
      console.log(this.ul.querySelectorAll('div').length);
    });
    // this.setState({
    //   list: [...this.state.list, this.state.inputValue],
    //   inputValue: ''
    // })
  }
  handleItemDelete(index) {
    // immutable
    // state不允许我们做任何的改变,所以要在函数内使用this.setState()
    this.setState((prevState) => {
      const list = [...prevState.list];
      list.splice(index,1);
      return {list}
    })
  }
}

export default TodoList;