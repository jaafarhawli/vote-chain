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

const Login = () => {

  const [code, setCode] = useState('');
  const [id, setId] = useState('');
  const [key, setKey] = useState('');

  const handleSubmit = async () => {
    token = await login(code, id, key);
    await SecureStore.setItemAsync('election1', token);
    let result = await SecureStore.getItemAsync('election1');
    console.log(result);
  }

  return (
    <LinearGradient style={styles.container} colors={[colors.primary[100], colors.white]}>
        <Image source={images.whiteLogoText} style={styles.image} fadeDuration={1000} />
        <MyAppText style={styles.title}>Join Election</MyAppText>
        <View style={styles.inputsContainer}>
            <Input placeholder="Election Code" style={styles.input} onChange={newText => setCode(newText)} />
            <Input placeholder="ID" style={styles.input} onChange={newText => setId(newText)} />
            <Input placeholder="Key" style={styles.input} onChange={newText => setKey(newText)} />
            <CustomizedButton title="Join" onPress={handleSubmit} />
        </View>
    </LinearGradient>
  )
}

export default Login

