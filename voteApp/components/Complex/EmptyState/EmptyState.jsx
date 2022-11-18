import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { styles } from './EmptyStateStyles'
import CustomizedButton from '../../Reusable/button'

export class EmptyState extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Select an election to view</Text>
        <View style={styles.bodyContainer}>
            <Text style={styles.body}>No elections?</Text>
            <Text style={styles.body}>Add a new one to your list</Text>
        </View>
        <View style={styles.button}>
            <CustomizedButton title={'Join New Election'} />
        </View>
      </View>
    )
  }
}

export default EmptyState