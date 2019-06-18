import { instance } from 'lib/baseUrl';
import { call, put, takeEvery } from 'redux-saga/effects';
import {
  DELETE_BOARD,
  DELETE_BOARD_COMMENT,
  DELETE_BOARD_COMMENT_FAILURE,
  DELETE_BOARD_COMMENT_SUCCESS,
  DELETE_BOARD_FAILURE,
  DELETE_BOARD_SUCCESS,
  DeleteBoard,
  DeleteBoardComment,
  DeleteBoardCommentParams,
  DeleteBoardParams,
  GET_BOARD,
  GET_BOARD_COMMENT,
  GET_BOARD_COMMENT_FAILURE,
  GET_BOARD_COMMENT_SUCCESS,
  GET_BOARD_FAILURE,
  GET_BOARD_SUCCESS,
  GetBoard,
  GetBoardComment,
  GetBoardCommentParams,
  GetBoardParams,
  Like,
  LIKE,
  LIKE_FAILURE,
  LIKE_SUCCESS,
  LikeParams,
  PATCH_BOARD,
  PATCH_BOARD_COMMENT,
  PATCH_BOARD_COMMENT_FAILURE,
  PATCH_BOARD_COMMENT_SUCCESS,
  PATCH_BOARD_FAILURE,
  PATCH_BOARD_SUCCESS,
  PatchBoard,
  PatchBoardComment,
  PatchBoardCommentParams,
  PatchBoardParams,
  POST_BOARD,
  POST_BOARD_COMMENT,
  POST_BOARD_COMMENT_FAILURE,
  POST_BOARD_COMMENT_SUCCESS,
  POST_BOARD_FAILURE,
  POST_BOARD_SUCCESS,
  PostBoard,
  PostBoardComment,
  PostBoardCommentParams,
  PostBoardParams,
  REPORT,
  Report,
  REPORT_FAILURE,
  REPORT_SUCCESS,
  ReportParams,
} from '../action';

const getBoardApi = (data: GetBoardParams) =>
  instance
    .get('/api/board', {
      headers: {
        access_token: data.accessToken,
      },
      params: {
        page: data.page,
      },
    })
    .then(res => res.data);
function* getBoardApiSaga(action: GetBoard) {
  if (action.type) {
    try {
      const response = yield call(getBoardApi, action.payload);
      console.log(response);
      yield put({ type: GET_BOARD_SUCCESS, payload: response.data });
    } catch (e) {
      console.log(e.response);
      yield put({ type: GET_BOARD_FAILURE });
    }
  }
}

const postBoardApi = (data: PostBoardParams) => {
  const formData = new FormData();
  if (data.files && data.files.length !== 0) {
    Array.from(data.files).forEach(file => formData.append('files', file));
  }
  formData.append('content', data.content);
  return instance
    .post('/api/board', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        access_token: data.accessToken,
      },
    })
    .then(res => res.data);
};
function* postBoardApiSaga(action: PostBoard) {
  if (action.type) {
    try {
      const response = yield call(postBoardApi, action.payload);
      console.log(response);
      yield put({ type: POST_BOARD_SUCCESS, payload: response.data.board });
    } catch (e) {
      yield put({ type: POST_BOARD_FAILURE });
    }
  }
}

const patchBoardApi = (data: PatchBoardParams) =>
  instance
    .patch(
      '/api/board',
      {
        content: data.content,
        files: data.board_pk,
      },
      {
        headers: {
          access_token: data.accessToken,
        },
      },
    )
    .then(res => res.data);
function* patchBoardApiSaga(action: PatchBoard) {
  if (action.type) {
    try {
      const response = yield call(patchBoardApi, action.payload);
      console.log(response);
      yield put({ type: PATCH_BOARD_SUCCESS, payload: action.payload });
    } catch (e) {
      yield put({ type: PATCH_BOARD_FAILURE });
    }
  }
}

const deleteBoardApi = (data: DeleteBoardParams) =>
  instance
    .delete('/api/board', {
      headers: {
        access_token: data.accessToken,
      },
      params: {
        board_pk: data.board_pk,
      },
    })
    .then(res => res.data);
function* deleteBoardApiSaga(action: DeleteBoard) {
  if (action.type) {
    try {
      const response = yield call(deleteBoardApi, action.payload);
      console.log(response);
      yield put({ type: DELETE_BOARD_SUCCESS, payload: action.payload });
    } catch (e) {
      yield put({ type: DELETE_BOARD_FAILURE });
    }
  }
}

const getBoardCommentApi = (data: GetBoardCommentParams) =>
  instance
    .get('/api/board/comment', {
      headers: {
        access_token: data.accessToken,
      },
      params: {
        board_pk: data.board_pk,
        page: data.page,
      },
    })
    .then(res => res.data);
