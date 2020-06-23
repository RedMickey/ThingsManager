import { USER_UPDATE, USER_REMOVE } from '../constants/actionTypes';

/*const INITIAL_STATE = [
    {
        id: 0,
        email: 'mail@mail.ru',
        name: 'Jordan',
    },
];*/

const INITIAL_STATE = [];

const applyUser = (state, action) => {
    /*let userIndex = state.findIndex((user => user.userEmail === action.user.userEmail));
    let newState = [ ...state ];
    
    if (userIndex < 0) {
        newState.push(action.user);
    } else {
        newState[userIndex] = action.user;
    }*/

    let newState = [];
    newState.push(action.user);

    return newState;
};

function userReducer(state = INITIAL_STATE, action) {
    switch(action.type) {
        case USER_UPDATE: {
            return applyUser(state, action);
        }
        case USER_REMOVE: 
            return [];
        default : return state;
    }
}

export default userReducer;