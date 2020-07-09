import {TYPES} from './actions'
import {  persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage';

const persistConfig = {
    key: 'root',
    storage:AsyncStorage,
  }
export const initialState = {
    decks:null,
    loading:false
  };
  

const  reducer=(state=initialState, action)=> {
    switch (action.type) {
      case TYPES.SETSTATE:
        return Object.assign({}, state, {
            ...action.payload 
          })
          
    
      default:
        return state;
    }
  }

  export default persistReducer(persistConfig, reducer) ;

  // export default reducer