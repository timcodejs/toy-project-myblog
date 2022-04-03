import { all, delay, fork, takeLatest, put } from 'redux-saga/effects';
import { LOG_IN_FAILURE, LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_OUT_FAILURE, LOG_OUT_REQUEST, LOG_OUT_SUCCESS } from '../reducer/user';

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

function* logout(action) {
    try{
        yield delay(1000);
        yield put({
            type: LOG_OUT_SUCCESS
        })
    } catch(error) {
        console.log(error);
        yield put({
            type: LOG_OUT_FAILURE,
            data: error.response.data,
        })
    }
}

function* watchLogin() {
    yield takeLatest(LOG_IN_REQUEST, login);
}

function* watchLogout() {
    yield takeLatest(LOG_OUT_REQUEST, logout);
}

export default function* userSaga() {
    yield all([
        fork(watchLogin),
        fork(watchLogout)
    ]);
}