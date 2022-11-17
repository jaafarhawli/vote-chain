import { Button, Pressable, StyleSheet, Text } from 'react-native'
import React from 'react'
import { colors } from '../constants'

const button = (props) => {
  return (
    <Pressable style={[styles.button, props.styles]}>
        <Text style={[styles.text, props.textStyle]}>{props.title}</Text>
    </Pressable>
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
        fontWeight: 'bold',
        textTransform: 'uppercase',
    }
})