import { takeEvery } from 'redux-saga'

const monitorableAction = action => action.type.includes('REQUEST')
const failureAction = action => action.type.includes('FAILURE')
const successAction = action => action.type.includes('SUCCESS')

function identifyAction(action) {
  return action.type.split('_').slice(-1).join('_')
}

function* monitor() {

}

export default function*() {
  yield takeEvery(monitorableAction, monitor)
}