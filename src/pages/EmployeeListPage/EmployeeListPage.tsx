import React, { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { addEmployee } from "../../features/employee/employeeSlice"
import EmployeeCard from "../../components/EmployeeCard/EmployeeCard"
import EmployeeFilter from "../../components/EmployeeFilter/EmployeeFilter"
import EmployeeForm from "../../components/EmployeeForm/EmployeeForm"
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material"
import "./EmployeeListPage.scss"

import CloseIcon from "@mui/icons-material/Close"
import { employeesSelector } from "../../features/employee/employeeSelectors"

const EmployeeListPage = () => {
  const dispatch = useAppDispatch()
  const employees = useAppSelector(employeesSelector)
  const [isFormOpen, setIsFormOpen] = useState(false)

  const handleAddEmployee = (newEmployee: any) => {
    dispatch(addEmployee(newEmployee))
    setIsFormOpen(false)
  }

  return (
    <div className="employee-list-page">
      <h1 className="employee-list-title">Список сотрудников</h1>

      <div className="employee-list-form">
        <EmployeeFilter />
        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsFormOpen(true)}
        >
          Добавить сотрудника
        </Button>
      </div>

      <div className="employee-list">
        {employees.map(emp => (
          <EmployeeCard key={emp.id} employee={emp} />
        ))}
      </div>

      <Dialog open={isFormOpen} onClose={() => setIsFormOpen(false)} fullWidth>
        <DialogTitle>Добавить сотрудника</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => setIsFormOpen(false)}
          sx={theme => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent>
          <EmployeeForm onSubmit={handleAddEmployee} />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default EmployeeListPage
