import { takeEvery, race, take, put } from 'redux-saga/effects'

import {
  userTokenRefreshRequest,
  userTokenRefreshSuccess,
  userTokenRefreshFailure,
  userLogoutRequest,
} from './actions'

const ignoreActionTypes = ['TOKEN_REFRESH']

function monitorableAction(action) {
  return action.type
    .includes('REQUEST') && ignoreActionTypes
      .every(fragment => !action.type.includes(fragment))
}

function identifyAction(action) {
  return action.type.split('_').slice(0, -1).join('_')
}
function getSuccessType(action) {
  return `${identifyAction(action)}_SUCCESS`
}
function getFailType(action) {
  return `${identifyAction(action)}_FAILURE`
}

function* monitor(monitoredAction) {
  console.log('started monitoring', monitoredAction.type)
  const { fail } = yield race({
    success: take(getSuccessType(monitoredAction)),
    fail: take(getFailType(monitoredAction)),
  })

  if (fail && fail.payload && fail.payload.code === 401) {
    console.log('detected 401, refreshing token')
    yield put(userTokenRefreshRequest())

    const { success } = yield race({
      success: take(userTokenRefreshSuccess().type),
      fail: take(userTokenRefreshFailure().type),
    }) 

    if (success) {
      console.log('token refreshed, retrying', monitoredAction.type)
      yield put(monitoredAction)
    } else {
      console.log('token refresh failed, logging out user')
      yield put(userLogoutRequest())
    }
  }

  console.log('monitoring', monitoredAction.type, 'finished')
}

export default function*() {
  yield takeEvery(monitorableAction, monitor)
}