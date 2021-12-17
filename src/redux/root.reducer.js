import { combineReducers } from "redux";
// import { persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";

import postcartReducer from "./postcart/postcart.reducers";
import userReducer from "./user/user.reducer";

// const persistConfig={
//     key:'root',
//     storage,
//     whitelist:['cart']
// }

const rootReducer= combineReducers({
    user:userReducer,
    postcart:postcartReducer,
});

// export default persistReducer(persistConfig,rootReducer);
export default rootReducer;