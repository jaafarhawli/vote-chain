import { StyleSheet } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import React from 'react'

const Input = (props) => {
  return (
      <TextInput style={styles.input} placeholder={props.placeholder} />
  )
}

export default Input

const styles = StyleSheet.create({
    input : {
        backgroundColor: 'white',
        width: '100%',
        fontSize: 18,
        padding: 8,
        borderRadius: 5
    }
})