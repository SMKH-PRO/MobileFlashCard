import React, { useState } from 'react'
import { View, Text, Modal, KeyboardAvoidingView,ScrollView } from 'react-native'
import AppBar from './AppBar'
import { SCREEN_HEIGHT,THEME_COLOR,BTN_COLOR } from '../enums/constants'
import { TextInput, Button } from 'react-native-paper'
import { useSelector,useDispatch } from 'react-redux'
import {saveQuestionsToDeck,ShortToast} from '../enums/functions'
const AddNewCardModal = (props) => {
    const [quest, setQuest] = useState("")
    const [ans, setAns] = useState("")
 const decks = useSelector(state => state.decks)
 const dispatch = useDispatch()
 const currentDeck=decks?.[props?.id]
//export const saveQuestionsToDeck = async (dispatch,decks,deckId, questions) => {

 AddCard=()=>{
   let id= currentDeck?.id 

   if(!(quest && quest.length>2)){
         ShortToast("Please write atleast 3 characters in ''Question'' field.")
   }
   else if(!(ans && ans.length>2)){
    ShortToast("Please write atleast 3 characters in ''Answer'' field.")

   }else{
    saveQuestionsToDeck(dispatch,decks,id, {question:quest,answer:ans}) 

    props?.CloseModal()
   } 
 }
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={true}
            onRequestClose={() => {
                props?.CloseModal()
            }}
        >
            <View style={{ backgroundColor: 'white', height:SCREEN_HEIGHT}}>


                <AppBar action={() => props?.CloseModal()} icon="close" title="ADD NEW CARD" />
                <View style={{height:'100%'}}>

                    <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', }} behavior="padding" enabled keyboardVerticalOffset={100}>
                        <ScrollView contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>


                                <Text style={{fontSize:20,textAlign:'center',textTransform:'uppercase',color:THEME_COLOR}}>
                                    Write Question & Answer {"\n"}for Deck "<Text style={{fontWeight:'bold'}}>{currentDeck?.title}</Text>"
                                    {"\n\n"}
                                 </Text>

                                <TextInput
                                     underlineColor={THEME_COLOR}
                                     underlineColorAndroid={THEME_COLOR}
                                     selectionColor={THEME_COLOR}
                                     placeholderTextColor={THEME_COLOR}
                                     
                                    style={{ margin:10,width:'90%'}}
                                    label="Question"
                                    value={quest}
                                    onChangeText={text => setQuest(text)}
                                />
                                <TextInput
                                     underlineColor={THEME_COLOR}
                                     underlineColorAndroid={THEME_COLOR}
                                     selectionColor={THEME_COLOR}
                                     placeholderTextColor={THEME_COLOR}
                                     
                                    style={{ margin:10,width:'90%'}}
                                    label="Answer"
                                    value={ans}
                                    onChangeText={text => setAns(text)}
                                />
                                 <Button onPress={()=>AddCard()} style={{alignSelf:'flex-end',margin:20}}  mode="contained" color={BTN_COLOR} >ADD CARD</Button>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </View>
            </View>
        </Modal>
    )
}

export default AddNewCardModal
