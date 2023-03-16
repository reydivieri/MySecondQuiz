import { StyleSheet, Text, View } from 'react-native'
import React, {useEffect, useState} from 'react'
import { Image } from 'react-native/Libraries/Image/Image'
import { StatusBar } from 'react-native/Libraries/Components/StatusBar/StatusBar';
import { TextInput } from 'react-native/Libraries/Components/TextInput/TextInput';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  return (
    <View style={styles.container}>
        <StatusBar style={styles.statusBar} />
        <View style={styles.parent}>
            <Text>Login</Text>
            <Image 
            source={{
                uri:'https://cdni.iconscout.com/illustration/premium/thumb/login-4489776-3757211.png?'
            }} 
                style={styles.banner}
                resizeMode="contain"
            />
            <Text style={styles.judul}>QuizRi</Text>
            <Text style={styles.judul}></Text>
        </View>
      <TextInput value={email} placeholder='Masukkan Email' onChangeText={text => setEmail(text)} style={styles.emailInput}></TextInput>

    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  emailInput : {
    backgroundColor : '#219ebc',
    marginHorizontal : '20',
  },
  parent : {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#219ebc',
    width : 50,
    borderBottomLeftRadius : 15,
    borderTopLeftRadius : 50,
    elevation : 5,
  },
  banner: {
    width : 100,
    height : 100,
  },
  container : {
    backgroundColor : '219ebc',
    
  }

})