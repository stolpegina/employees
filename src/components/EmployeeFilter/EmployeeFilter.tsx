import React from "react"
import { useAppDispatch } from "../../app/hooks"
import { setFilter } from "../../features/employee/employeeSlice"
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  SelectChangeEvent,
} from "@mui/material"
import "./EmployeeFilter.scss"
import { EmployeesSliceState } from "../../features/employee/types"

const EmployeeFilter = () => {
  const dispatch = useAppDispatch()

  const handleRoleChange = (
    e: SelectChangeEvent<EmployeesSliceState["filter"]["role"]>,
  ) => {
    dispatch(
      setFilter({
        // NOTE: Should use type assertion (https://github.com/mui/material-ui/issues/44783)
        role: e.target.value as EmployeesSliceState["filter"]["role"],
      }),
    )
  }

  const handleSortChange = (
    e: SelectChangeEvent<EmployeesSliceState["filter"]["sortBy"]>,
  ) => {
    dispatch(
      setFilter({
        sortBy: e.target.value as EmployeesSliceState["filter"]["sortBy"],
      }),
    )
  }

  const handleArchiveChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setFilter({
        isArchive: e.target.checked,
      }),
    )
  }

  return (
    <div className="employee-filter">
      <FormControl fullWidth>
        <InputLabel id="role" shrink={true}>
          Роль
        </InputLabel>
        <Select
          label="Роль"
          labelId="role"
          onChange={handleRoleChange}
          defaultValue=""
          displayEmpty
        >
          <MenuItem value="">Все</MenuItem>
          <MenuItem value="cook">Повар</MenuItem>
          <MenuItem value="waiter">Официант</MenuItem>
          <MenuItem value="driver">Водитель</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel id="sort" shrink={true}>
          Сортировка
        </InputLabel>
        <Select
          labelId="sort"
          onChange={handleSortChange}
          defaultValue=""
          displayEmpty
          label="Сортировка"
        >
          <MenuItem value="">Без сортировки</MenuItem>
          <MenuItem value="name">По имени</MenuItem>
          <MenuItem value="birthday">По дате рождения</MenuItem>
        </Select>
      </FormControl>

      <FormControlLabel
        className="employee-filter-archive"
        control={<Checkbox onChange={handleArchiveChange} />}
        label="В архиве"
      />
    </div>
  )
}

export default EmployeeFilter
