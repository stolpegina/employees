import { createSelector } from "@reduxjs/toolkit"
import { EmployeesSliceState } from "./types"

export const employeesSelector = createSelector(
  (state: { employee: EmployeesSliceState }) => state.employee,
  ({ employees, filter }) => {
    let filteredEmployees = [...employees]

    if (filter.role) {
      filteredEmployees = filteredEmployees.filter(
        emp => emp.role === filter.role,
      )
    }

    if (filter.isArchive) {
      filteredEmployees = filteredEmployees.filter(emp => emp.isArchive)
    }

    if (filter.sortBy === "name") {
      filteredEmployees.sort((a, b) => a.name.localeCompare(b.name))
    } else if (filter.sortBy === "birthday") {
      filteredEmployees.sort(
        (a, b) =>
          new Date(a.birthday).getTime() - new Date(b.birthday).getTime(),
      )
    }

    return filteredEmployees
  },
)
