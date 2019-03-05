import React, { Component } from 'react'
import { View, Text, ScrollView, ListView, StyleSheet, FlatList } from 'react-native'
import { List, ListItem } from 'react-native-elements'
import { Navigation } from 'react-native-navigation'
import { pushScreen } from '../../navigation/config'
import { connect } from 'react-redux'
import appIcon from '../../utils/Icon'

class AddForm extends Component {
  async createCustomForm(customForm) {
    const icons = await appIcon()
    pushScreen(this.props.componentId, {
      screen: 'oscar.createCustomForm',
      title: customForm.form_title,
      props: {
        entity: this.props.entity,
        customForm: customForm,
        formType: 'customForm',
        entityDetailComponentId: this.props.entityDetailComponentId,
        type: this.props.type,
        alertMessage: this.props.alertMessage
      },
      rightButtons: [
        {
          id: 'SAVE_CUSTOM_FORM',
          icon: icons.save,
          color: '#fff'
        }
      ]
    })
  }

  renderAddForm(customForm) {
    return (
      <ListItem
        key={customForm.id}
        title={customForm.form_title == ' ' ? '(unknow)' : customForm.form_title}
        onPress={() => this.createCustomForm(customForm)}
      />
    )
  }

  renderItem = ({ item }) => (
    <ListItem key={item.id} title={item.form_title == ' ' ? '(unknow)' : item.form_title} onPress={() => this.createCustomForm(item)} />
  )

  keyExtractor = (item, index) => item.id.toString()

  render() {
    const { entity } = this.props
    return (
      <ScrollView showsVerticalScrollIndicator={false} style={styles.mainContainer}>
        {entity.add_forms.length > 0 ? (
          <View style={styles.container}>
            <FlatList data={entity.add_forms} keyExtractor={this.keyExtractor} renderItem={this.renderItem} />
          </View>
        ) : (
          <View style={styles.noDataContainer}>
            <Text style={styles.noDataText}>No Data</Text>
          </View>
        )}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  noDataContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20
  },
  noDataText: {
    fontSize: 20,
    color: '#c52f24'
  }
})

const mapState = (state, ownProps) => {
  const entity = ownProps.type == 'client' ? state.clients.data[ownProps.entityId] : state.families.data[ownProps.entityId]
  return { entity }
}
export default connect(mapState)(AddForm)
