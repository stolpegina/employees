import * as yup from "yup"
import { EmployeeRoles } from "../features/employee/types"

export const formatDateForInput = (value: string) => {
  if (!value) return ""
  const [day, month, year] = value.split(".")
  return `${year}-${month}-${day}`
}

export const formatDateForState = (value: string) => {
  if (!value) return ""
  const [year, month, day] = value.split("-")
  return `${day}.${month}.${year}`
}

const isAdult = (dateString: string) => {
  const birthDate = new Date(formatDateForInput(dateString))

  const today = new Date()
  const age = today.getFullYear() - birthDate.getFullYear()

  return age >= 18
}

const isTooOld = (dateString: string) => {
  const birthDate = new Date(formatDateForInput(dateString))
  const today = new Date()
  const age = today.getFullYear() - birthDate.getFullYear()

  return age < 100
}

export const schema = yup.object().shape({
  id: yup.number().required(),
  name: yup
    .string()
    .matches(/^[А-Яа-яA-Za-z\s]+$/, "Разрешены только буквы разрешены")
    .required("Имя обязательно")
    .min(2, "Минимум 2 символа"),
  phone: yup
    .string()
    .matches(/^\+7 \(\d{3}\) \d{3}-\d{4}$/, "Неверный формат номера")
    .required("Телефон обязателен"),
  role: yup
    .mixed<`${EmployeeRoles}`>()
    .oneOf(Object.values(EmployeeRoles))
    .required("Роль обязательна"),
  birthday: yup
    .string()
    .required("Дата рождения обязательна")
    .test("isAdult", "Возраст должен быть не менее 18 лет", isAdult)
    .test("isTooOld", "Возраст должен быть не более 100 лет", isTooOld),
  isArchive: yup.boolean().required(),
})
