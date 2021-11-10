import { Reducer } from 'redux'
import { IAction } from '../types'
import { IRoute } from '../../router/config'
import { flattenRoute } from '../../router/utils'
import LocalStore from '../../utils/store'

export interface AppState {
  sidebar: {
    opened: boolean;
    sidebarRoutes:IRoute[];
  };
  topnav:{
    show:boolean;
    topnavRoutes:IRoute[];
  };
  routes: IRoute[];

  flattenRoutes: IRoute[];

  init: boolean;

  prefixCls?:string;
}

const SIDEBAR_KEY = 'React-ant-Admin-SideBar-Opened'

const opened = LocalStore.getValue<boolean>(SIDEBAR_KEY, true)

const defaultApp: AppState = {
  sidebar: {
    opened: typeof opened === 'boolean' ? opened : true,
    sidebarRoutes:[]
  },
  topnav:{
    show:false,
    topnavRoutes:[]
  },
  routes: [],
  flattenRoutes: [],
  init: false,
}

const SET_SIDE_BAR_OPENED = 'SET_SIDE_BAR_OPENED'
const SET_ROUTES='SET_ROUTES'
const SET_TOP_NAV_ROUTES = 'SET_TOP_NAV_ROUTES'
const SET_SIDE_BAR_ROUTES = 'SET_SIDE_BAR_ROUTES'
const RMOVE_SIDE_BAR_ROUTES = 'RMOVE_SIDE_BAR_ROUTES'

export const updateSideBar = (sidebar: AppState['sidebar']) => ({
  type: SET_SIDE_BAR_OPENED,
  payload: sidebar,
})


export const setRoutes = (routes: IRoute[]) => ({
  type: SET_ROUTES,
  payload: routes,
})

export const setTopNavRoutes = (routes: IRoute[]) => ({
  type: SET_TOP_NAV_ROUTES,
  payload: routes,
})

export const setSideBarRoutes = (routes: IRoute[]) => ({
  type: SET_SIDE_BAR_ROUTES,
  payload: routes,
})

export const clearSideBarRoutes = () => ({
  type: RMOVE_SIDE_BAR_ROUTES,
  payload: null,
})

const appReducer: Reducer<AppState, IAction<any>> = (state = defaultApp, action: IAction<any>) => {
  const { type, payload } = action

  switch (type) {
    case SET_SIDE_BAR_OPENED:
      LocalStore.setValue(SIDEBAR_KEY, (payload as AppState['sidebar']).opened)

      return {
        ...state,
        sidebar: payload,
      }
     case SET_ROUTES:return{
      ...state,
      routes:payload,
      flattenRoutes: flattenRoute(payload, true, false),
      init: true,
     }
     case SET_TOP_NAV_ROUTES:
        return {
          ...state,
          topnav:{topnavRoutes:payload,show:true},
          flattenRoutes: flattenRoute(payload, true, false),
          init: true,
        }
    case SET_SIDE_BAR_ROUTES:
      return {
        ...state,
        sidebar: {sidebarRoutes: payload,opened:true},
      }
    case RMOVE_SIDE_BAR_ROUTES:
      return {
        ...state,
        routes: [],
        flattenRoutes: [],
        init: false,
      }

    default:
      return {
        ...state,
      }
  }
}

export default appReducer
