/**
 * This file is only used with the index.html, not with the library exports.
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.js'

import './demo.css'

// demo.css contains tailwind base layer so this must be imported after
// we don't want to include the base layer in the built css
import './tailwind.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
