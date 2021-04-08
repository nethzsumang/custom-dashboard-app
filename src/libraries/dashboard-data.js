import {
  LOCAL_STORAGE_DASHBOARD_DATA_KEY,
  DEFAULT_INITIAL_DASHBOARD_DATA
} from '../constants/app-constants'

/**
 * Loads intial data
 */
const loadInitialData = () => {
  const sLocalData = localStorage.getItem(LOCAL_STORAGE_DASHBOARD_DATA_KEY)
  if (sLocalData === null) {
    return DEFAULT_INITIAL_DASHBOARD_DATA
  }

  return JSON.parse(sLocalData)
}

/**
 * Saves data to local storage
 * @param {*} oData
 */
const saveData = (oData) => {
  const sData = JSON.stringify(oData)
  localStorage.setItem(LOCAL_STORAGE_DASHBOARD_DATA_KEY, sData)
}

/**
 * Removes dashboard data
 */
const removeDashboardData = () => {
  localStorage.removeItem(LOCAL_STORAGE_DASHBOARD_DATA_KEY)
}

export {
  loadInitialData,
  saveData,
  removeDashboardData
}
