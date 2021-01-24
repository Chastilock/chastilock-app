import React from 'react'

import { Text as KittenText } from '@ui-kitten/components'
import { useTrackedState } from '@chastilock/state'

import defaultTranslations from '../assets/translations/english_gb.json'

export enum TextType {
  HEADING1 = 'h1',
  HEADING2 = 'h2',
  HEADING3 = 'h3',
  HEADING4 = 'h4',
  HEADING5 = 'h5',
  HEADING6 = 'h6',
  SUBTITLE1 = 's1',
  SUBTITLE2 = 's2',
  PARAGRAPH1 = 'p1',
  PARAGRAPH2 = 'p2',
  LABEL = 'LABEL'
}

export interface TextProps {
  category?: TextType
  children?: string
  translationKey?: string
}
export const Text = (props: TextProps): React.ReactElement => {
  const state = useTrackedState()

  let text = props.children
  if (props.translationKey !== undefined) {
    if (state.i18n.translations[props.translationKey] !== undefined) {
      text = state.i18n.translations[props.translationKey]
    }
    if (text === undefined) {
      text = (defaultTranslations as any)[props.translationKey]
    }
    if (text === undefined) {
      // now something is not right
      text = 'UNKNOWN'
      console.error('Found invalid translation key: ' + props.translationKey)
    }
  }

  return (
    <KittenText category={props.category}>{text}</KittenText>
  )
}

export default Text
