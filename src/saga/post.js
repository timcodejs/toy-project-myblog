import { all, delay, fork, put, takeLatest } from 'redux-saga/effects';
import { LOAD_ALLPOSTS_REQUEST, LOAD_ALLPOSTS_SUCCESS, LOAD_ALLPOSTS_FAILURE, createDummyPost, ADD_POST_SUCCESS, ADD_POST_FAILURE, ADD_POST_REQUEST, REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS, REMOVE_POST_FAILURE } from '../reducer/post';

/*
function* LoadPostsAPI(data) {
    return axsios.get("/api/posts", data);
}
*/

function* loadposts(action) {
    try{
        // const result = yield call(LoadPostsAPI, action.data)
        yield delay(1000);
        yield put({
            type: LOAD_ALLPOSTS_SUCCESS,
            data: createDummyPost(10),
        })
    } catch(error) {
        console.log(error);
        yield put({
            type: LOAD_ALLPOSTS_FAILURE,
            data: error.response.data,
        })
    }
}

function* addpost(action) {
    try{
        yield delay(1000);
        yield put({
            type: ADD_POST_SUCCESS,
            data: {
                content: action.data
            }
        })
    } catch(error) {
        console.log(error);
        yield put({
            type: ADD_POST_FAILURE,
            data: error.response.data,
        })
    }
}

function* removepost(action) {
    try{
        yield delay(1000);
        yield put({
            type: REMOVE_POST_SUCCESS,
            data: action.data
        })
    } catch(error) {
        console.log(error);
        yield put({
            type: REMOVE_POST_FAILURE,
            data: error.response.data,
        })
    }
}

function* watchLoadPosts() {
    yield takeLatest(LOAD_ALLPOSTS_REQUEST, loadposts);
}

function* watchAddPosts() {
    yield takeLatest(ADD_POST_REQUEST, addpost);
}

function* watchRemovePosts() {
    yield takeLatest(REMOVE_POST_REQUEST, removepost);
}

export default function* postSaga() {
    yield all([
        fork(watchLoadPosts),
        fork(watchAddPosts),
        fork(watchRemovePosts)
    ])
}