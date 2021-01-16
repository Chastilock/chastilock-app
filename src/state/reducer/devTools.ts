import { ActionType } from '.'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: any
  }
}

export const devTools = window.__REDUX_DEVTOOLS_EXTENSION__.connect()

export const sendAction = (action: ActionType, newState: any): void => {
  devTools.send(action, newState)
}

export const sendInit = (state: any): void => {
  devTools.init(state)
}

export const notifyOnChange = (listener: (newState: any) => void): void => {
  devTools.subscribe((message: any) => {
    if (message.type === 'DISPATCH' && message.state !== null) {
      console.log('DevTools requested to change the state to', message.state)
      listener(JSON.parse(message.state))
    }
  })
}
