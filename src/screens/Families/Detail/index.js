import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, ScrollView } from 'react-native'
import Menu from '../../Clients/Detail/Menu'
import Card from '../../../components/Card'
import Field from '../../../components/Field'
import Button from 'apsl-react-native-button'
import { Navigation } from 'react-native-navigation'
import { pushScreen } from '../../../navigation/config'
import i18n from '../../../i18n'
import appIcon from '../../../utils/Icon'
import styles from '../../Clients/Detail/styles'
import moment from 'moment'

class FamilyDetail extends Component {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
  }

  async navigationButtonPressed({ buttonId }) {
    if (buttonId === 'EDIT_FAMILY') {
      const { family } = this.props
      const icons = await appIcon()
      pushScreen(this.props.componentId, {
        screen: 'oscar.editFamily',
        title: 'EDIT FAMILY',
        props: {
          family,
          familyDetailComponentId: this.props.componentId
        },
        rightButtons: [
          {
            id: 'SAVE_FAMILY',
            icon: icons.save,
            color: '#fff'
          }
        ]
      })
    }
  }

  navigateToAdditionalForms = family => {
    pushScreen(this.props.componentId, {
      screen: 'oscar.additionalForms',
      title: 'Additional Form',
      props: {
        entityId: family.id,
        type: 'family'
      }
    })
  }

  navigateToAddForms = family => {
    pushScreen(this.props.componentId, {
      screen: 'oscar.addForms',
      title: 'Add Form',
      props: {
        entityId: family.id,
        entityDetailComponentId: this.props.componentId,
        type: 'family'
      }
    })
  }

  render() {
    const { family } = this.props
    const memberCount = family.female_children_count + family.male_children_count + family.female_adult_count + family.male_adult_count

    return (
      <View style={{ flex: 1, backgroundColor: '#EDEFF1' }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.widgetContainer}>
            <View style={styles.widgetRow}>
              <Menu
                title={i18n.t('family.additional_form')}
                value={family.additional_form.length}
                color="#1c84c6"
                onPress={() => this.navigateToAdditionalForms(family)}
                disabled={family.additional_form.length == 0}
              />
              <Menu
                title={i18n.t('family.add_form')}
                value={family.add_forms.length}
                color="#1c84c6"
                onPress={() => this.navigateToAddForms(family)}
              />
            </View>
          </View>
          <Card style={{ paddingTop: 30, paddingLeft: 20, paddingRight: 20 }} title={i18n.t('family.about_family')}>
            <Field name={i18n.t('family.code')} value={family.code} />
            <Field name={i18n.t('family.family_type')} value={family.family_type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())} />
            <Field name={i18n.t('family.status')} value={family.status} />
            <Field name={i18n.t('family.case_history')} value={family.case_history} />
            <Field name={i18n.t('family.address')} value={family.address} />
            <Field name={i18n.t('family.member_count')} value={`${memberCount} People` || '0'} />
            <Field name={i18n.t('family.caregiver_information')} value={family.caregiver_information} />
            <Field name={i18n.t('family.significant_family_member_count')} value={family.significant_family_member_count} />
            <Field name={i18n.t('family.household_income')} value={`$${parseFloat(family.household_income).toFixed(2)}`} />
            <Field name={i18n.t('family.dependable_income')} value={family.dependable_income == false ? i18n.t('family.no') : i18n.t('family.yes')} />
            <Field name={i18n.t('family.female_children_count')} value={family.female_children_count} />
            <Field name={i18n.t('family.male_children_count')} value={family.male_children_count} />
            <Field name={i18n.t('family.female_adult_count')} value={family.female_adult_count} />
            <Field name={i18n.t('family.male_adult_count')} value={family.male_adult_count} />
            <Field name={i18n.t('family.contract_date')} value={moment(family.contract_date).format('DD MMMM, YYYY')} />
            <Field name={i18n.t('family.province')} value={family.province != null ? family.province.name : ''} />
            <Field name={i18n.t('family.district')} value={family.district != null ? family.district.name : ''} />
            <Field name={i18n.t('family.commune')} value={family.commune != null ? `${family.commune.name_kh} / ${family.commune.name_en}` : ''} />
            <Field name={i18n.t('family.village')} value={family.village != null ? `${family.village.name_kh} / ${family.village.name_en}` : ''} />
          </Card>
        </ScrollView>
      </View>
    )
  }
}

const mapState = (state, ownProps) => ({
  family: state.families.data[ownProps.familyId]
})

export default connect(mapState)(FamilyDetail)
