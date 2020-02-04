import { APIStatus, APIStatusWithBoolean } from '.';

export enum UserType {
  NONE = 'none',
  STUDENT = 'student',
  TEACHER = 'teacher',
  GRADUATE = 'graduate',
  PARENT = 'parent',
}

export interface User {
  id: string;
  password: string;
  signKey: string;
  accessToken: string;
  type: UserType;
  admin: number;
  name: string;
  major: string | null;
  grade: number | null;
  classNum: number | null;
  studentNum: number | null;
  image: string | null;
}

interface UserAPIStatus {
  verifyPhoneStatus: APIStatus;
  registerStatus: APIStatus;
  loginStatus: APIStatus;
  idRecoveryStatus: APIStatus;
  pwRecoveryStatus: APIStatus;
  idExistStatus: APIStatusWithBoolean;
  tpExistStatus: APIStatusWithBoolean;
  signKeyExistStatus: APIStatusWithBoolean;
  getUserStatus: APIStatus;
  patchPasswordStatus: APIStatus;
  patchPhoneStatus: APIStatus;
  postUserImgStatus: APIStatus;
}

export type RestrictedUser = Omit<User, 'password' | 'signKey' | 'accessToken'>
export type UserState = Omit<User, 'password'> & UserAPIStatus;
