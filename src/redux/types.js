import createConstants from '../utils/createConstants'

export const INTERNET_TYPES = createConstants('UPDATE_CONNECTION')

export const LANGUAGE_TYPES = createConstants('SET_LANGUAGE')

export const NGO_TYPES = createConstants('SET_NGO_NAME', 'NGO_REQUESTING', 'NGO_REQUEST_SUCCESS', 'NGO_REQUEST_FAILED')

export const AUTH_TYPES = createConstants(
  'LOGIN_REQUEST',
  'LOGIN_REQUEST_SUCCESS',
  'LOGIN_REQUEST_FAILED',
  'RESET_AUTH_STATE',
  'UPDATE_USER_REQUESTING',
  'UPDATE_USER_FAILED',
  'UPDATE_SUCCESS'
)
export const LOGOUT_TYPES = createConstants('LOGOUT_REQUESTING', 'LOGOUT_SUCCESS', 'LOGOUT_FAILED', 'LOGOUT_RESET_STATE')

export const BIRTH_PROVINCE_TYPES = createConstants('BIRTH_PROVINCES_REQUESTING', 'BIRTH_PROVINCES_SUCCEED', 'BIRTH_PROVINCES_FAILED')

export const PROVINCE_TYPES = createConstants('PROVINCES_REQUESTING', 'PROVINCES_SUCCEED', 'PROVINCES_FAILED')

export const DEPARTMENT_TYPES = createConstants('DEPARTMENTS_REQUESTING', 'DEPARTMENTS_SUCCESS', 'DEPARTMENTS_FAILED')

export const DISTRICT_TYPES = createConstants('DISTRICTS_REQUESTING', 'DISTRICTS_SUCCESS', 'DISTRICTS_FAILED')

export const VILLAGE_TYPES = createConstants('VILLAGES_REQUESTING', 'VILLAGES_SUCCESS', 'VILLAGES_FAILED')

export const COMMUNE_TYPES = createConstants('COMMUNES_REQUESTING', 'COMMUNES_SUCCESS', 'COMMUNES_FAILED')

export const SETTING_TYPES = createConstants('SETTING_REQUESTING', 'SETTING_SUCCESS', 'SETTING_FAILED')

export const USER_TYPES = createConstants('UPDATE_USER', 'USERS_REQUESTING', 'USERS_REQUEST_SUCCESS', 'USERS_REQUEST_FAILED')

export const DOMAIN_TYPES = createConstants('DOMAIN_REQUESTING', 'DOMAIN_REQUEST_SUCCESS', 'DOMAIN_REQUEST_FAILED')

export const CLIENT_TYPES = createConstants(
  'CLIENTS_REQUESTING',
  'CLIENTS_REQUEST_SUCCESS',
  'CLIENTS_REQUEST_FAILED',
  'UPDATE_CLIENT',
  'CLIENT_CUSTOM_FORM',
  'UPDATE_CLIENT_QUEUE',
  'REMOVE_CLIENT_QUEUE',
)

export const FAMILY_TYPES = createConstants(
  'FAMILIES_REQUESTING',
  'FAMILIES_REQUEST_SUCCESS',
  'FAMILIES_REQUEST_FAILED',
  'FAMILY_UPDATE_FAILED',
  'FAMILY_UPDATE_SUCCESS',
  'FAMILY_CUSTOM_FORM'
)

export const REFERRAL_SOURCE_TYPES = createConstants('REFERRAL_SOURCES_REQUESTING', 'REFERRAL_SOURCES_SUCCESS', 'REFERRAL_SOURCES_FAILED')

export const QUANTITATIVE_TYPES = createConstants('QUANTITATIVE_TYPES_REQUESTING', 'QUANTITATIVE_TYPES_SUCCESS', 'QUANTITATIVE_TYPES_FAILED')

export const DONOR_TYPES = createConstants('DONORS_REQUESTING', 'DONORS_SUCCESS', 'DONORS_FAILED')

export const AGENCY_TYPES = createConstants('AGENCIES_REQUESTING', 'AGENCIES_SUCCESS', 'AGENCIES_FAILED')

export const PROGRAM_STREAM_TYPES = createConstants('PROGRAM_STREAMS_REQUESTING', 'PROGRAM_STREAMS_REQUEST_SUCCESS', 'PROGRAM_STREAMS_REQUEST_FAILED')

export const QUEUE_CUSTOM_FIELD_PEROPERTY_TYPES = createConstants('QUEUE_CUSTOM_FIELD_PEROPERTIES_REQUEST_SUCCESS', 'QUEUE_CUSTOM_FIELD_PEROPERTIES_UPDATED', 'QUEUE_CUSTOM_FIELD_PEROPERTIES_FAILED')
