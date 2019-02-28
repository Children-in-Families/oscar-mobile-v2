import React, { Component } from 'react'
import { View, Text, TextInput, Picker, StyleSheet, ScrollView, Dimensions } from 'react-native'
import { Button, CheckBox, Icon } from 'react-native-elements'
import DatePicker from 'react-native-datepicker'
import Profile from './Profile'
import SectionedMultiSelect from 'react-native-sectioned-multi-select'
import { customFormStyles } from '../styles'
import i18n from '../i18n'
import { schoolGrades, poorIds, genders } from '../constants/clientOptions'
import { connect } from 'react-redux'
import { MAIN_COLOR } from '../constants/colors'
import Agencies from './clients/Agencies'
import CaseWorker from './clients/CaseWorker'
import Donors from './clients/Donors'
import QuantitiveCase from './clients/QuantitiveCase'
import { Navigation } from 'react-native-navigation'
import _ from 'lodash'

class ClientForm extends Component {
  constructor(props) {
    super(props)
    this.state = { client: props.client }
    Navigation.events().bindComponent(this)
  }

  navigationButtonPressed({ buttonId }) {
    if (buttonId === 'SAVE_CLIENT') {
      this.props.updateClientProperty(this.state.client, this.props)
    }
  }
  componentDidMount() {
    const { client } = this.state
    const { quantitativeTypes } = this.props
    let agencyIds = []
    let quantitativesID = []
    let caseWorkersID = []
    let donorIds = []

    if (client.quantitative_cases.length > 0) {
      if (quantitativeTypes.quantitative_types != undefined) {
        _.map(quantitativeTypes.quantitative_types, quantitative_type => {
          _.map(client.quantitative_cases, c_case => {
            if (c_case.quantitative_type == quantitative_type.name) {
              _.map(c_case.client_quantitative_cases, client_case => {
                _.map(quantitative_type.quantitative_cases, quantitative_case => {
                  if (quantitative_case.value == client_case) {
                    quantitativesID = quantitativesID.concat(quantitative_case.id)
                  }
                })
              })
            }
          })
        })
      }
    }

    if (client.agencies.length > 0) {
      agencyIds = _.map(client.agencies, 'id')
    }
    if (client.case_workers.length > 0) {
      caseWorkersID = _.map(client.case_workers, 'id')
    }
    if (client.donors.length > 0) {
      donorIds = _.map(client.donors, 'id')
    }
    this.setState(prevState => ({
      client: Object.assign({}, prevState.client, {
        birth_province_id: client.birth_province != null ? client.birth_province.id : '',
        donor_ids: donorIds,
        received_by_id: client.received_by != null ? client.received_by.id : '',
        followed_up_by_id: client.followed_up_by != null ? client.followed_up_by.id : '',
        user_ids: caseWorkersID,
        referral_source_id: client.referral_source != null ? client.referral_source.id : '',
        agency_ids: agencyIds,
        quantitative_case_ids: quantitativesID,
        province_id: client.current_province != null ? client.current_province.id : '',
        district_id: client.district != null ? client.district.id : '',
        commune_id: client.commune != null ? client.commune.id : '',
        village_id: client.village != null ? client.village.id : ''
      })
    }))
  }

  updateClientState = (key, value) => {
    this.setState(prevState => ({
      client: Object.assign({}, prevState.client, {
        [key]: value
      })
    }))
  }

  listItems(options) {
    return _.map(options, option => ({ name: option.name, id: option.id }))
  }

  listUserItems(users) {
    return _.map(users, user => ({ name: `${user.first_name} ${user.last_name}`, id: user.id }))
  }

  selectQuantitativeTypes(quantitativeType) {}

  _renderCaseWorkers = () => {
    const { users } = this.props
    if (users != undefined && users.length > 0) {
      return (
        <CaseWorker _setCaseWorkers={this._setCaseWorkers} _removeCaseWorkers={this._removeCaseWorkers} users={users} client={this.state.client} />
      )
    }
  }

  _setCaseWorkers = value => {
    const { client } = this.state
    if (client.user_ids != undefined) {
      const newCaseWorkers = client.user_ids.concat(value)
      this.updateClientState('user_ids', _.uniq(newCaseWorkers))
    } else {
      this.updateClientState('user_ids', value)
    }
  }

