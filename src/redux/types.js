import createConstants from '../utils/createConstants'

export const INTERNET_TYPES = createConstants('UPDATE_CONNECTION')

export const LANGUAGE_TYPES = createConstants('SET_LANGUAGE')

export const NGO_TYPES = createConstants(
  'SET_NGO_NAME',
  'NGO_REQUESTING',
  'NGO_REQUEST_SUCCESS',
  'NGO_REQUEST_FAILED'
)

export const AUTH_TYPES = createConstants(
  'LOGIN_REQUEST',
  'LOGIN_REQUEST_SUCCESS',
  'LOGIN_REQUEST_FAILED',
  'RESET_AUTH_STATE',
  'UPDATE_USER_REQUESTING',
  'UPDATE_USER_SUCCESS',
  'UPDATE_USER_FAILED'
)

export const PROVINCE_TYPES = createConstants(
  'PROVINCES_REQUESTING',
  'PROVINCES_SUCCEED',
  'PROVINCES_FAILED'
)

export const DEPARTMENT_TYPES = createConstants(
  'DEPARTMENTS_REQUESTING',
  'DEPARTMENTS_SUCCEED',
  'DEPARTMENTS_FAILED'
)

export const VILLAGE_TYPES = createConstants(
  'VILLAGES_REQUESTING',
  'VILLAGES_SUCCEED',
  'VILLAGES_FAILED'
)

export const COMMUNE_TYPES = createConstants(
  'COMMUNES_REQUESTING',
  'COMMUNES_SUCCEED',
  'COMMUNES_FAILED'
)

export const USER_TYPES = createConstants(
  'UPDATE_USER',
  'USERS_REQUESTING',
  'USERS_REQUEST_SUCCESS',
  'USERS_REQUEST_FAILED',
)

export const DOMAIN_TYPES = createConstants(
  'DOMAIN_REQUESTING',
  'DOMAIN_REQUEST_SUCCESS',
  'DOMAIN_REQUEST_FAILED',
)
