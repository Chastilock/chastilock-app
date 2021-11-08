import React from 'react'
import { SafeAreaView } from 'react-native'
import { Layout } from '@ui-kitten/components'
import { CardMapping, CardType, Lock as LockData } from 'chastilock-cardgame'

import Lock from './lock'
import { CardLockModel, LockType } from './lock/LockModel'

const MyLoadedLocks = (): React.ReactElement => {
  const cardMapping = new CardMapping()
  cardMapping.setCardsOfType(CardType.GREEN, 10)
  cardMapping.setCardsOfType(CardType.RED, 100)

  const locks: CardLockModel[] = [
    {
      id: 1,
      name: 'test',
      nextDraw: new Date(new Date().getTime() + 1000 * 3600),
      lock: new LockData({
        autoResets: {
          enabled: false
        },
        initial: {
          max: cardMapping,
          min: cardMapping
        },
        intervalMinutes: 5,
        multipleGreensRequired: true
      }),
      type: LockType.CARD
    }
  ]

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout style={{ flex: 1, padding: 10 }}>
        {locks.map(lock => <Lock key={lock.id} lock={lock} />)}
      </Layout>
    </SafeAreaView>
  )
}

export default MyLoadedLocks
