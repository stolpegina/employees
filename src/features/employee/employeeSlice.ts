import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import employeesData from "../../../employees.json"
import { Employee, EmployeesSliceState } from "./types"

const initialState: EmployeesSliceState = {
  employees: employeesData as Employee[],
  filter: {
    role: "",
    isArchive: false,
    sortBy: "",
  },
}

export const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    editEmployee: (
      state,
      action: PayloadAction<{ id: number; updates: Partial<Employee> }>,
    ) => {
      const { id, updates } = action.payload
      const employee = state.employees.find(emp => emp.id === id)
      if (employee) {
        Object.assign(employee, updates)
      }
    },
    addEmployee: (state, action: PayloadAction<Employee>) => {
      state.employees.push(action.payload)
    },
    deleteEmployee: (state, action: PayloadAction<number>) => {
      state.employees = state.employees.filter(emp => emp.id !== action.payload)
    },
    setFilter: (
      state,
      action: PayloadAction<Partial<EmployeesSliceState["filter"]>>,
    ) => {
      state.filter = { ...state.filter, ...action.payload }
    },
  },
})

export const { editEmployee, addEmployee, deleteEmployee, setFilter } =
  employeeSlice.actions

export default employeeSlice.reducer
