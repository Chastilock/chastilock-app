import { Lock as LockData } from 'chastilock-cardgame'

export default interface LockModel {
  id: number
  name: string
  type: LockType
}

export enum LockType {
  CARD = 'card',
  FIXED = 'fixed'
}

export type CardLockModel = LockModel & {
  lock: LockData
  nextDraw: Date
}

export type FixedLockModel = LockModel & {
  unlockDate: Date
}