  _removeCaseWorkers = value => {
    const { client } = this.state
    const newCaseWorkers = _.filter(client.user_ids, id => {
      return id != value
    })
    this.updateClientState('user_ids', newCaseWorkers)
  }

  _renderDonors = () => {
    const { donors } = this.props

    if (donors != undefined) {
      return <Donors key="donors" updateClientState={this.updateClientState} donors={donors} client={this.state.client} />
    }
  }

  _renderQuantitativeTypes = () => {
    const { quantitativeTypes } = this.props
    if (quantitativeTypes != undefined) {
      return quantitativeTypes.map((quantitative_type, index) => {
        return (
          <View key={index} style={customFormStyles.fieldContainer}>
            <Text style={[customFormStyles.label, customFormStyles.labelMargin]}>{quantitative_type.name}</Text>
            <View style={[customFormStyles.pickerContainer, { padding: 0 }]}>
              <QuantitiveCase
                _setQuantitativeCases={this._setQuantitativeCases}
                _removeQuantitativeCase={this._removeQuantitativeCase}
                quantitativeType={quantitative_type}
                client={this.state.client}
              />
            </View>
          </View>
        )
      })
    }
  }

  _setQuantitativeCases = value => {
    const { client } = this.state
    if (client.quantitative_case_ids != undefined) {
      const newCases = client.quantitative_case_ids.concat(value)
      this.updateClientState('quantitative_case_ids', _.uniq(newCases))
    } else {
      this.updateClientState('quantitative_case_ids', value)
    }
  }

  _removeQuantitativeCase = value => {
    const newCases = _.filter(this.state.client.quantitative_case_ids, id => {
      return id != value
    })
    this.updateClientState('quantitative_case_ids', newCases)
  }

  _renderAgencies = () => {
    const { agencies } = this.props
    if (agencies != undefined) {
      return <Agencies key="agency" updateClientState={this.updateClientState} agencies={agencies} client={this.state.client} />
    }
  }

