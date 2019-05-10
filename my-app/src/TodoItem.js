import React, {Component} from 'react';
import PropTypes from 'prop-types';

class TodoItem extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps.content !== this.props.content) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    console.log('child render')
    const { content} = this.props;
    // JSX -> JS对象 -> 真实的DOM
    return (
      <div onClick={this.handleClick}>
        {content} 
      </div>
      )
    // return React.createElement('div', {}, 'item');
  }

  handleClick() {
    const { deleteItem, index } = this.props;
    deleteItem(index);
  }

  // 当一个组件从父组件接收了参数
  // 如果这个组件第一次存在于父组件中，不会被执行
  // 如果这个组件之前已经存在于父组件中，才会执行
  componentWillReceiveProps() {
    console.log('child componentWillReceiveProps');
  }
  
  // 当这个组件即将被从页面中剔除的时候，会被执行
  componentWillUnmount() {
    console.log('child componentWillUnmount');
  }
}

TodoItem.propTypes = {
// 对TodoItem这个对象做属性校验
// isRequired  必须在父组件里向子组件传递
  // test: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  deleteItem: PropTypes.func,
  index: PropTypes.number
}

// TodoItem.defaultProps = {
//   test: 'hw'
// }

export default TodoItem