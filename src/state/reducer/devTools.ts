import { ActionType } from '.'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: any
  }
}

export const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ !== undefined ? window.__REDUX_DEVTOOLS_EXTENSION__.connect() : null

export const sendAction = (action: ActionType, newState: any): void => {
  if (devTools === null) { return }
  devTools.send(action, newState)
}

export const sendInit = (state: any): void => {
  if (devTools === null) { return }
  devTools.init(state)
}

export const notifyOnChange = (listener: (newState: any) => void): void => {
  if (devTools === null) { return }
  devTools.subscribe((message: any) => {
    if (message.type === 'DISPATCH' && message.state !== null) {
      console.log('DevTools requested to change the state to', message.state)
      listener(JSON.parse(message.state))
    }
  })
}
