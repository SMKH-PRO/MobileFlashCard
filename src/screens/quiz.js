import React, { useState, useRef } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import FlipCard from 'react-native-flip-card'
import { THEME_COLOR, BTN_COLOR, SCREEN_HEIGHT, WINDOW_HEIGHT } from '../enums/constants'
import {ShortToast} from '../enums/functions'
import { FAB, Button } from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux'


const quiz = (props) => {
    const decks = useSelector(state => state.decks)
    const [Index, setIndex] = useState(0)
    const [isCompleted, setCompleted] = useState(false)
    const [scorePercent, setScore] = useState(0)


    const [Answers, setAnswer] = useState([])
    const CardRef = useRef(null)
    const id = props?.route?.params?.id
    const deck = decks?.[id]
    const questions = deck?.questions
    const selectedQuestion = questions[Index]
    const QuestLeft = questions?.length - Answers?.length
    let ResetQuiz=()=>{
         setCompleted(false)
         setScore(0)
         setIndex(0)
         setAnswer([])
         ShortToast("Quiz Reset Succesfull .")
    }
    let Answer = (Agreed) => {
        let TotalQuest = questions?.length - 1
        if (Index !== TotalQuest) {
            Answers.push({ Index, Agreed })
            setIndex(Index + 1)
        } else {
            if (Index == TotalQuest) {
                Answers.push({ Index, Agreed })
                CalculateScore()

            }
        }

    }
    let CalculateScore=()=>{
       let TotalAnswers = Answers?.length
       let CorrectAnswers = Answers?.filter(d=>d.Agreed)?.length
       let ScoredPercent =CorrectAnswers!==0? Math.round(parseFloat( (CorrectAnswers/TotalAnswers)*100 )):0
       //alert(`${CorrectAnswers}/100 * ${TotalAnswers} = ${ScoredPercent}`)

       setScore(ScoredPercent)
       setCompleted(true)


    }

    console.log(CardRef)

    return (
        <View style={{ padding: 10, height: "100%" }}>
            {!isCompleted ? (
                <View style={{ height: '100%' }}>
                    <FlipCard
                        ref={CardRef}

                        clickable={true}
                        style={{ margin: 10, marginTop: 30, maxHeight: CardStyle.height }}
                    >
                        {/* Face Side */}
                        <View style={{
                            backgroundColor: THEME_COLOR, ...CardStyle,
                            borderBottomRightRadius: 100,
                            borderTopLeftRadius: 100,
                        }} >
                            <Text style={FontStyle}>{selectedQuestion?.question}</Text>
                        </View>
                        {/* Back Side */}
                        <View style={{
                            backgroundColor: BTN_COLOR, ...CardStyle,
                            borderBottomLeftRadius: 100,
                            borderTopRightRadius: 100,
                        }} >
                            <Text style={FontStyle}>{selectedQuestion?.answer}</Text>
                        </View>
                    </FlipCard>
                    <Text style={{ textAlign: 'center', margin: 20, fontSize: 16 }}>{QuestLeft} {QuestLeft > 1 ? "Questions" : "Question"} Left.</Text>
                    <View style={{ justifyContent: 'space-around', flexDirection: 'row' }}>
                        <FAB
                            style={{ ...fab, backgroundColor: THEME_COLOR }}

                            icon="thumb-down"
                            onPress={() => Answer(false)}
                            color="white"
                        />
                        <FAB
                            style={{ height: 40 }}
                            small
                            icon="reload"
                            onPress={() =>ResetQuiz()}
                            color="white"
                        />
                        <FAB
                            style={{ ...fab, backgroundColor: '#0F9D58' }}

                            icon="thumb-up"

                            onPress={() => Answer(true)}
                            color="white"
                        />
                    </View>
                </View>
            ) : (
                    <View style={{alignItems:'center',justifyContent:'center',height:"100%"}}>

                       <Text style={{fontSize:26,fontWeight:'bold',color:THEME_COLOR}}>QUIZ COMPLETED !</Text>
                       <Text style={{fontSize:17}}>You Answered <Text style={{color:'green'}}>{scorePercent}%</Text> Correct</Text>
                       <Button onPress={ResetQuiz} style={{margin:10,marginTop:40}} mode="contained" color={THEME_COLOR}>RESET QUIZ</Button>
                       <Button onPress={()=>props?.navigation?.goBack()} mode="text" color={THEME_COLOR}>BACK TO DECK</Button>

                      </View>
                )}

        </View>
    )
}

export default quiz



const CardStyle = {
    padding: 15,

    height: SCREEN_HEIGHT / 1.9,
    justifyContent: 'center',
    alignItems: 'center',
    dropShadow: '0px 0px 5px black',
    elevation: 10,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 5
}
const fab = {
    width: 80,
    height: 80,
    borderRadius: 100,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',

}
const FontStyle = { color: 'white', fontSize: 30, fontWeight: 'bold', textAlign: 'center' }
