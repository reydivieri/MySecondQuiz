import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Title from '../components/title'

const Result = ({navigation, route}) => {
  const {score} = route.params

  const resultBanner = score>40?"https://cdni.iconscout.com/illustration/premium/thumb/victory-concept-3300633-2764330.png":"https://cdni.iconscout.com/illustration/premium/thumb/man-holding-white-flag-on-give-up-4539052-3816393.png"
  
  return (
    <View style={styles.container}>
      <Title titleText='Result' />
      <Text style={styles.scoreValue}>{score}</Text>
      <View style={styles.bannerContainer}>
        <Image 
        source={{
          uri:resultBanner,
        }} 
          style={styles.banner}
          resizeMode="contain"
        />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("Home")} style={styles.button}>
          <Text style={styles.buttonText}>Home</Text>
        </TouchableOpacity>
    </View>
  )
}



export default Result

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
  },
  scoreValue:{
    fontSize:24,
    fontWeight:'800',
    alignSelf:'center'
  }
})