import { Lock as LockData } from 'chastilock-cardgame'

interface LockModel {
  id: number
  lock: LockData
  name: string
  nextDraw: Date
}

export default LockModel
