import React from 'react'

import LockModel, { LockType } from './LockModel'
import CardLock from './CardLock'

interface LockProps {
  lock: LockModel
}
const Lock = (props: LockProps): React.ReactElement | null => {
  if (props.lock.type === LockType.CARD) {
    return <CardLock />
  } else if (props.lock.type === LockType.FIXED) {
    return null
  } else {
    return null
  }
}

export default Lock
