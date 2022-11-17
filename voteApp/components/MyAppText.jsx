import { StyleSheet, Text } from 'react-native';
import React from 'react'

const MyAppText = (props) => {

  

  return (
    <Text style={[styles.text, props.style]}>{props.children}</Text>
  )
}

export default MyAppText

const styles = StyleSheet.create({
    text: {
        fontFamily: 'AppFontSemi'
    }
})