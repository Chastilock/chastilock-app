import React from 'react'
import { SafeAreaView } from 'react-native'
import { Layout } from '@ui-kitten/components'
import { CardMapping, CardType, Lock as LockData } from 'chastilock-cardgame'

import Lock from './lock'
import LockModel from './lock/LockModel'

const MyLocks = (): React.ReactElement => {
  // const [state, dispatch] = useTracked();
  // console.log(state);

  const cardMapping = new CardMapping()
  cardMapping.setCardsOfType(CardType.GREEN, 10)
  cardMapping.setCardsOfType(CardType.RED, 100)

  const locks: LockModel[] = [
    {
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
      })
    }
  ]

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {locks.map(lock => <Lock lock={lock} />)}
      </Layout>
    </SafeAreaView>
  )
}

export default MyLocks
