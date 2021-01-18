import React from 'react'
import whyDidYouRender from '@welldone-software/why-did-you-render'

if (process.env.NODE_ENV === 'development' && process.env.PERFORMANCE_DEBUG === 'ON') {
  whyDidYouRender(React, {
    trackAllPureComponents: true
  })
}
