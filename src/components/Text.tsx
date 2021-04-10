import React from 'react'

import { Text as KittenText } from '@ui-kitten/components'

import { useTranslation } from './useTranslation'

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
  center?: boolean
  [name: string]: any
}
export const Text = (props: TextProps): React.ReactElement => {
  const [translator] = useTranslation()

  let text = props.children
  if (props.translationKey !== undefined) {
    if (translator(props.translationKey) !== undefined) {
      text = translator(props.translationKey)
    }
  }

  const textAlign = props.center === true ? 'center' : undefined

  return (
    <KittenText category={props.category} style={{ ...props.style, textAlign }}>{text}</KittenText>
  )
}

export default Text