function* getBoardCommentApiSaga(action: GetBoardComment) {
  if (action.type) {
    try {
      const response = yield call(getBoardCommentApi, action.payload);
      console.log(response);
      yield put({ type: GET_BOARD_COMMENT_SUCCESS, payload: response.data });
    } catch (e) {
      console.log(e.response);
      yield put({ type: GET_BOARD_COMMENT_FAILURE });
    }
  }
}

const postBoardCommentApi = (data: PostBoardCommentParams) =>
  instance
    .post(
      '/api/board/comment',
      {
        content: data.content,
        board_pk: data.board_pk,
      },
      {
        headers: {
          access_token: data.accessToken,
        },
      },
    )
    .then(res => res.data);
function* postBoardCommentApiSaga(action: PostBoardComment) {
  if (action.type) {
    try {
      const response = yield call(postBoardCommentApi, action.payload);
      console.log(response);
      yield put({ type: POST_BOARD_COMMENT_SUCCESS, payload: action.payload });
    } catch (e) {
      yield put({ type: POST_BOARD_COMMENT_FAILURE });
    }
  }
}

const patchBoardCommentApi = (data: PatchBoardCommentParams) =>
  instance
    .patch(
      '/api/board/comment',
      {
        content: data.content,
        board_pk: data.board_pk,
        comment_pk: data.comment_pk,
      },
      {
        headers: {
          access_token: data.accessToken,
        },
      },
    )
    .then(res => res.data);
function* patchBoardCommentApiSaga(action: PatchBoardComment) {
  if (action.type) {
    try {
      const response = yield call(patchBoardCommentApi, action.payload);
      console.log(response);
      yield put({ type: PATCH_BOARD_COMMENT_SUCCESS, payload: action.payload });
    } catch (e) {
      yield put({ type: PATCH_BOARD_COMMENT_FAILURE });
    }
  }
}

const deleteBoardCommentApi = (data: DeleteBoardCommentParams) =>
  instance
    .delete('/api/board/comment', {
      headers: {
        access_token: data.accessToken,
      },
      params: {
        board_pk: data.board_pk,
        comment_pk: data.comment_pk,
      },
    })
    .then(res => res.data);
function* deleteBoardCommentApiSaga(action: DeleteBoardComment) {
  if (action.type) {
    try {
      const response = yield call(deleteBoardCommentApi, action.payload);
      console.log(response);
      yield put({
        type: DELETE_BOARD_COMMENT_SUCCESS,
        payload: action.payload,
      });
    } catch (e) {
      yield put({ type: DELETE_BOARD_COMMENT_FAILURE });
    }
  }
}

const likeApi = (data: LikeParams) =>
  instance
    .get('/api/board/like', {
      headers: {
        access_token: data.accessToken,
      },
      params: {
        type: data.type,
        board_pk: data.board_pk,
        comment_pk: data.comment_pk,
      },
    })
    .then(res => res.data);
function* likeApiSaga(action: Like) {
  if (action.type) {
    try {
      const response = yield call(likeApi, action.payload);
      console.log(response);
      yield put({ type: LIKE_SUCCESS, payload: action.payload });
    } catch (e) {
      yield put({ type: LIKE_FAILURE });
    }
  }
}

const reportApi = (data: ReportParams) =>
  instance
    .post(
      '/api/board/report',
      {
        type: data.type,
        board_pk: data.board_pk,
        comment_pk: data.comment_pk,
      },
      {
        headers: {
          access_token: data.accessToken,
        },
      },
    )
    .then(res => res.data);
function* reportApiSaga(action: Report) {
  if (action.type) {
    try {
      const response = yield call(reportApi, action.payload);
      console.log(response);
      yield put({ type: REPORT_SUCCESS, payload: action.payload });
    } catch (e) {
      yield put({ type: REPORT_FAILURE });
    }
  }
}

export function* boardSaga() {
  yield takeEvery(GET_BOARD, getBoardApiSaga);
  yield takeEvery(POST_BOARD, postBoardApiSaga);
  yield takeEvery(PATCH_BOARD, patchBoardApiSaga);
  yield takeEvery(DELETE_BOARD, deleteBoardApiSaga);
  yield takeEvery(GET_BOARD_COMMENT, getBoardCommentApiSaga);
  yield takeEvery(POST_BOARD_COMMENT, postBoardCommentApiSaga);
  yield takeEvery(PATCH_BOARD_COMMENT, patchBoardCommentApiSaga);
  yield takeEvery(DELETE_BOARD_COMMENT, deleteBoardCommentApiSaga);
  yield takeEvery(LIKE, likeApiSaga);
  yield takeEvery(REPORT, reportApiSaga);
}
