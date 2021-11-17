/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose,
  Middleware,
  Reducer
} from "redux"
import reduxThunk from "redux-thunk"
import reduxLogger from "redux-logger"
import { IStoreState, IAction } from "./types"
import userReducer from "./module/user"
import appReducer from "./module/app"
import settingsReducer from "./module/settings"
import noticeReducer from "./module/notice"

/**
 * 日志打印每个 dispatch 的 action 和调用后的状态
 */
const customMiddleware = (store: { getState: () => any }) => (
  next: (arg0: any) => any
) => (action: { type: any }) => {
  console.group(action.type)
  console.info("customMiddleware-before", action)
  const result = next(action)
  console.log("customMiddleware-after-state", store.getState())
  console.groupEnd()
  return result
}

const reducers: Reducer<IStoreState, IAction<any>> = combineReducers<
  IStoreState
>({
  user: userReducer,
  app: appReducer,
  settings: settingsReducer,
  notices: noticeReducer
})

const middleware: Middleware[] = [reduxThunk]

if (process.env.NODE_ENV === "development") {
  middleware.push(reduxLogger)
  middleware.push(customMiddleware)
}

function createMyStore() {
  /* eslint-disable no-underscore-dangle */
  const store = window.__REDUX_DEVTOOLS_EXTENSION__
    ? createStore(
        reducers,
        compose(
          applyMiddleware(...middleware),
          window.__REDUX_DEVTOOLS_EXTENSION__({})
        )
      )
    : createStore(reducers, applyMiddleware(...middleware))

  return store
}

const store = createMyStore()

export default store
