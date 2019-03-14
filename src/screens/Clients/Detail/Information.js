import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import moment from 'moment'
import _ from 'lodash'
import Field from '../../../components/Field'
import Card from '../../../components/Card'
import i18n from '../../../i18n'
import FastImage from 'react-native-fast-image'
export default class ClientInformation extends Component {
  calculateAge = () => {
    const { client } = this.props

    if (!client.date_of_birth) return ''

    const years = moment().diff(client.date_of_birth, 'years')
    const months = moment().diff(client.date_of_birth, 'months') % 12
    return this.pluralize('year', years) + ' ' + this.pluralize('month', months)
  }

  pluralize = (title, unit) => {
    if (unit === 0) return ''
    else if (unit === 1) return unit + ' ' + title
    else return unit + ' ' + title + 's'
  }

  serializeAddress = (field, value) => {
    return value ? `${field} ${value}`.trim() : null
  }

  address = () => {
    const { client, setting } = this.props
    const villageName = client.village && `${client.village.name_en} / ${client.village.name_kh}`
    const communeName = client.commune && `${client.commune.name_en} / ${client.commune.name_kh}`
    const districtName = client.district && client.district.name
    const provinceName = client.current_province && client.current_province.name
    const countryName = setting && _.upperCase(setting.country_name)

    const house = this.serializeAddress(i18n.t('client.form.house_number'), client.house_number)
    const street = this.serializeAddress(i18n.t('client.form.street_number'), client.street_number)

    return [house, street, villageName, communeName, districtName, provinceName, countryName].filter(Boolean).join(', ')
  }

  render() {
    const { client } = this.props

    return (
      <View style={styles.container}>
        <Card title={i18n.t('client.about_client')}>
          {client.profile && <FastImage style={styles.profile} source={{ uri: client.profile.uri }} resizeMode="contain" />}
          <Field name={i18n.t('client.form.given_name')} value={client.given_name} />
          <Field name={i18n.t('client.form.family_name')} value={client.family_name} />
          <Field name={i18n.t('client.form.age')} value={this.calculateAge()} />
          <Field name={i18n.t('client.form.date_of_birth')} value={client.date_of_birth} />
          <Field name={i18n.t('client.form.current_province')} value={client.current_province == undefined ? '' : client.current_province.name} />
          <Field name={i18n.t('client.form.code')} value={client.code} />
          <Field name={i18n.t('client.form.kid_id')} value={client.kid_id} />
          <Field name={i18n.t('client.form.donor')} value={_.map(client.donors, 'name').join(', ')} />
          <Field name={i18n.t('client.form.address')} value={this.address()} />
          <Field name={i18n.t('client.form.what3words')} value={client.what3words} />
          <Field name={i18n.t('client.form.birth_province')} value={client.birth_province == undefined ? '' : client.birth_province.name} />
          <Field name={i18n.t('client.form.name_of_referee')} value={client.name_of_referee} />
          <Field name={i18n.t('client.form.time_in_care')} value={client.time_in_care} />
          <Field
            name={i18n.t('client.form.follow_up_by')}
            value={client.followed_up_by == undefined ? '' : client.followed_up_by.first_name + ' ' + client.followed_up_by.last_name}
          />

          <Field name={i18n.t('client.form.follow_up_date')} value={client.follow_up_date} />
          <Field name={i18n.t('client.form.referral_source')} value={client.referral_source == undefined ? '' : client.referral_source.name} />
          <Field name={i18n.t('client.form.referral_phone')} value={client.referral_phone} />
          <Field name={i18n.t('client.form.who_live_with')} value={client.live_with} />
          <Field name={i18n.t('client.form.telephone_number')} value={client.telephone_number} />
          <Field name={i18n.t('client.form.rated_for_id_poor')} value={client.rated_for_id_poor} />
          <Field
            name={i18n.t('client.form.received_by')}
            value={client.received_by == undefined ? '' : client.received_by.first_name + client.received_by.last_name}
          />
          <Field name={i18n.t('client.form.initial_referral_date')} value={client.initial_referral_date} />
          <Field name={i18n.t('client.form.school_name')} value={client.school_name} />
          <Field name={i18n.t('client.form.school_grade')} value={client.school_grade} />
          <Field name={i18n.t('client.form.main_school_contact')} value={client.main_school_contact} />
          <Field name={i18n.t('client.form.has_been_orphanage')} value={client.has_been_in_orphanage ? 'Yes' : 'No'} />
          <Field name={i18n.t('client.form.has_goverment_care')} value={client.has_been_in_government_care ? 'Yes' : 'No'} />
          <Field name={i18n.t('client.form.relevant_referral_information')} value={client.relevant_referral_information} />
          <Field name={i18n.t('client.form.case_worker')} value={_.map(client.case_workers, cw => `${cw.first_name} ${cw.last_name}`).join(', ')} />
          <Field name={i18n.t('client.form.agencies_involved')} value={_.map(client.agencies, 'name').join(', ')} />
          {client.quantitative_cases.map((qc, index) => {
            const cases = qc.client_quantitative_cases.toString().replace(',', ' , ')
            return (
              <Field name={qc.quantitative_type} key={index}>
                <View style={styles.qcWrapper}>
                  {qc.client_quantitative_cases.map((cqc, index) => (
                    <View key={index} style={styles.qcLabel}>
                      <Text>{cqc}</Text>
                    </View>
                  ))}
                </View>
              </Field>
            )
          })}
        </Card>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingLeft: 20,
    paddingRight: 20
  },
  editButton: {
    color: '#fff',
    backgroundColor: '#1c84c6',
    padding: 6,
    paddingLeft: 35,
    paddingRight: 35
  },
  profile: {
    alignSelf: 'center',
    height: 200,
    width: 200,
    marginTop: 15,
    marginBottom: 15
  },
  qcWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10
  },
  qcLabel: {
    backgroundColor: '#EDEFF1',
    padding: 5,
    paddingLeft: 10,
    marginTop: 5
  }
})
