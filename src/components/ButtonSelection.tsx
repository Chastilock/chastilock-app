import React from 'react'
import { Button, ButtonGroup, useTheme } from '@ui-kitten/components'
import { useTranslation } from '.'

export interface ButtonSelectionProps {
  options: any[]
  selected: string
  onSelect: (newSelected: any) => void
  translate?: boolean
  compact?: boolean
  fullWidth?: boolean
}
export const ButtonSelection = (props: ButtonSelectionProps): React.ReactElement => {
  const [translate] = useTranslation()
  const theme = useTheme()

  const size = props.compact === true ? 'tiny' : 'medium'

  return (
    <ButtonGroup size={size} style={{ marginHorizontal: props.fullWidth === true ? 'auto' : undefined, marginTop: 5 }}>
      {
        props.options.map(option => <Button
          style={ { backgroundColor: option.value === props.selected ? theme['color-primary-active'] : theme['color-primary-default'] }}
          onPress={() => props.onSelect(option)}>
          {props.translate === true ? translate(option.text) : option.text}
        </Button>)
      }
    </ButtonGroup>
  )
}

export default ButtonSelection
