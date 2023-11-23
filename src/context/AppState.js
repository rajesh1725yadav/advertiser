import { useState, useReducer } from "react";
import AppContext from "./AppContext";

const initialState = {
    username : '',
    ntitle : '',
    ndesc:'',
    durl:'',
    nid:'',
    cmp_copy : 0,
    wlt:10
};

const reducer = (state, action) => {
    // let data = action.payload;
    switch (action.type) {
      case "userwlt":
        return {
            ...state,
            username:action.payload.username,
            email:action.payload.email,
            wlt:action.payload.wlt
        }
    case "userinfo":
            return {
                ...state,
                username:action.payload.username,
                email:action.payload.email,
        }
    case "wlt" :
        return {
            ...state,
            wlt:action.wlt
        }
    case "copy" :
        return {
            ...state,
            cmp_copy:action.cmp_copy
        }
    case "notiup" :
        return {
            ...state,
            ntitle:action.ntitle,
            durl:action.durl,
            ndesc:action.ndesc,
            nid:action.nid
        }
      default:
        return state;
    }
  };
  
export default function AppState(props) {

    const [sts, dispatch] = useReducer(reducer, initialState);

    // const [sts, setSts] = useState({
    //     username : '',
    //     ntitle : '',
    //     cmp_copy : 0
    // });
    return (
        <AppContext.Provider value={{sts, dispatch}}>
            {props.children}
        </AppContext.Provider>
    )
}