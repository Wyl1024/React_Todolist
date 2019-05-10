import React from 'react';
import ReactDOM from 'react-dom';
import TodoList from './TodoList';
import * as serviceWorker from './serviceWorker';

// PWA progressive web application 通过写网页的形式来写手机app应用
// https协议的服务器上
ReactDOM.render (
    <TodoList/>, 
    document.getElementById('root')
);
serviceWorker.unregister();
