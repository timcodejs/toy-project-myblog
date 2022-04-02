import produce from 'immer';

const initialState = {
    info: null,
    loginLoading: false,
    loginDone: false,
    loginError: null,
}

const dummyUser = (data) => ({
    ...data,
    nickname: "태원님",
    id: 1,
    Posts: [{
        id: 1
    }],
});

export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";

const reducer = (state=initialState, action) => 
    produce(state, (draft) => {
        switch(action.type) {
            case LOG_IN_REQUEST:
                draft.loginLoading = true;
                draft.loginDone = false;
                draft.loginError = null;
                break;

            case LOG_IN_SUCCESS:
                draft.loginLoading = false;
                draft.loginDone = true;
                draft.info = dummyUser(action.data);
                break;

            case LOG_IN_FAILURE:
                draft.loginLoading = false;
                draft.loginDone = false;
                draft.loginError = action.error;
                break;

            default:
                return state;
        }
    });


export default reducer;