import React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./app/store"
import "./index.css"
import { BrowserRouter, Route, Routes } from "react-router"

import EmployeeListPage from "./pages/EmployeeListPage/EmployeeListPage"
import EmployeeEditPage from "./pages/EmployeeEditPage/EmployeeEditPage"

const container = document.getElementById("root")

if (container) {
  const root = createRoot(container)

  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <Routes>
            <Route path="/" element={<EmployeeListPage />} />
            <Route path="/edit/:id" element={<EmployeeEditPage />} />
          </Routes>
        </Provider>
      </BrowserRouter>
    </React.StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
