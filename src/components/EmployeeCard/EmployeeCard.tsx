import React from "react"
import { Link } from "react-router"
import { Employee, employeeRolesNames } from "../../features/employee/types"
import { Card, CardContent, CardMedia, Typography, Button } from "@mui/material"
import "./EmployeeCard.scss"

const EmployeeCard: React.FC<{ employee: Employee }> = ({ employee }) => {
  return (
    <Card className="employee-card">
      <CardMedia
        component="img"
        height="200"
        width="200"
        image={`https://cataas.com/cat/says/${employee.id}?fontSize=0&type=square`}
        alt={employee.name}
        className="employee-photo"
      />
      <CardContent>
        <Typography variant="h6" className="employee-name">
          {employee.name}
        </Typography>
        <Typography variant="body2" className="employee-birthday">
          {employee.birthday}
        </Typography>
        <Typography variant="body2" className="employee-role">
          {employeeRolesNames[employee.role]}
        </Typography>
        <Typography variant="body2" className="employee-phone">
          {employee.phone}
        </Typography>
      </CardContent>
      <Button
        component={Link}
        to={`/edit/${employee.id}`}
        className="edit-link"
      >
        Редактировать
      </Button>
    </Card>
  )
}

export default EmployeeCard
