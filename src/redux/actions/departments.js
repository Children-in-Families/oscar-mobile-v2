import axios from "axios"
import {DEPARTMENT_TYPES} from "../types"
import endpoint from "../../constants/endpoint"

requestDepartments = () => ({
  type: DEPARTMENT_TYPES.DEPARTMENTS_REQUESTING
})

requestDepartmentsSucceed = data => ({
  type: DEPARTMENT_TYPES.DEPARTMENTS_SUCCEED,
  data: data
})

requestDepartmentsFailed = error => ({
  type: DEPARTMENT_TYPES.DEPARTMENTS_FAILED,
  error: error
})

export function fetchDepartments() {
  return (dispatch, getState) => {
    dispatch(requestDepartments())
    axios
      .get(endpoint.departmentsPath)
      .then(response => {
        dispatch(requestDepartmentsSucceed(response.data))
      })
      .catch(error => {
        dispatch(requestDepartmentsFailed(error))
      })
  }
}
