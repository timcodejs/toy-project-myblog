import produce from 'immer';
import faker from '@faker-js/faker';
import shortId from 'shortid';

const initiallState = {
    allPosts: [
        {
            id: 1,
            User: {
                id: 1,
                nickname: "이태원"
            },
            content: "이태원님 안녕하세요",
            Comments: [
                {
                    id: shortId.generate(),
                    User: {
                        id: shortId.generate(),
                        nickname: "손흥민"
                    },
                    content: "뭐야 짭이네.."
                }
            ]
        }
    ],
    allpostsLoding: false,
    allpostsDone: false,
    allpostsError: null,
    addpostLoading: false,
    addpostDone: false,
    addpostError: null,
    removepostLoading: false,
    removepostDone: false,
    removepostError: null,
}

// 게시글, 댓글 불러오기
export const LOAD_ALLPOSTS_REQUEST = "LOAD_ALLPOSTS_REQUEST";
export const LOAD_ALLPOSTS_SUCCESS = "LOAD_ALLPOSTS_SUCCESS";
export const LOAD_ALLPOSTS_FAILURE = "LOAD_ALLPOSTS_FAILURE";

// 게시글 등록하기
export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";

// 게시글 삭제하기
export const REMOVE_POST_REQUEST = "REMOVE_POST_REQUEST";
export const REMOVE_POST_SUCCESS = "REMOVE_POST_SUCCESS";
export const REMOVE_POST_FAILURE = "REMOVE_POST_FAILURE";

// 더미데이터
export const createDummyPost = (number) => 
    Array(number).fill().map(() => ({
        id: shortId.generate(),
        User: {
            id: shortId.generate(),
            nickname: faker.name.findName(),
        },
        content: faker.lorem.paragraph(),
        Comments: [
            {
                id: shortId.generate(),
                User: {
                    id: shortId.generate(),
                    nickname: faker.name.findName()
                },
                content: faker.lorem.sentence(),
            }
        ]
    }));

// 더미데이터
const dummyPost = (data) => ({
    id: shortId.generate(),
    content: data.content,
    User: {
        id: 1,
        nickname: "이태원"
    },
    Comments: [],
});

const reducer = (state=initiallState, action) => {
    return produce(state, (draft) => {
        switch(action.type) {
            case LOAD_ALLPOSTS_REQUEST:
                draft.allpostsLoding = true;
                draft.allpostsDone = false;
                draft.allpostsError = null;
                break;

            case LOAD_ALLPOSTS_SUCCESS:
                draft.allpostsLoding = false;
                draft.allpostsDone = true;
                draft.allPosts = action.data.concat(draft.allPosts);
                break;

            case LOAD_ALLPOSTS_FAILURE:
                draft.allpostsLoding = false;
                draft.allpostsDone = false;
                draft.allpostsError = action.error;
                break;

            case ADD_POST_REQUEST:
                draft.addpostLoading = true;
                draft.addpostDone = false;
                draft.addpostError = null;
                break;

            case ADD_POST_SUCCESS:
                draft.addpostLoading = false;
                draft.addpostDone = true;
                draft.allPosts.unshift(dummyPost(action.data));
                break;

            case ADD_POST_FAILURE:
                draft.addpostLoading = false;
                draft.addpostDone = false;
                draft.allpostsError = action.error;
                break;

            case REMOVE_POST_REQUEST:
                draft.removepostLoading = true;
                draft.removepostDone = false;
                draft.removepostError = null;
                break;
    
            case REMOVE_POST_SUCCESS:
                draft.removepostLoading = false;
                draft.removepostDone = true;
                draft.allPosts = draft.allPosts.filter((v) => v.id !== action.data);
                break;

            case REMOVE_POST_FAILURE:
                draft.removepostLoading = false;
                draft.removepostDone = false;
                draft.removepostError = action.error;
                break;

            default:
                return state;
        }
    });
}

export default reducer;