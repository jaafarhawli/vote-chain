import { Button, Pressable, StyleSheet, Text, TouchableHighlight, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors } from '../constants'
import MyAppText from './MyAppText'

const button = (props) => {
  return (
    <TouchableOpacity style={[styles.button, props.styles]} activeOpacity={0.6} onPress={props.onPress}>
        <MyAppText style={[styles.text, props.textStyle]}>{props.title}</MyAppText>
    </TouchableOpacity>
  )
}

export default button

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.secondary,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
    },
    text: {
        color: colors.white,
        textTransform: 'uppercase',
        fontFamily: 'AppFontBold'
    }
})