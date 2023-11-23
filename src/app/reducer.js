// import React, {  useReducer } from "react";



function reducer(state, action) {
  switch (action.type) {
    case 'adtype':
      return { adtype: action.payload.adtype};
    case 'adfor':
      return { adfor: action.payload.adfor};
    default:
      throw new Error();
  }

}