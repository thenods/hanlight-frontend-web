import { BoardModel } from './board.model';
import { CalendarModel } from './calendar.model';
import { ErrorModel } from './error.model';
import { MealModel } from './meal.model';
import { NoticeModel } from './notice.model';
import { TimeTableModel } from './timeTable.model';
import { UserState } from './user.model';
import { UtilModel } from './util.model';

export * from './timeTable.model';
export * from './user.model';
export * from './calendar.model';
export * from './notice.model';
export * from './meal.model';
export * from './error.model';
export * from './board.model';
export * from './util.model';
export * from './common';

export interface AppState {
  user: UserState;
  calendar: CalendarModel;
  notice: NoticeModel;
  timeTable: TimeTableModel;
  meal: MealModel;
  error: ErrorModel;
  board: BoardModel;
  util: UtilModel;
}

export enum APIStatus {
  NONE = 'none',
  PENDING = 'pending',
  SUCCESS = 'success',
  FAILURE = 'failure'
}

export enum APIStatusWithBoolean {
  NONE = 'none',
  PENDING = 'pending',
  SUCCESS_TRUE = 'success-true',
  SUCCESS_FALSE = 'success-false',
  FAILURE = 'failure'
}
