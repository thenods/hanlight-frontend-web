import { produce } from 'immer';
import { userReducerActions } from '../action';
import { UserState, UserType } from '../model/user.model';
import { APIStatus, APIStatusWithBoolean } from 'store/model';

declare global {
  interface Window {
    android: {
      logout(): void;
    }
  }
}

window.android = {
  logout: () => console.log('logout'),
};

const initialState: UserState = {
  signKey: '',
  id: '',
  accessToken: '',
  type: UserType.NONE,
  admin: 0,
  name: '',
  major: null,
  grade: null,
  classNum: null,
  studentNum: null,
  image: null,

  verifyPhoneStatus: APIStatus.NONE,
  registerStatus: APIStatus.NONE,
  loginStatus: APIStatus.NONE,
  idRecoveryStatus: APIStatus.NONE,
  pwRecoveryStatus: APIStatus.NONE,
  idExistStatus: APIStatusWithBoolean.NONE,
  tpExistStatus: APIStatusWithBoolean.NONE,
  signKeyExistStatus: APIStatusWithBoolean.NONE,
  getUserStatus: APIStatus.NONE,
  patchPasswordStatus: APIStatus.NONE,
  patchPhoneStatus: APIStatus.NONE,
  postUserImgStatus: APIStatus.NONE,
};

export const userReducer = (
  state: UserState = initialState,
  action: userReducerActions,
) =>
  produce(state, draft => {
    switch (action.type) {
      case 'LOGIN':
        draft.loginStatus = APIStatus.PENDING;
        break;

      case 'LOGIN_SUCCESS':
        draft.loginStatus = APIStatus.SUCCESS;
        draft.accessToken = action.payload.accessToken;
        Object.assign(draft, {
          ...action.payload.user,
        });

        localStorage.setItem('accessToken', action.payload.accessToken);
        break;

      case 'LOGIN_FAILURE':
        draft.loginStatus = APIStatus.FAILURE;
        break;

      case 'ID_RECOVERY':
        draft.idRecoveryStatus = APIStatus.PENDING;
        break;

      case 'ID_RECOVERY_SUCCESS':
        draft.idRecoveryStatus = APIStatus.SUCCESS;
        draft.id = action.payload.id;
        break;

      case 'ID_RECOVERY_FAILURE':
        draft.idRecoveryStatus = APIStatus.FAILURE;
        break;

      case 'PW_RECOVERY':
        draft.pwRecoveryStatus = APIStatus.PENDING;
        break;

      case 'PW_RECOVERY_SUCCESS':
        draft.pwRecoveryStatus = APIStatus.SUCCESS;
        draft.accessToken = action.payload.accessToken;
        break;

      case 'PW_RECOVERY_FAILURE':
        draft.pwRecoveryStatus = APIStatus.FAILURE;
        break;

      case 'VERIFY_PHONE':
        draft.verifyPhoneStatus = APIStatus.PENDING;
        break;

      case 'VERIFY_PHONE_SUCCESS':
        draft.verifyPhoneStatus = APIStatus.SUCCESS;
        break;

      case 'VERIFY_PHONE_FAILURE':
        draft.verifyPhoneStatus = APIStatus.FAILURE;
        break;

      case 'REGISTER':
        draft.registerStatus = APIStatus.PENDING;
        break;

      case 'REGISTER_SUCCESS':
        draft.registerStatus = APIStatus.SUCCESS;
        break;

      case 'REGISTER_FAILURE':
        draft.registerStatus = APIStatus.FAILURE;
        break;

      case 'SET_SIGN_KEY':
        draft.signKey = action.payload;
        break;

      case 'ID_EXIST':
        draft.idExistStatus = APIStatusWithBoolean.PENDING;
        break;

      case 'ID_EXIST_SUCCESS_TRUE':
        draft.idExistStatus = APIStatusWithBoolean.SUCCESS_TRUE;
        break;
      case 'ID_EXIST_SUCCESS_FALSE':
        draft.idExistStatus = APIStatusWithBoolean.SUCCESS_FALSE;
        break;

      case 'ID_EXIST_FAILURE':
        draft.idExistStatus = APIStatusWithBoolean.FAILURE;
        break;

      case 'RESET_USER':
        localStorage.clear();
        window.android.logout();
        return initialState;

      case 'GET_USER':
        draft.getUserStatus = APIStatus.PENDING;
        draft.loginStatus = APIStatus.PENDING;
        break;
      case 'GET_USER_SUCCESS':
        draft.getUserStatus = APIStatus.SUCCESS;
        draft.loginStatus = APIStatus.SUCCESS;
        Object.assign(draft, {
          ...action.payload.user,
        });
        draft.accessToken = action.payload.token;
        break;
      case 'GET_USER_FAILURE':
        draft.getUserStatus = APIStatus.FAILURE;
        draft.loginStatus = APIStatus.FAILURE;
        localStorage.clear();
        break;

      case 'PATCH_PASSWORD':
        draft.patchPasswordStatus = APIStatus.PENDING;
        break;
      case 'PATCH_PASSWORD_SUCCESS':
        draft.patchPasswordStatus = APIStatus.SUCCESS;
        break;
      case 'PATCH_PASSWORD_FAILURE':
        draft.patchPasswordStatus = APIStatus.FAILURE;
        break;

      case 'PATCH_PHONE':
        draft.patchPhoneStatus = APIStatus.PENDING;
        break;
      case 'PATCH_PHONE_SUCCESS':
        draft.patchPhoneStatus = APIStatus.SUCCESS;
        break;
      case 'PATCH_PHONE_FAILURE':
        draft.patchPhoneStatus = APIStatus.FAILURE;
        break;

      case 'POST_USER_IMG':
        draft.postUserImgStatus = APIStatus.PENDING;
        break;

      case 'POST_USER_IMG_SUCCESS':
        draft.postUserImgStatus = APIStatus.SUCCESS;
        draft.image = action.payload.user.image;
        break;

      case 'POST_USER_IMG_FAILURE':
        draft.postUserImgStatus = APIStatus.FAILURE;
        break;

      default:
        break;
    }
  });
