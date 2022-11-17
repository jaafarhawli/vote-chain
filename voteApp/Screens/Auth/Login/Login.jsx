import React, {useState} from 'react'
import { View, Image } from 'react-native';
import Input from '../../../components/Input';
import { images, colors } from '../../../constants';
import { styles } from './LoginStyles';
import CustomizedButton from '../../../components/button';
import MyAppText from '../../../components/MyAppText';
import { LinearGradient } from 'expo-linear-gradient';
import axios from '../../../api/axios';

const Login = () => {

  const [code, setCode] = useState('');
  const [id, setId] = useState('');
  const [key, setKey] = useState('');

  const handleSubmit = async () => {
    const form = {
      election_code: code,
      voter_id: id,
      voter_key: key
    };
    try {
      const data = await axios.post('auth/login/voter', form);
      console.log(data.data);
    } catch (error) {
      console.log(error);
    }
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

