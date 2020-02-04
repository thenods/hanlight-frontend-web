import { AxiosResponse } from 'axios';
import { instance } from 'lib/baseUrl';
import { call, put, takeEvery } from 'redux-saga/effects';
import {
  ExistParam,
  ExistResponse,
  GET_USER,
  GET_USER_FAILURE,
  GET_USER_SUCCESS,
  GetUser,
  ID_EXIST,
  ID_EXIST_FAILURE,
  ID_EXIST_SUCCESS_FALSE,
  ID_EXIST_SUCCESS_TRUE,
  ID_RECOVERY,
  ID_RECOVERY_FAILURE,
  ID_RECOVERY_SUCCESS,
  IdExist,
  IdRecovery,
  Login,
  LOGIN,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LoginParam,
  PATCH_PASSWORD,
  PATCH_PASSWORD_FAILURE,
  PATCH_PASSWORD_SUCCESS,
  PATCH_PHONE,
  PATCH_PHONE_FAILURE,
  PATCH_PHONE_SUCCESS,
  PatchPassword,
  PatchPhone,
  PatchPhoneParam,
  PatchPwParam,
  POST_USER_IMG,
  POST_USER_IMG_FAILURE,
  POST_USER_IMG_SUCCESS,
  PostUserImg,
  PostUserImgParmas,
  PW_RECOVERY,
  PW_RECOVERY_FAILURE,
  PW_RECOVERY_SUCCESS,
  PwRecovery,
  PwRecoveryParam,
  Register,
  REGISTER,
  REGISTER_FAILURE,
  REGISTER_SUCCESS,
  RegisterParam,
  SET_ERROR,
  VERIFY_PHONE,
  VERIFY_PHONE_FAILURE,
  VERIFY_PHONE_SUCCESS,
  VerifyPhone,
  VerifyPhoneParam,
  IdRecoveryParam,
  IdRecoverySuccess,
} from '../action';

const loginApi = (data: LoginParam) =>
  instance
    .post('/api/user/login', {
      id: data.id,
      password: data.password,
    })
    .then(res => res.data);

function* loginApiSaga(action: Login) {
  if (action.type) {
    try {
      const response = yield call(loginApi, action.payload);
      yield put({ type: LOGIN_SUCCESS, payload: response.data });
    } catch (e) {
      yield put({
        type: SET_ERROR,
        name: LOGIN_FAILURE,
        payload: { err: e, origin: action.payload },
      });
    }
  }
}

const idRecoveryApi: (
  data: IdRecoveryParam
) => Promise<AxiosResponse<IdRecoverySuccess>> = ({
  code
}) => instance
  .post<AxiosResponse<IdRecoverySuccess>>('/api/user/recovery/id', {
    code,
  })
  .then(res => res.data);

function* idRecoverySaga(action: IdRecovery) {
  if (action.type) {
    try {
      const response = yield call(idRecoveryApi, action.payload);

      yield put({ type: ID_RECOVERY_SUCCESS, payload: response.data });
    } catch (e) {
      yield put({
        type: SET_ERROR,
        name: ID_RECOVERY_FAILURE,
        payload: { err: e, origin: action.payload },
      });
    }
  }
}

const pwRecoveryApi = (data: PwRecoveryParam) =>
  instance
    .post('/api/user/recovery/password', {
      code: data.code,
      id: data.id,
    })
    .then(res => res.data);

function* pwRecoverySaga(action: PwRecovery) {
  if (action.type) {
    try {
      const response = yield call(pwRecoveryApi, action.payload);

      yield put({ type: PW_RECOVERY_SUCCESS, payload: response.data });
    } catch (e) {
      yield put({
        type: SET_ERROR,
        name: PW_RECOVERY_FAILURE,
        payload: { err: e, origin: action.payload },
      });
    }
  }
}

const existApi = (value: ExistParam) =>
  instance
    .get('/api/user/exist', {
      params: {
        key: value.key,
        value: value.value,
      },
    })
    .then((res: AxiosResponse<ExistResponse>) => res.data);

function* idExistSaga(action: IdExist) {
  if (action.type) {
    try {
      const response = yield call(existApi, {
        key: 'id',
        value: action.payload.id,
      });

      yield put({
        type: response.data.exist
          ? ID_EXIST_SUCCESS_TRUE
          : ID_EXIST_SUCCESS_FALSE,
        payload: action.payload,
      });
    } catch (e) {
      yield put({
        type: SET_ERROR,
        name: ID_EXIST_FAILURE,
        payload: { err: e, origin: action.payload },
      });
    }
  }
}

