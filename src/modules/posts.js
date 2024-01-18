import * as postsAPI from "../api/posts"; // api/posts 안의 함수 모두 불러오기
import {
  reducerUtils,
  handleAsyncActions,
  handleAsyncActionsById,
} from "../lib/asyncUtils";
import { call, getContext, put, takeEvery } from "redux-saga/effects";

const GET_POSTS = "GET_POSTS";
const GET_POSTS_SUCCESS = "GET_POSTS_SUCCESS";
const GET_POSTS_ERROR = "GET_POSTS_ERROR";

const GET_POST = "GET_POST";
const GET_POST_SUCCESS = "GET_POST_SUCCESS";
const GET_POST_ERROR = "GET_POST_ERROR";

const GO_TO_HOME = "GO_TO_HOME";
const GO_TO_TEST = "GO_TO_TEST";

export const getPosts = () => ({ type: GET_POSTS });
// payload는 파라미터 용도, meta는 리듀서에서 id를 알기위한 용도
export const getPost = (id) => ({ type: GET_POST, payload: id, meta: id });

export const goToHome = () => ({ type: GO_TO_HOME });

export const gotoTest = () => ({ type: GO_TO_TEST });

function* getPostsSaga() {
  try {
    const posts = yield call(postsAPI.getPosts);

    yield put({
      type: GET_POSTS_SUCCESS,
      payload: posts,
    });
  } catch (error) {
    yield put({
      type: GET_POSTS_ERROR,
      error: true,
      payload: error,
    });
  }
}

function* getPostSaga(action) {
  const param = action.payload;

  const id = action.meta;

  try {
    const post = yield call(postsAPI.getPostById, param);

    yield put({
      type: GET_POST_SUCCESS,
      payload: post,
      meta: id,
    });
  } catch (error) {
    yield put({
      type: GET_POST_ERROR,
      error: true,
      payload: error,
      meta: id,
    });
  }
}

function* goToHomeSaga() {
  const history = yield getContext("history");
  history.push("/");
}

function* goToTestSaga() {
  console.log("안녕하세요?");
  yield 1;
  console.log("제너레이터 함수");
  yield 2;
  console.log("function*");
  yield 3;
}

export function* postsSaga() {
  yield takeEvery(GET_POSTS, getPostsSaga);
  yield takeEvery(GET_POST, getPostSaga);
  yield takeEvery(GO_TO_HOME, goToHomeSaga);
  yield takeEvery(GO_TO_TEST, goToTestSaga);
}

const initialState = {
  posts: reducerUtils.initial(),
  post: reducerUtils.initial(),
};

export default function posts(state = initialState, action) {
  console.log("post", action.type);
  switch (action.type) {
    case GET_POSTS:
    case GET_POSTS_SUCCESS:
    case GET_POSTS_ERROR:
      return handleAsyncActions(GET_POSTS, "posts", true)(state, action);

    case GET_POST:
    case GET_POST_SUCCESS:
    case GET_POST_ERROR:
      return handleAsyncActionsById(GET_POST, "post", true)(state, action);

    default:
      return state;
  }
}
