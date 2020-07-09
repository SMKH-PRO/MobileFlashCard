import React  from 'react'
import { Appbar} from 'react-native-paper';
import {StatusBar ,View} from 'react-native'
import {THEME_COLOR} from '../enums/constants'
//import * as RNIap from 'react-native-iap';



const hex2=(c)=> {
  c = Math.round(c);
  if (c < 0) c = 0;
  if (c > 255) c = 255;

  var s = c.toString(16);
  if (s.length < 2) s = "0" + s;

  return s;
}

const color=(r, g, b)=>{ 
  return "#" + hex2(r) + hex2(g) + hex2(b);
}

const shade=(col, light)=>{ //Provide dark color for statusbar considering the current theme color.

  // TODO: Assert that col is good and that -1 < light < 1

  var r = parseInt(col.substr(1, 2), 16);
  var g = parseInt(col.substr(3, 2), 16);
  var b = parseInt(col.substr(5, 2), 16);

  if (light < 0) {
      r = (1 + light) * r;
      g = (1 + light) * g;
      b = (1 + light) * b;
  } else {
      r = (1 - light) * r + light * 255;
      g = (1 - light) * g + light * 255;
      b = (1 - light) * b + light * 255;
  }

  return color(r, g, b);
}

const AppBarWithDrawer =(props)=> {
  
    
 

    const {BackgroundColor}=props
   // shade(RandomColor, -0.731)

   let BG_COLOR= BackgroundColor?BackgroundColor:THEME_COLOR //If has background color in prop use it else use theme's color.
    return (
<View>
          <StatusBar animated={true} barStyle="light-content" backgroundColor={shade(BG_COLOR, -0.3)} />
    
          <Appbar.Header  style={{backgroundColor:BG_COLOR}}>
              {props.action?<Appbar.Action icon={props.icon} onPress={()=> props.action()} />:<Appbar.Action  icon={props.icon?props.icon:'menu'}/>}

       
        <Appbar.Content
          title={props.title?props.title:'Mobile FlashCards'} //Default title is 8bpcm (in-case no title was given in props)
        />
       
      </Appbar.Header>     
      </View>
      

 
    )
  
}
export default AppBarWithDrawer