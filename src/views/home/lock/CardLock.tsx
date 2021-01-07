import { Text } from '@ui-kitten/components'
import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import moment from 'moment'
import momentDurationFormatSetup from 'moment-duration-format'

import { CardLockModel } from './LockModel'

momentDurationFormatSetup(moment)

interface CardLockProps {
  lock: CardLockModel
}
const CardLock = (props: CardLockProps): React.ReactElement => {
  const [currentTime, setCurrentTime] = useState(new Date())

  const countdown = moment.duration(currentTime.getTime() - props.lock.nextDraw.getTime()).abs()

  const canDraw = countdown.asSeconds() <= 0

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => {
      if (timer !== null) clearInterval(timer)
    }
  }, [])

  return (
    <View style={{ borderWidth: 1, borderColor: 'grey', padding: 5 }}>
      <Text>{props.lock.name}</Text>
      {!canDraw && <View style={{ flexDirection: 'row' }}>
        <Text>Next draw in: </Text>
        <Text>{countdown.format('HH:mm:ss')}</Text>
      </View>}
    </View>
  )
}

export default CardLock