const verifyPhoneApi = (data: VerifyPhoneParam) =>
  instance
    .post('/api/user/phone', {
      code: data.code,
      signKey: data.signKey,
    })
    .then(res => res.data);

function* verifyPhoneApiSaga(action: VerifyPhone) {
  if (action.type) {
    try {
      const response = yield call(verifyPhoneApi, action.payload);

      yield put({ type: VERIFY_PHONE_SUCCESS, payload: response.data });
    } catch (e) {
      yield put({
        type: SET_ERROR,
        name: VERIFY_PHONE_FAILURE,
        payload: { err: e, origin: action.payload },
      });
    }
  }
}

const registerApi = (data: RegisterParam) =>
  instance
    .post('/api/user/register', {
      id: data.id,
      password: data.password,
      signKey: data.signKey,
    })
    .then(res => res.data);

function* registerApiSaga(action: Register) {
  if (action.type) {
    try {
      const response = yield call(registerApi, action.payload);

      yield put({ type: REGISTER_SUCCESS, payload: response.data });
    } catch (e) {
      yield put({
        type: SET_ERROR,
        name: REGISTER_FAILURE,
        payload: { err: e, origin: action.payload },
      });
    }
  }
}

const getUserApi = (data: string) =>
  instance
    .get('/api/user', {
      headers: {
        access_token: data,
      },
    })
    .then((res: AxiosResponse) => res.data);
function* getUserApiSaga(action: GetUser) {
  if (action.type) {
    try {
      const response = yield call(getUserApi, action.payload);

      yield put({
        type: GET_USER_SUCCESS,
        payload: {
          user: response.data.user,
          token: action.payload,
        },
      });
    } catch (e) {
      yield put({
        type: SET_ERROR,
        name: GET_USER_FAILURE,
        payload: { err: e, origin: action.payload },
      });
    }
  }
}

const patchPasswordApi = (data: PatchPwParam) =>
  instance
    .patch(
      '/api/user/password',
      {
        password: data.password,
      },
      {
        headers: {
          access_token: data.accessToken,
        },
      },
    )
    .then((res: AxiosResponse) => res.data);
function* patchPasswordApiSaga(action: PatchPassword) {
  if (action.type) {
    try {
      const response = yield call(patchPasswordApi, action.payload);

      yield put({
        type: PATCH_PASSWORD_SUCCESS,
      });
    } catch (e) {
      yield put({
        type: SET_ERROR,
        name: PATCH_PASSWORD_FAILURE,
        payload: { err: e, origin: action.payload },
      });
    }
  }
}

const patchPhoneApi = (data: PatchPhoneParam) =>
  instance
    .patch(
      '/api/user/phone',
      {
        code: data.code,
      },
      {
        headers: {
          access_token: data.accessToken,
        },
      },
    )
    .then((res: AxiosResponse) => res.data);
function* patchPhoneApiSaga(action: PatchPhone) {
  if (action.type) {
    try {
      const response = yield call(patchPhoneApi, action.payload);

      yield put({
        type: PATCH_PHONE_SUCCESS,
      });
    } catch (e) {
      yield put({
        type: SET_ERROR,
        name: PATCH_PHONE_FAILURE,
        payload: { err: e, origin: action.payload },
      });
    }
  }
}

const postUserImgApi = (data: PostUserImgParmas) => {
  const formData = new FormData();

  if (data.file) {
    formData.append('file', data.file);
  }

  return instance
    .post('/api/user/image', formData, {
      headers: {
        access_token: data.accessToken,
      },
    })
    .then(res => res.data);
};

function* postUserImgApiSaga(action: PostUserImg) {
  if (action.type) {
    try {
      const response = yield call(postUserImgApi, action.payload);

      yield put({ type: POST_USER_IMG_SUCCESS, payload: response.data });
    } catch (e) {
      yield put({
        type: SET_ERROR,
        name: POST_USER_IMG_FAILURE,
        payload: { err: e, origin: action.payload },
      });
    }
  }
}

function* userSaga() {
  yield takeEvery(ID_RECOVERY, idRecoverySaga);
  yield takeEvery(PW_RECOVERY, pwRecoverySaga);
  yield takeEvery(LOGIN, loginApiSaga);
  yield takeEvery(ID_EXIST, idExistSaga);
  yield takeEvery(REGISTER, registerApiSaga);
  yield takeEvery(VERIFY_PHONE, verifyPhoneApiSaga);
  yield takeEvery(GET_USER, getUserApiSaga);
  yield takeEvery(PATCH_PASSWORD, patchPasswordApiSaga);
  yield takeEvery(PATCH_PHONE, patchPhoneApiSaga);
  yield takeEvery(POST_USER_IMG, postUserImgApiSaga);
}

export { userSaga };
