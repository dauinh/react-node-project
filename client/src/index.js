import React from 'react';
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter as Router } from "react-router-dom"
import { ThemeProvider } from '@material-ui/core'
import { theme } from './theme'
import './index.css'

ReactDOM.render(
  <Router>
    <ThemeProvider theme={theme}>
      <App/>
    </ThemeProvider>
  </Router>,
  document.getElementById('root')
);