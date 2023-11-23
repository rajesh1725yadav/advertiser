export const AppReducer = (state, action) => {
    if(action.type == 'setAuthKey') {
        // let authkey = state
        return {
            ...state,
            authkey : action.authkey
        }
    } else if(action.type == 'deleteAuth') {
        return {
            ...state,
            authkey: ''
        }
    }
}