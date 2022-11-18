import { Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { colors } from '../../constants'
import MyAppText from './MyAppText'

const ElectionCard = (props) => {
  return (
    <Pressable style={styles.container} onPress={props.onPress}>
      <MyAppText style={styles.title}>{props.title}</MyAppText>
    </Pressable>
  )
}

export default ElectionCard

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        width: '100%',
        justifyContent: 'center',
        padding: 15
    },
    title: {
        color: colors.white,
        fontSize: 18
    }
})