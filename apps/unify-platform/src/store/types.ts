import { AppState } from './module/app'
import { NoticeState } from './module/notice'
import { Settings } from './module/settings'
import { UserState } from './module/user'

export interface IStoreState {
  app: AppState;
  user: UserState;
  settings: Settings;
  notices: NoticeState;
}

export interface IAction<T> {
  type: string;
  payload: T;
}
