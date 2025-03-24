export enum EmployeeRoles {
  Waiter = "waiter",
  Driver = "driver",
  Cook = "cook",
}

export const employeeRolesNames: Record<EmployeeRoles, string> = {
  [EmployeeRoles.Waiter]: "Официант",
  [EmployeeRoles.Driver]: "Водитель",
  [EmployeeRoles.Cook]: "Повар",
}

export interface Employee {
  id: number
  name: string
  isArchive: boolean
  role: `${EmployeeRoles}`
  phone: string
  birthday: string
}

export interface EmployeesSliceState {
  employees: Employee[]
  filter: {
    role: `${EmployeeRoles}` | ""
    isArchive: boolean
    sortBy: "name" | "birthday" | ""
  }
}