  render() {
    const { client } = this.state
    const { users, provinces, donors, referralSources, communes, villages, quantitativeTypes, agencies, districts } = this.props

    let districtOptions = _.filter(districts, { province_id: client.province_id })
    let communeOptions = _.filter(communes, { district_id: client.district_id })
    let villageOptions = _.filter(villages, { commune_id: client.commune_id })
    return (
      <View style={customFormStyles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={customFormStyles.aboutClientContainer}>
            <View style={customFormStyles.fieldContainer}>
              <Text style={customFormStyles.label}>{i18n.t('client.form.given_name')}</Text>
              <TextInput
                autoCapitalize="sentences"
                placeholder={i18n.t('client.form.given_name')}
                placeholderTextColor="#b7b3b3"
                returnKeyType="next"
                style={customFormStyles.input}
                underlineColorAndroid="#009999"
                onChangeText={text => this.updateClientState('given_name', text)}
                value={client.given_name}
              />
            </View>
            <View style={customFormStyles.fieldContainer}>
              <Text style={customFormStyles.label}>{i18n.t('client.form.family_name')}</Text>
              <TextInput
                autoCapitalize="sentences"
                placeholder={i18n.t('client.form.family_name')}
                placeholderTextColor="#b7b3b3"
                returnKeyType="next"
                style={customFormStyles.input}
                underlineColorAndroid="#009999"
                onChangeText={text => this.updateClientState('family_name', text)}
                value={client.family_name}
              />
            </View>
            <View style={customFormStyles.fieldContainer}>
              <Text style={customFormStyles.label}>{i18n.t('client.form.given_name_local')}</Text>
              <TextInput
                autoCapitalize="sentences"
                placeholder={i18n.t('client.form.given_name_local')}
                placeholderTextColor="#b7b3b3"
                returnKeyType="next"
                style={customFormStyles.input}
                underlineColorAndroid="#009999"
                onChangeText={text => this.updateClientState('local_given_name', text)}
                value={client.local_given_name}
              />
            </View>
            <View style={customFormStyles.fieldContainer}>
              <Text style={customFormStyles.label}>{i18n.t('client.form.family_name_local')}</Text>
              <TextInput
                autoCapitalize="sentences"
                placeholder={i18n.t('client.form.family_name_local')}
                placeholderTextColor="#b7b3b3"
                returnKeyType="next"
                style={customFormStyles.input}
                underlineColorAndroid="#009999"
                onChangeText={text => this.updateClientState('local_family_name', text)}
                value={client.local_family_name}
              />
            </View>
            <View style={customFormStyles.fieldContainer}>
              <Text style={[customFormStyles.label, customFormStyles.labelMargin]}>{i18n.t('client.form.date_of_birth')}</Text>
              <DatePicker
                date={client.date_of_birth}
                style={customFormStyles.datePicker}
                mode="date"
                confirmBtnText="Done"
                cancelBtnText="Cancel"
                showIcon={false}
                placeholder={i18n.t('client.select_date')}
                format="YYYY-MM-DD"
                customStyles={{
                  dateInput: customFormStyles.datePickerBorder
                }}
                onDateChange={date => this.updateClientState('date_of_birth', date)}
              />
            </View>
            <View style={customFormStyles.fieldContainer}>
              <Text style={[customFormStyles.label, customFormStyles.labelMargin]}>{i18n.t('client.form.birth_province')}</Text>
              <SectionedMultiSelect
                items={this.listItems(provinces)}
                uniqueKey="id"
                modalWithSafeAreaView
                selectText={i18n.t('select_option')}
                searchPlaceholderText={i18n.t('family.search')}
                confirmText={i18n.t('family.confirm')}
                showDropDowns={true}
                single={true}
                hideSearch={false}
                showCancelButton={true}
                styles={{ button: { backgroundColor: MAIN_COLOR }, cancelButton: { width: 150 } }}
                onSelectedItemsChange={itemValue => this.updateClientState('birth_province_id', itemValue[0])}
                selectedItems={[client.birth_province_id]}
              />
            </View>
            <View style={customFormStyles.fieldContainer}>
              <Text style={[customFormStyles.label, customFormStyles.labelMargin]}>{i18n.t('client.form.donor')}</Text>
              <View style={[customFormStyles.pickerContainer, { padding: 0 }]}>{this._renderDonors()}</View>
            </View>
            <View style={customFormStyles.fieldContainer}>
              <Text style={[customFormStyles.label, customFormStyles.labelMargin]}>{i18n.t('client.form.gender')}</Text>
              <SectionedMultiSelect
                items={genders}
                uniqueKey="id"
                modalWithSafeAreaView
                selectText={i18n.t('select_option')}
                searchPlaceholderText={i18n.t('family.search')}
                confirmText={i18n.t('family.confirm')}
                showDropDowns={true}
                single={true}
                hideSearch={false}
                showCancelButton={true}
                styles={{ button: { backgroundColor: MAIN_COLOR }, cancelButton: { width: 150 } }}
                onSelectedItemsChange={itemValue => this.updateClientState('gender', itemValue[0])}
                selectedItems={[client.gender]}
              />
            </View>
            <View style={customFormStyles.fieldContainer}>
              <Text style={[customFormStyles.label, customFormStyles.labelMargin]}>{i18n.t('client.form.code')}</Text>
              <TextInput
                autoCapitalize="sentences"
                placeholder={i18n.t('client.form.code')}
                placeholderTextColor="#b7b3b3"
                returnKeyType="next"
                style={customFormStyles.input}
                underlineColorAndroid="#009999"
                onChangeText={text => this.updateClientState('code', text)}
                value={this.state.client.code}
              />
            </View>
            <View style={customFormStyles.fieldContainer}>
              <Text style={[customFormStyles.label, customFormStyles.labelMargin]}>{i18n.t('client.form.kid_id')}</Text>
              <TextInput
                autoCapitalize="sentences"
                placeholder={i18n.t('client.form.kid_id')}
                placeholderTextColor="#b7b3b3"
                returnKeyType="next"
                style={customFormStyles.input}
                underlineColorAndroid="#009999"
                onChangeText={text => this.updateClientState('kid_id', text)}
                value={this.state.client.kid_id}
              />
            </View>
            <View style={customFormStyles.fieldContainer}>
              <Text style={[customFormStyles.label, customFormStyles.labelMargin]}>{i18n.t('client.form.current_province')}</Text>
              <SectionedMultiSelect
                items={this.listItems(provinces)}
                uniqueKey="id"
                modalWithSafeAreaView
                selectText={i18n.t('select_option')}
                searchPlaceholderText={i18n.t('family.search')}
                confirmText={i18n.t('family.confirm')}
                showDropDowns={true}
                single={true}
                hideSearch={false}
                showCancelButton={true}
                styles={{ button: { backgroundColor: MAIN_COLOR }, cancelButton: { width: 150 } }}
                onSelectedItemsChange={itemValue => {
                  this.updateClientState('province_id', itemValue[0]),
                    this.updateClientState('district_id', null),
                    this.updateClientState('commune_id', null),
                    this.updateClientState('village_id', null)
                }}
                selectedItems={[client.province_id]}
              />
            </View>
            <View style={customFormStyles.fieldContainer}>
              <Text style={[customFormStyles.label, customFormStyles.labelMargin]}>{i18n.t('client.form.district')}</Text>
              <SectionedMultiSelect
                items={this.listItems(districtOptions)}
                uniqueKey="id"
                selectText={i18n.t('family.select_district')}
                searchPlaceholderText={i18n.t('family.search')}
                confirmText={i18n.t('family.confirm')}
                showDropDowns={true}
                single={true}
                hideSearch={false}
                showCancelButton={true}
                styles={{ button: { backgroundColor: MAIN_COLOR }, cancelButton: { width: 150 } }}
                onSelectedItemsChange={itemValue => {
                  this.updateClientState('district_id', itemValue[0]),
                    this.updateClientState('commune_id', null),
                    this.updateClientState('village_id', null)
                }}
                selectedItems={[client.district_id]}
              />
            </View>
            <View style={customFormStyles.fieldContainer}>
              <Text style={[customFormStyles.label, customFormStyles.labelMargin]}>{i18n.t('client.form.commune')}</Text>
              <SectionedMultiSelect
                items={this.listItems(communeOptions)}
                uniqueKey="id"
                modalWithSafeAreaView
                selectText={i18n.t('select_option')}
                searchPlaceholderText={i18n.t('family.search')}
                confirmText={i18n.t('family.confirm')}
                showDropDowns={true}
                single={true}
                hideSearch={false}
                showCancelButton={true}
                styles={{ button: { backgroundColor: MAIN_COLOR }, cancelButton: { width: 150 } }}
                onSelectedItemsChange={itemValue => {
                  this.updateClientState('commune_id', itemValue[0]), this.updateClientState('village_id', null)
                }}
                selectedItems={[client.commune_id]}
              />
            </View>
            <View style={customFormStyles.fieldContainer}>
              <Text style={[customFormStyles.label, customFormStyles.labelMargin]}>{i18n.t('client.form.village')}</Text>
              <SectionedMultiSelect
                items={this.listItems(villageOptions)}
                uniqueKey="id"
                modalWithSafeAreaView
                selectText={i18n.t('select_option')}
                searchPlaceholderText={i18n.t('family.search')}
                confirmText={i18n.t('family.confirm')}
                showDropDowns={true}
                single={true}
                hideSearch={false}
                showCancelButton={true}
                styles={{ button: { backgroundColor: MAIN_COLOR }, cancelButton: { width: 150 } }}
                onSelectedItemsChange={itemValue => this.updateClientState('village_id', itemValue[0])}
                selectedItems={[client.village_id]}
              />
            </View>
            <View style={customFormStyles.fieldContainer}>
              <Text style={customFormStyles.label}>{i18n.t('client.form.street_number')}</Text>
              <TextInput
                autoCapitalize="sentences"
                placeholder={i18n.t('client.form.street_number')}
                placeholderTextColor="#b7b3b3"
                returnKeyType="next"
                style={customFormStyles.input}
                underlineColorAndroid="#009999"
                onChangeText={text => this.updateClientState('street_number', text)}
                value={client.street_number}
              />
            </View>
            <View style={customFormStyles.fieldContainer}>
              <Text style={[customFormStyles.label, customFormStyles.labelMargin]}>{i18n.t('client.form.house_number')}</Text>
              <TextInput
                autoCapitalize="sentences"
                placeholder={i18n.t('client.form.house_number')}
                placeholderTextColor="#b7b3b3"
                returnKeyType="next"
                style={customFormStyles.input}
                underlineColorAndroid="#009999"
                onChangeText={text => this.updateClientState('house_number', text)}
                value={client.house_number}
              />
            </View>
            <View style={customFormStyles.fieldContainer}>
              <Text style={customFormStyles.label}>{i18n.t('client.form.profile')}</Text>
              <Profile onChange={this.updateClientState} image={client.profile} editable />
            </View>
            <View style={customFormStyles.fieldContainer}>
              <Text style={customFormStyles.label}>{i18n.t('client.form.what3words')}</Text>
              <TextInput
                autoCapitalize="sentences"
                placeholder={i18n.t('client.form.what3words')}
                placeholderTextColor="#b7b3b3"
                returnKeyType="next"
                style={customFormStyles.input}
                underlineColorAndroid="#009999"
                onChangeText={text => this.updateClientState('what3words', text)}
                value={client.what3words}
              />
            </View>
            <View style={customFormStyles.fieldContainer}>
              <Text style={[customFormStyles.label, customFormStyles.labelMargin]}>{i18n.t('client.form.initial_referral_date')}</Text>
              <DatePicker
                date={client.initial_referral_date}
                style={customFormStyles.datePicker}
                mode="date"
                confirmBtnText="Done"
                cancelBtnText="Cancel"
                placeholder={i18n.t('client.select_date')}
                format="YYYY-MM-DD"
                showIcon={false}
                customStyles={{
                  dateInput: customFormStyles.datePickerBorder
                }}
                onDateChange={date => this.updateClientState('initial_referral_date', date)}
              />
            </View>
            <View style={customFormStyles.fieldContainer}>
              <Text style={[customFormStyles.label, customFormStyles.labelMargin]}>{i18n.t('client.form.referral_source')}</Text>
              <SectionedMultiSelect
                items={this.listItems(referralSources)}
                uniqueKey="id"
                modalWithSafeAreaView
                selectText={i18n.t('select_option')}
                searchPlaceholderText={i18n.t('family.search')}
                confirmText={i18n.t('family.confirm')}
                showDropDowns={true}
                single={true}
                hideSearch={false}
                showCancelButton={true}
                styles={{ button: { backgroundColor: MAIN_COLOR }, cancelButton: { width: 150 } }}
                onSelectedItemsChange={itemValue => this.updateClientState('referral_source_id', itemValue[0])}
                selectedItems={[client.referral_source_id]}
              />
            </View>
            <View style={customFormStyles.fieldContainer}>
              <Text style={customFormStyles.label}>{i18n.t('client.form.referral_phone')}</Text>
              <TextInput
                autoCapitalize="sentences"
                placeholder={i18n.t('client.form.referral_phone')}
                placeholderTextColor="#b7b3b3"
                returnKeyType="next"
                keyboardType="numeric"
                style={customFormStyles.input}
                underlineColorAndroid="#009999"
                onChangeText={text => this.updateClientState('referral_phone', text)}
                value={client.referral_phone}
              />
            </View>
            <View style={customFormStyles.fieldContainer}>
              <Text style={customFormStyles.label}>{i18n.t('client.form.name_of_referee')}</Text>
              <TextInput
                autoCapitalize="sentences"
                placeholder={i18n.t('client.form.name_of_referee')}
                placeholderTextColor="#b7b3b3"
                returnKeyType="next"
                style={customFormStyles.input}
                underlineColorAndroid="#009999"
                onChangeText={text => this.updateClientState('name_of_referee', text)}
                value={client.name_of_referee}
              />
            </View>
            <View style={customFormStyles.fieldContainer}>
              <Text style={customFormStyles.label}>{i18n.t('client.form.who_live_with')}</Text>
              <TextInput
                autoCapitalize="sentences"
                placeholder={i18n.t('client.form.who_live_with')}
                placeholderTextColor="#b7b3b3"
                returnKeyType="next"
                style={customFormStyles.input}
                underlineColorAndroid="#009999"
                onChangeText={text => this.updateClientState('live_with', text)}
                value={client.live_with}
              />
            </View>
            <View style={customFormStyles.fieldContainer}>
              <Text style={customFormStyles.label}>{i18n.t('client.form.telephone_number')}</Text>
              <TextInput
                autoCapitalize="sentences"
                placeholder={i18n.t('client.form.telephone_number')}
                placeholderTextColor="#b7b3b3"
                returnKeyType="next"
                keyboardType="numeric"
                style={customFormStyles.input}
                underlineColorAndroid="#009999"
                onChangeText={text => this.updateClientState('telephone_number', text)}
                value={client.telephone_number}
              />
            </View>
            <View style={customFormStyles.fieldContainer}>
              <Text style={customFormStyles.label}>{i18n.t('client.form.rated_for_id_poor')}</Text>
              <SectionedMultiSelect
                items={poorIds}
                uniqueKey="id"
                modalWithSafeAreaView
                selectText={i18n.t('select_option')}
                searchPlaceholderText={i18n.t('family.search')}
                confirmText={i18n.t('family.confirm')}
                showDropDowns={true}
                single={true}
                hideSearch={false}
                showCancelButton={true}
                styles={{ button: { backgroundColor: MAIN_COLOR }, cancelButton: { width: 150 } }}
                onSelectedItemsChange={itemValue => this.updateClientState('rated_for_id_poor', itemValue[0])}
                selectedItems={[client.rated_for_id_poor]}
              />
            </View>
            <View style={customFormStyles.fieldContainer}>
              <Text style={[customFormStyles.label, customFormStyles.labelMargin]}>{i18n.t('client.form.received_by')}</Text>
              <SectionedMultiSelect
                items={this.listUserItems(users)}
                uniqueKey="id"
                modalWithSafeAreaView
                selectText={i18n.t('select_option')}
                searchPlaceholderText={i18n.t('family.search')}
                confirmText={i18n.t('family.confirm')}
                showDropDowns={true}
                single={true}
                hideSearch={false}
                showCancelButton={true}
                styles={{ button: { backgroundColor: MAIN_COLOR }, cancelButton: { width: 150 } }}
                onSelectedItemsChange={itemValue => this.updateClientState('received_by_id', itemValue[0])}
                selectedItems={[client.received_by_id]}
              />
            </View>
            <View style={customFormStyles.fieldContainer}>
              <Text style={[customFormStyles.label, customFormStyles.labelMargin]}>{i18n.t('client.form.follow_up_by')}</Text>
              <SectionedMultiSelect
                items={this.listUserItems(users)}
                uniqueKey="id"
                modalWithSafeAreaView
                selectText={i18n.t('select_option')}
                searchPlaceholderText={i18n.t('family.search')}
                confirmText={i18n.t('family.confirm')}
                showDropDowns={true}
                single={true}
                hideSearch={false}
                showCancelButton={true}
                styles={{ button: { backgroundColor: MAIN_COLOR }, cancelButton: { width: 150 } }}
                onSelectedItemsChange={itemValue => this.updateClientState('followed_up_by_id', itemValue[0])}
                selectedItems={[client.followed_up_by_id]}
              />
            </View>
            <View style={customFormStyles.fieldContainer}>
              <Text style={[customFormStyles.label, customFormStyles.labelMargin]}>{i18n.t('client.form.follow_up_date')}</Text>
              <DatePicker
                date={client.follow_up_date}
                style={customFormStyles.datePicker}
                mode="date"
                confirmBtnText="Done"
                cancelBtnText="Cancel"
                placeholder={i18n.t('client.select_date')}
                showIcon={false}
                format="YYYY-MM-DD"
                customStyles={{
                  dateInput: customFormStyles.datePickerBorder
                }}
                onDateChange={date => this.updateClientState('follow_up_date', date)}
              />
            </View>
            <View style={customFormStyles.fieldContainer}>
              <Text style={customFormStyles.label}>{i18n.t('client.form.school_name')}</Text>
              <TextInput
                autoCapitalize="sentences"
                placeholder={i18n.t('client.form.school_name')}
                placeholderTextColor="#b7b3b3"
                returnKeyType="next"
                style={customFormStyles.input}
                underlineColorAndroid="#009999"
                onChangeText={text => this.updateClientState('school_name', text)}
                value={client.school_name}
              />
            </View>
            <View style={customFormStyles.fieldContainer}>
              <Text style={customFormStyles.label}>{i18n.t('client.form.school_grade')}</Text>
              <SectionedMultiSelect
                items={schoolGrades}
                uniqueKey="id"
                modalWithSafeAreaView
                selectText={i18n.t('select_option')}
                searchPlaceholderText={i18n.t('family.search')}
                confirmText={i18n.t('family.confirm')}
                showDropDowns={true}
                single={true}
                hideSearch={false}
                showCancelButton={true}
                styles={{ button: { backgroundColor: MAIN_COLOR }, cancelButton: { width: 150 } }}
                onSelectedItemsChange={itemValue => this.updateClientState('school_grade', itemValue[0])}
                selectedItems={[client.school_grade]}
              />
            </View>
            <View style={customFormStyles.fieldContainer}>
              <Text style={customFormStyles.label}>{i18n.t('client.form.main_school_contact')}</Text>
              <TextInput
                autoCapitalize="sentences"
                placeholder={i18n.t('client.form.main_school_contact')}
                placeholderTextColor="#b7b3b3"
                returnKeyType="next"
                style={customFormStyles.input}
                underlineColorAndroid="#009999"
                onChangeText={text => this.updateClientState('main_school_contact', text)}
                value={client.main_school_contact}
              />
            </View>
            <View style={customFormStyles.fieldContainer}>
              <Text style={[customFormStyles.label, customFormStyles.labelMargin]}>{i18n.t('client.form.has_been_orphanage')}</Text>
              <View style={customFormStyles.row}>
                <CheckBox
                  title="Yes"
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  checkedColor="#009999"
                  style={{ backgroundColor: 'transparent' }}
                  checked={client.has_been_in_orphanage == true ? true : false}
                  onPress={() => this.updateClientState('has_been_in_orphanage', true)}
                />
                <CheckBox
                  title="No"
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  checkedColor="#009999"
                  style={{ backgroundColor: 'transparent' }}
                  checked={client.has_been_in_orphanage == false ? true : false}
                  onPress={() => this.updateClientState('has_been_in_orphanage', false)}
                />
              </View>
            </View>
            <View style={customFormStyles.fieldContainer}>
              <Text style={[customFormStyles.label, customFormStyles.labelMargin]}>{i18n.t('client.form.has_goverment_care')}</Text>
              <View style={customFormStyles.row}>
                <CheckBox
                  title="Yes"
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  checkedColor="#009999"
                  style={{ backgroundColor: 'transparent' }}
                  checked={client.has_been_in_government_care == true ? true : false}
                  onPress={() => this.updateClientState('has_been_in_government_care', true)}
                />
                <CheckBox
                  title="No"
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  checkedColor="#009999"
                  style={{ backgroundColor: 'transparent' }}
                  checked={client.has_been_in_government_care == false ? true : false}
                  onPress={() => this.updateClientState('has_been_in_government_care', false)}
                />
              </View>
            </View>
            <View style={customFormStyles.fieldContainer}>
              <Text style={[customFormStyles.label, customFormStyles.labelMargin]}>{i18n.t('client.form.relevant_referral_information')}</Text>
              <TextInput
                autoCapitalize="sentences"
                placeholder={i18n.t('client.form.relevant_referral_information')}
                placeholderTextColor="#b7b3b3"
                returnKeyType="next"
                style={customFormStyles.inputTextArea}
                underlineColorAndroid="transparent"
                multiline={true}
                textAlignVertical="top"
                numberOfLines={3}
                onChangeText={text => this.updateClientState('relevant_referral_information', text)}
                value={client.relevant_referral_information}
              />
            </View>
            <View style={customFormStyles.fieldContainer}>
              <Text style={[customFormStyles.label, customFormStyles.labelMargin]}>{i18n.t('client.form.case_worker')}</Text>
              <View style={[customFormStyles.pickerContainer, { padding: 0 }]}>{this._renderCaseWorkers()}</View>
            </View>
            <View style={customFormStyles.fieldContainer}>
              <Text style={[customFormStyles.label, customFormStyles.labelMargin]}>{i18n.t('client.form.agencies_involved')}</Text>
              <View style={[customFormStyles.pickerContainer, { padding: 0 }]}>{this._renderAgencies()}</View>
            </View>
            {this._renderQuantitativeTypes()}
          </View>
        </ScrollView>
      </View>
    )
  }
}

const mapState = state => ({
  provinces: state.provinces.data,
  districts: state.districts.data,
  communes: state.communes.data,
  villages: state.villages.data,
  referralSources: state.referralSources.data,
  quantitativeTypes: state.quantitativeTypes.data,
  loading: state.clients.loading
})

export default connect(mapState)(ClientForm)
