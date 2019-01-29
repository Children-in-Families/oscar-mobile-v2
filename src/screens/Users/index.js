import React, { Component } from 'react'
import {
  View,
  Text,
  ScrollView
} from 'react-native'
import Button                 from 'apsl-react-native-button'
import { Navigation }         from 'react-native-navigation'
import _                      from 'lodash';
import Field                  from '../../components/field/Field'
import { connect }            from 'react-redux'
import { pushScreen }         from '../../navigation/config'
import { fetchProvinces }     from '../../redux/actions/provinces'
import { fetchDepartments }   from '../../redux/actions/departments'
import { fetchUser }          from '../../redux/actions/users'
import { profileStyle }       from './styles';
import i18n                   from '../../i18n'
const color = '#18a689'

class User extends Component {
  constructor(props) {
    super(props)
    this.props.fetchProvinces()
    this.props.fetchDepartments()
    Navigation.events().bindComponent(this)
  }

  navigationButtonPressed({ buttonId }) {
    if (buttonId === 'TRANSLATION') {
      pushScreen(this.props.componentId, {
        screen: 'oscar.language',
        title: i18n.t('language.languages')
      })
    }
  }

  render() {
    const {provinces, departments, user } = this.props
    const department = user.department_id ? _.find(departments, { 'id': user.department_id }).name : ''
    const province   = user.province_id ? _.find(provinces, { 'id': user.province_id }).name : ''

    return (
      <View style={profileStyle.container}>
        <ScrollView
          contentContainerStyle={profileStyle.contentsContainer}
          showsVerticalScrollIndicator={false}>
          <View style={profileStyle.aboutFamily}>
            <Text style={profileStyle.aboutFamilyText}>About User</Text>
          </View>
          <Field name={i18n.t('user.first_name')} value={user.first_name}  />
          <Field name={i18n.t('user.last_name')} value={user.last_name}  />
          <Field name={i18n.t('user.gender')} value={_.capitalize(user.gender)}  />
          <Field name={i18n.t('user.job_title')} value={user.job_title}  />
          <Field name={i18n.t('user.department')} value={department}  />
          <Field name={i18n.t('user.mobile')} value={user.mobile}  />
          <Field name={i18n.t('user.email')} value={user.email}  />
          <Field name={i18n.t('user.date_of_birth')} value={user.date_of_birth}  />
          <Field name={i18n.t('user.start_date')} value={user.start_date}  />
          <Field name={i18n.t('user.province')} value={province}  />
          <Button
            style={profileStyle.logoutButton}
            textStyle={profileStyle.buttonTitle}
            onPress={() => {}}
            isLoading={false}
            isDisabled={false}>
            {i18n.t('user.log_out')}
          </Button>
        </ScrollView>
      </View>
    )
  }
}

const mapState = (state) => ({
  user: state.auth.data,
  departments: state.departments.data.departments,
  provinces: state.provinces.data.provinces
})

const mapDispatch = {
  fetchProvinces,
  fetchDepartments
}

export default connect(mapState, mapDispatch)(User)
