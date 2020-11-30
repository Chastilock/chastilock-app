import { Lock as LockData } from 'chastilock-cardgame'

interface LockModel {
  lock: LockData
  name: string
  nextDraw: Date
}

export default LockModel
