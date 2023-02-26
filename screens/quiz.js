import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'

const shuffleArray=(array)=> {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
}

const Quiz = ({navigation}) => {
  const [questions, setQuestions] = useState();
  const [quest, setQuest] = useState(0);
  const[options, setOptions] = useState([]);
  const[score, setScore] = useState(0);
  const[loading, setLoading] = useState(false);
  const [counter, setCounter] = useState(15);
  const [index, setIndex] = useState(0);

  let interval = null
  
  const getQuiz = async () => {
    setLoading(true);
    const url = 'https://opentdb.com/api.php?amount=10&category=31&type=multiple&encode=url3986';
    const res = await fetch(url);
    const data = await res.json();
    setQuestions(data.results);
    setOptions(generateOptionsAndShuffle(data.results[0]))
    setLoading(false)
  }
  useEffect(() => {
    getQuiz();
  }, [])

  useEffect(() => {
    const myInterval = () => {
      if (counter >= 1) {
        setCounter((state) => state - 1);
      }
      if (counter === 0) {
        handleNextPress()
      }
    };

    interval = setTimeout(myInterval, 1000);

    // clean up
    return () => {
      clearTimeout(interval);
    };
  }, [counter]);

   const handleNextPress=()=>{
      if(quest===9){
        handleShowResults()
      }
      if(quest!==9){
        setIndex(index+1)
        setQuest(quest+1)
        setOptions(generateOptionsAndShuffle(questions[quest+1]))
        setCounter(15);
      }
   }

   const generateOptionsAndShuffle=(_question)=>{
    const options = [..._question.incorrect_answers]
    options.push(_question.correct_answer)
    shuffleArray(options)
    
    return options
   }

   const handleSelectedOptions=(_options)=>{
    if (_options===questions[quest].correct_answer){
      setScore(score+10)
    }
    if(quest!==9){
      setIndex(index+1)
      setQuest(quest+1)
      setOptions(generateOptionsAndShuffle(questions[quest+1]))
    }
    if(quest===9){
      handleShowResults()
    }
   }

   const handleShowResults=()=>{
    clearTimeout(interval)
    navigation.navigate('Result',{
      score: score
    }
    )
   }

   useEffect(() => {
    if (!interval) {
      setCounter(15);
    }
  }, [index]);

  return (
    <View style={styles.container}>
      {loading ? <View style={styles.loadScreen}>
        <Text style={styles.loadText}>LOADING...</Text>
      </View> : questions && (
        <View style={styles.parent}>
      <View style={styles.counter}>
        <CountdownCircleTimer
          size={50}
          duration={counter}
          colors={['#004777', '#F7B801', '#A30000', '#A30000']}
          colorsTime={[15, 9, 5, 1]}
        >
          {({ remainingTime }) => <Text>{remainingTime}</Text>}
        </CountdownCircleTimer>
      </View>
      <View style={styles.question}> 
        <Text style={styles.questionText}>Q. {decodeURIComponent(questions[quest].question)}</Text>
      </View>
      <View style={styles.options}>
        <TouchableOpacity style={styles.optionsButton} onPress={()=> handleSelectedOptions(options[0])}>
          <Text style={styles.optionsText}>{decodeURIComponent(options[0])}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionsButton} onPress={()=> handleSelectedOptions(options[1])}>
          <Text style={styles.optionsText}>{decodeURIComponent(options[1])}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionsButton} onPress={()=> handleSelectedOptions(options[2])}>
          <Text style={styles.optionsText}>{decodeURIComponent(options[2])}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionsButton} onPress={()=> handleSelectedOptions(options[3])}>
          <Text style={styles.optionsText}>{decodeURIComponent(options[3])}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.button}>
      <TouchableOpacity style={styles.ton}>
          <Text style={styles.tonText}>??</Text>
        </TouchableOpacity>

          {quest!==9 && <TouchableOpacity style={styles.ton} onPress={handleNextPress} >
          <Text style={styles.tonText}>Skip</Text>
        </TouchableOpacity>}

        {quest===9 && <TouchableOpacity style={styles.ton} onPress={handleShowResults} >
          <Text style={styles.tonText}>Show Results</Text>
        </TouchableOpacity>}

        
        {/* <TouchableOpacity onPress={() => navigation.navigate("Result")}>
          <Text>END</Text>
        </TouchableOpacity> */}
      </View>
      </View>
      )}
    </View>
    
  )
}

export default Quiz

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal:20,
    height:'100%'
  },
  question:{
    marginVertical:10,
  },
  options:{
    marginVertical:12,
    flex:1,
  },
  button:{
    marginBottom:12,
    paddingVertical:16,
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  ton:{
    backgroundColor:'#0077b6',
    padding:14,
    borderRadius:16,
    marginBottom:20,
    alignItems:'center',
    paddingHorizontal:18
  },
  tonText:{
    fontSize:18,
    fontWeight:'600',
    color:'white',
  },
  questionText:{
    fontSize:28,
  },
  optionsText:{
    fontSize: 18,
    fontWeight:'800',
    color:'white'
  },
  optionsButton:{
    paddingVertical: 8,
    marginVertical: 6,
    paddingHorizontal:12,
    backgroundColor:'#168aad'
  },
  parent:{
    height:'100%'
  },
  loadScreen:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    height:'100%'
  },
  loadText:{
    fontSize:36,
    fontWeight: 800,
  },
  counter:{
    top:0,
    right:0,
    padding:10,
    alignSelf: 'flex-end',
    marginTop: -5,
  }
})