import { StyleSheet } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import {colors} from '../constants';

import React from 'react'

const input = (props) => {

  return (
      <TextInput style={[styles.input, props.style]} placeholder={props.placeholder} selectionColor={colors.primary[100]} />
  )
}

export default input

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