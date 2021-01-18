// This has to be the first import
import './wdyr'

import React from 'react'
import { registerRootComponent } from 'expo'

import { StateProvider } from './state'
import App from './App'

const Root = (): React.ReactElement => {
  return (
    <StateProvider>
      <App />
    </StateProvider>
  )
}

registerRootComponent(Root)

export default Root
