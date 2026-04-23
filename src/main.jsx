import React from 'react'
import ReactDom from 'react-dom/client'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import InvoiceProvider from './context/InvoiceContext.jsx'
import './index.css'
import App from './App.jsx'

ReactDom.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <InvoiceProvider>
    <App />
    </InvoiceProvider>
  </StrictMode>,
)
