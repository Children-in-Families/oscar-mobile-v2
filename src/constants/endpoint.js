export default {
  baseURL: function(subDomain) {
    // return 'https://' + subDomain + '.oscarhq.com/api/v1'
    return 'http://' + subDomain + '.oscarhq-staging.com/api/v1'
    // return 'http://' + subDomain + '.lvh.me:3000/api/v1'
  },
  login: '/auth/sign_in',
  updateTokenPath: '/auth',
  tokenValidationPath: '/auth/validate_token',
  clientsPath: '/clients',
  enterNgoPath: '/enter_ngos',
  exitNgoPath: '/exit_ngos',
  domainPath: '/domains',
  domainGroupsPath: '/domain_groups',
  familiesPath: '/families',
  birthProvincesPath: '/birth_provinces',
  provincesPath: '/provinces',
  districtsPath: '/districts',
  communesPath: '/communes',
  villagesPath: '/villages',
  donorsPath: '/donors',
  usersPath: '/users',
  referralSourcesPath: '/referral_sources',
  tasksPath: '/users',
  createTaskPath: '/tasks',
  editTaskPath: '/tasks',
  deleteTaskPath: '/tasks',
  quantitativeTypesPath: '/quantitative_types',
  agenciesPath: '/agencies',
  logoutPath: '/auth/sign_out',
  departmentsPath: '/departments',
  assessmentsPath: '/assessments',
  caseNotesPath: '/case_notes',
  ngoPath: '/organizations',
  settingPath: '/settings',
  additionalFormPath: '/custom_field_properties',
  programStreamsPath: '/program_streams',
  translationsPath: '/translations',
  editEnrollmentProgramPath: '/clients/${client_id}/client_enrollments/${program_id}',
  createEnrollmentProgramPath: '/clients/${client_id}/client_enrollments',
  editLeaveProgramPath: '/clients/${client_id}/client_enrollments/${program_id}/leave_programs/${leave_id}',
  createLeaveProgramPath: '/clients/${client_id}/client_enrollments/${program_id}/leave_programs',
  editTrackingProgramPath: '/clients/${client_id}/client_enrollments/${client_enrollment_id}/client_enrollment_trackings/${id}',
  createTrackingPath: '/clients/${client_id}/client_enrollments/${client_enrollment_id}/client_enrollment_trackings',
  createFamilyAdditonalFormPath: '/families/${entity_id}/custom_field_properties',
  createClientAdditonalFormPath: '/clients/${entity_id}/custom_field_properties'
}
