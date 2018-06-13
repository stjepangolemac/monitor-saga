export function userTokenRefreshRequest() {
  return {
    type: 'USER_TOKEN_REFRESH_REQUEST',
    payload: 'trying to refresh token'
  }
}

export function userTokenRefreshSuccess() {
  return {
    type: 'USER_TOKEN_REFRESH_SUCCESS',
    payload: 'token refresh success'
  }
}

export function userTokenRefreshFailure() {
  return {
    type: 'USER_TOKEN_REFRESH_FAILURE',
    payload: 'token refresh failed'
  }
}

export function userLogoutRequest() {
  return {
    type: 'USER_LOGOUT_REQUEST',
    payload: 'trying to logout user'
  }
}

export function userLogoutSuccess() {
  return {
    type: 'USER_LOGOUT_SUCCESS',
    payload: 'user logout success'
  }
}

export function userLogoutFailure() {
  return {
    type: 'USER_LOGOUT_FAILURE',
    payload: 'user logout failure'
  }
}