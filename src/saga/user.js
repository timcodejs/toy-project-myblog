import { all, delay, fork, takeLatest, put } from 'redux-saga/effects';
import { LOG_IN_FAILURE, LOG_IN_REQUEST, LOG_IN_SUCCESS } from '../reducer/user';

function* login(action) {
    try{
        yield delay(1000);
        yield put({
            type: LOG_IN_SUCCESS,
            data: action.data
        })
    } catch(error) {
        console.log(error);
        yield put({
            type: LOG_IN_FAILURE,
            data: error.response.data,
        })
    }
}

function* watchLogin() {
    yield takeLatest(LOG_IN_REQUEST, login);
}

export default function* userSaga() {
    yield all([
        fork(watchLogin)
    ]);
}