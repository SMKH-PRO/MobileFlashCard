import { createStore } from 'redux';
import reducer,{initialState} from './reducer'
import { persistStore,  } from 'redux-persist'

 export const  store = createStore(
  reducer,
  initialState  );
 export const persistor = persistStore(store)


// export default store


