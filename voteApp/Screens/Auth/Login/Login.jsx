import React, {useState} from 'react'
import { View, Image } from 'react-native';
import Input from '../../../components/Input';
import { images, colors } from '../../../constants';
import { styles } from './LoginStyles';
import CustomizedButton from '../../../components/button';
import MyAppText from '../../../components/MyAppText';
import { LinearGradient } from 'expo-linear-gradient';
import { login } from '../../../api/login';
import * as SecureStore from 'expo-secure-store';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const Login = () => {

  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    token = await login(username, password);
    await SecureStore.setItemAsync('token', token);
    let result = await SecureStore.getItemAsync('token');
    console.log(result);
  }

  return (
    <LinearGradient style={styles.container} colors={[colors.primary[100], colors.white]}>
        <Image source={images.whiteLogoText} style={styles.image} fadeDuration={1000} />
        <MyAppText style={styles.title}>Welcome!</MyAppText>
        <View style={styles.inputsContainer}>
            <Input placeholder="Username" style={styles.input} onChange={newText => setUsername(newText)} />
            <Input placeholder="Password" style={styles.input} secureTextEntry={true} onChange={newText => setPassword(newText)} />
            <CustomizedButton title="Login" onPress={handleSubmit} />
        </View>
        <View style={styles.signupContainer}>
          <MyAppText>Dont have an account? </MyAppText>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <MyAppText style={styles.signup}>Signup</MyAppText>  
          </TouchableOpacity>
        </View>
    </LinearGradient>
  )
}

export default Login

