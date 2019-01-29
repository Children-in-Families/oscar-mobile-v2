import { StyleSheet } from 'react-native';

export const editStyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#eee',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    margin: 10,
    borderRadius: 6,
    elevation: 6
  },
  datePicker: {
    width: -1,
    borderColor: '#009999',
    backgroundColor: '#fff'
  },
  datePickerBorder: {
    borderColor: '#009999',
    borderRadius: 2
  },
  datePickerIcon: {
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#009999',
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  picker: {
    height: 45,
    backgroundColor: '#eee',
  },
  inputContainer: {
    paddingLeft: 10,
    paddingRight: 10
  },
  label: {
    color: '#009999',
    fontWeight: 'bold',
    marginTop: 10
  },
  input: {
    height: 40,
  },
  sms: {
    color: '#dedede'
  },
  row: {
    flexDirection: 'row'
  },
  checkbox: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 5
  }
});

export const profileStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDEFF1',
    padding: 20,
    paddingBottom: 0
  },
  contentsContainer: {
    backgroundColor: '#fff'
  },
  aboutFamily: {
    borderRadius: 15,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: '#009999',
    alignItems: 'flex-start',
    padding: 20
  },
  aboutFamilyText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white'
  },
  logoutButton: {
  	backgroundColor: '#d73a49',
  	borderWidth: 0,
  	borderRadius: 0
  },
  buttonTitle: {
  	fontSize: 18,
  	color: '#fff'
  }
});