import React from "react"
import { useParams, useNavigate } from "react-router"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { editEmployee } from "../../features/employee/employeeSlice"
import EmployeeForm from "../../components/EmployeeForm/EmployeeForm"
import { Link } from "@mui/material"
import "./EmployeeEditPage.scss"

const EmployeeEditPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const employee = useAppSelector(state =>
    state.employee.employees.find(emp => emp.id === Number(id)),
  )

  if (!employee) {
    return <p>Сотрудник не найден</p>
  }

  const handleSave = (updatedEmployee: any) => {
    dispatch(editEmployee({ id: Number(id), updates: updatedEmployee }))
    navigate("/")
  }

  return (
    <div className="employee-edit-page">
      <Link
        className="employee-edit-link"
        type="submit"
        color="primary"
        onClick={() => navigate(-1)}
      >
        Назад
      </Link>
      <h1 className="employee-edit-title">Редактировать сотрудника</h1>

      <div className="employee-edit-container">
        <EmployeeForm onSubmit={handleSave} initialValues={employee} />
      </div>
    </div>
  )
}

export default EmployeeEditPage
