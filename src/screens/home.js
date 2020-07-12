import React, { useEffect,useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import AppBar from '../component/AppBar'
import { loadDecks } from '../enums/functions'
import { WINDOW_HEIGHT,THEME_COLOR,BTN_COLOR } from '../enums/constants'

import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux'
import { List,FAB } from 'react-native-paper';
import AddDeckModal from '../component/AddNewDeckModal'
const home = (props) => {
    //const navigation = useNavigation();
    const dispatch = useDispatch()
    const state = useSelector(state => state)
    const decks = useSelector(state => state.decks)
    const loading = useSelector(state => state.loading)
    const [ModalVisible, setModalVisible] = useState(false)


    useEffect(() => {
        if (!decks) {//load initial data if not available
            loadDecks(dispatch)
        }
    }, [])
    const decksArray = Array.isArray(decks && Object.values(decks)) && Object.values(decks)
    const isLoading = loading || !decks

    console.log(decks)
    return (

        <View style={{height:WINDOW_HEIGHT-30}} >
            <AppBar action={() => props?.navigation?.toggleDrawer()} icon="menu" title="MFC - Home" />
          

            <ScrollView>
                {
                    decksArray && decksArray.map((d, i) => {
                        const length = d?.questions?.length
                        const numOfCards = length > 0 ? length : 0

                        return (
                            <TouchableOpacity
                                key={i}
                                onPress={() => props.navigation.navigate("Deck", { id: d.id })}
                            >
                                <List.Item
                                    title={d.title}
                                    description={numOfCards < 1 ? 'NO CARDS ADDED' : `${numOfCards} ${numOfCards > 1 ? 'CARDS' : 'CARD'}`}
                                    left={props => <List.Icon {...props} icon="folder" />}
                                />
                            </TouchableOpacity>
                        )
                    })
                }
              
            </ScrollView>

            {ModalVisible&&<AddDeckModal CloseModal={()=>setModalVisible(false)} />}

            <FAB
                
                style={{ position: 'absolute', margin: 16, right: 5, bottom: 0,backgroundColor:BTN_COLOR}}
                small
                icon="plus"
                onPress={() => setModalVisible(true)}
            />
        </View>

    )
}

export default home
