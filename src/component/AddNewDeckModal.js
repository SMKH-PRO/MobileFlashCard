import React, { useState } from 'react'
import { View, Text, Modal, KeyboardAvoidingView,ScrollView } from 'react-native'
import AppBar from './AppBar'
import { SCREEN_HEIGHT,THEME_COLOR,BTN_COLOR } from '../enums/constants'
import { TextInput, Button } from 'react-native-paper'
import { useSelector,useDispatch } from 'react-redux'
import {saveDeckTitle,ShortToast} from '../enums/functions'
const AddNewDeckModal = (props) => {
    const [text, setText] = useState("")
    const dispatch = useDispatch()
    const decks = useSelector(state => state.decks)


    const AddDeck=()=>{

        if(text&&text.length>4){
        saveDeckTitle(dispatch,decks,text)
        props?.CloseModal()
        }else{
            ShortToast("Please write atleast 4 characters in title field.")
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
            <View style={{ backgroundColor: 'white', height: "100%" }}>


                <AppBar action={() => props?.CloseModal()} icon="close" title="ADD NEW CARD" />
                <View style={{height:'100%'}}>

                    <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', }} behavior="padding" enabled keyboardVerticalOffset={100}>
                        <ScrollView contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>


                                <Text style={{fontSize:20,textTransform:'uppercase',fontWeight:'bold',color:THEME_COLOR}}>Write Your Deck's Title</Text>

                                <TextInput
                                     underlineColor={THEME_COLOR}
                                     underlineColorAndroid={THEME_COLOR}
                                     selectionColor={THEME_COLOR}
                                     accessibilityIgnoresInvertColors={THEME_COLOR}
                                     placeholderTextColor={THEME_COLOR}
                                     
                                    style={{ margin:10,width:'90%'}}
                                    label="Title"
                                    value={text}
                                    onChangeText={text => setText(text)}
                                />
                                 <Button onPress={AddDeck} style={{alignSelf:'flex-end',margin:20}}  mode="contained" color={BTN_COLOR} >SUBMIT</Button>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </View>
            </View>
        </Modal>
    )
}

export default AddNewDeckModal
