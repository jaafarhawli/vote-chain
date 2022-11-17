import { StyleSheet } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import {colors} from '../constants';

import React from 'react'

const Input = (props) => {

  return (
      <TextInput style={[styles.input, props.style]} placeholder={props.placeholder} selectionColor={colors.primary[100]} onChangeText={props.onChange} secureTextEntry={props.secureTextEntry} />
  )
}

export default Input

const styles = StyleSheet.create({
    input : {
        backgroundColor: 'white',
        width: '100%',
        fontSize: 18,
        padding: 8,
        borderRadius: 5,
        fontFamily: 'AppFont'
    }
})