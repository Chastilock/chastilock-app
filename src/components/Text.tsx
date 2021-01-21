import React from 'react'

import { Text as KittenText } from '@ui-kitten/components'

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
  children: string
}
export const Text = (props: TextProps): React.ReactElement => {
  return (
    <KittenText category={props.category}>{props.children}</KittenText>
  )
}

export default Text
