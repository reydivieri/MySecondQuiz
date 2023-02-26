import { Image, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Title from '../components/title'

const Home = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Title titleText='QuizRi' />
      <View style={styles.bannerContainer}>
        <Image 
        source={{
          uri:'https://cdni.iconscout.com/illustration/premium/thumb/online-question-answer-5651149-4714812.png'
        }} 
          style={styles.banner}
          resizeMode="contain"
        />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("Quiz")} 
        style={styles.button}>
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  banner:{
    height:300,
    width:300,
  },
  bannerContainer:{
    justifyContent:'center',
    alignItems:'center',
    flex:1,
  },
  container:{
    paddingTop: 40,
    paddingHorizontal:20,
    height:'100%'
  },
  button:{
    width:'100%',
    backgroundColor:'#0077b6',
    padding:12,
    borderRadius:16,
    marginBottom:40,
    alignItems:'center'
  },
  buttonText:{
    fontSize:24,
    fontWeight:'600',
    color:'white',
  }
})