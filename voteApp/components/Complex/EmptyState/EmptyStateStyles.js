import { colors } from '../../../constants';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 40,
      height: '100%'
    },
    header: {
        fontFamily: 'AppFontBold',
        fontSize: 24,
    },
    bodyContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    body: {
        fontSize: 16,
        fontFamily: 'AppFont',
    },
    button: {
        marginTop: 20
    }
  });