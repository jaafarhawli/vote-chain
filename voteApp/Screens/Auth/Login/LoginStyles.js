import { colors } from '../../../constants';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.black[200],
      alignItems: 'center',
      justifyContent: 'center',
      padding: 40
    },
    title: {
      color: 'white',
      fontSize: 24,
      marginBottom: 20,
      color: colors.white
    },
    image: {
      width: '100%',
      height: 200
    },
    inputsContainer: {
        width: '100%',
    },
    input: {
        marginBottom: 10,
    }
  });