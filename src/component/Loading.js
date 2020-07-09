import React from 'react'
import { ActivityIndicator,View} from 'react-native'


const a = (props) => (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={props?.size ? props.size : 40} />
    </View>
)


export default a