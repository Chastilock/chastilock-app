import React from 'react'
import { Button, ButtonGroup } from '@ui-kitten/components'
import { useTranslation } from '.'

export interface ButtonSelectionProps {
  options: any[]
  selected: string
  translate?: boolean
  compact?: boolean
  fullWidth?: boolean
}
export const ButtonSelection = (props: ButtonSelectionProps): React.ReactElement => {
  const [translate] = useTranslation()

  const size = props.compact === true ? 'tiny' : 'medium'

  return (
    <ButtonGroup size={size} style={{ margin: props.fullWidth === true ? '0 auto' : undefined }}>
      {
        props.options.map(option => <Button disabled={option.value === props.selected}>{props.translate === true ? translate(option.text) : option.text}</Button>)
      }
    </ButtonGroup>
  )
}

export default ButtonSelection
