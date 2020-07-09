import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { LongToast } from '../enums/w'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../enums/constants'
import { Button } from 'react-native-paper';
import {BTN_COLOR} from '../enums/constants'
import {removeDeck} from '../enums/functions'
import AddNewCardModal from '../component/AddNewCardModal'

const Deck = (props) => {
    const decks = useSelector(state => state.decks);
    const id = props?.route?.params?.id
    const dispatch = useDispatch();
    const [Deck, setDeck] = useState(null)
    const [ModalVisible, setModalVisible] = useState(false)
    useEffect(() => {
        getData()
    }, [id])
  const getData=()=>{

    if (id) {
        let selectedDeck = decks[id]
        if (selectedDeck) {
            setDeck(selectedDeck)
        } else {
            LongToast("An unknown error occured! \n 404 Deck Not Found.")
            props.navigation.goBack()
        }
    }
  }

   const RemoveDeck=()=>{

      removeDeck(dispatch,decks,id)
      props?.navigation?.goBack()
      

    }
    const NumOfQuests = Deck?.questions?.length

    return (

        Deck ? (
            <View style={{ justifyContent: 'center', alignItems: 'center', height: SCREEN_HEIGHT - 100 }}>

                <View>
                    <Text style={{ fontWeight: 'bold', fontSize: 30, textAlign: 'center',margin:10}}>
                        {Deck?.title}
                    </Text>
                    <Text style={{ textAlign: 'center' }}>{NumOfQuests>0&&NumOfQuests} {NumOfQuests<1?"NO CARDS ADDED YET.":NumOfQuests>1?"CARDS AVAILABLE":"CARD AVAILABLE"}  </Text>
                    {NumOfQuests>0&&
                    <Button onPress={()=>props.navigation.navigate("Quiz",{id})} color={BTN_COLOR} style={{marginTop:10}} mode="contained">
                        START QUIZ
                    </Button>}
                    <Button style={{marginTop:10}}  icon="plus" mode="outlined" onPress={() => setModalVisible(true)}>
                         ADD NEW CARD
                    </Button>
                    <Button color="red" style={{marginTop:10}} 
                            icon="delete" mode="text" onPress={() =>RemoveDeck()}>
                         DELTE THIS DECK
                    </Button>
                </View>
              {ModalVisible&&<AddNewCardModal id={id} CloseModal={()=>{setModalVisible(false);getData()}}/>}
            </View>
        ) : (

                <Text style={{textAlign:'center',margin:30}}>Loading....</Text>
            )


    )
}

export default Deck
