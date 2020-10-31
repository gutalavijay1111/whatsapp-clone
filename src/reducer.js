export const initialState = {
    user: null,
}

export const actionTypes ={
    SET_USER : "SET_USER",
};

export const reducer = (state, action) => {
    console.log(action);

    switch(action.type) {   // Action -> type, [payload]
        case 'SET_USER':    // if action type is SET_USER, then do this.
            return {        // we are returning new state here.
                ...state,
                user: action.user,   // by using '...' we are not overriding the previous state
            };

        default:
            return state    
    }

}



