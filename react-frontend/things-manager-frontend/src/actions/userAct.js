import {
    USER_UPDATE,
    USER_REMOVE,
} from '../constants/actionTypes';

const doUpdateUser = user => ({
    type: USER_UPDATE,
    user,
});

const doRemoveUser = () => ({
    type: USER_REMOVE,
    user: undefined,
});

export {
    doUpdateUser,
    doRemoveUser,
};