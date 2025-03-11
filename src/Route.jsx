import React from 'react'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'
import App from './App'

export default function Route() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" Component={App}/>
        </Routes>
      </div>
    </Router>
  )
}
