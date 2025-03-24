import React from "react"
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
  Button,
} from "@mui/material"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

import InputMask from "react-input-mask"
import { Employee, EmployeeRoles } from "../../features/employee/types"
import "./EmployeeForm.scss"
import {
  formatDateForInput,
  formatDateForState,
  schema,
} from "../../helpers/inputValidation"

const EmployeeForm: React.FC<{
  onSubmit: (employee: Employee) => void
  initialValues?: Employee
}> = ({ onSubmit, initialValues }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Employee>({
    resolver: yupResolver(schema),
    defaultValues: initialValues || {
      id: Date.now(),
      name: undefined,
      phone: undefined,
      role: EmployeeRoles.Driver,
      birthday: undefined,
      isArchive: false,
    },
  })

  console.log(errors)

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="employee-form">
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Имя"
            fullWidth
            error={!!errors.name}
            helperText={errors.name?.message}
          />
        )}
      />

      <Controller
        name="phone"
        control={control}
        render={({ field }) => (
          <InputMask
            mask="+7 (999) 999-9999"
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
          >
            {inputProps => (
              <TextField
                {...inputProps}
                inputRef={field.ref}
                label="Телефон"
                fullWidth
                error={!!errors.phone}
                helperText={errors.phone?.message}
              />
            )}
          </InputMask>
        )}
      />

      <FormControl fullWidth error={!!errors.role}>
        <InputLabel>Роль</InputLabel>
        <Controller
          name="role"
          control={control}
          render={({ field }) => (
            <Select {...field} label="Роль">
              <MenuItem value="driver">Водитель</MenuItem>
              <MenuItem value="waiter">Официант</MenuItem>
              <MenuItem value="cook">Повар</MenuItem>
            </Select>
          )}
        />
      </FormControl>

      <Controller
        name="birthday"
        control={control}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              type="date"
              label="Дата рождения"
              InputLabelProps={{ shrink: true }}
              fullWidth
              error={!!errors.birthday}
              helperText={errors.birthday?.message}
              value={formatDateForInput(field.value)}
              onChange={e => field.onChange(formatDateForState(e.target.value))}
            />
          )
        }}
      />

      <Controller
        name="isArchive"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={<Checkbox {...field} checked={field.value} />}
            label="В архиве"
          />
        )}
      />

      <Button type="submit" variant="contained" color="primary">
        {initialValues ? "Сохранить" : "Добавить"}
      </Button>
    </form>
  )
}

export default EmployeeForm
