import React from 'react'
import { View } from 'react-native'
import { Button, Input } from '@ui-kitten/components'

export interface NumberSelectionProps {
  value: number
  min?: number
  max?: number
  onChange: (num: number) => void
}
export const NumberSelection = (props: NumberSelectionProps): React.ReactElement => {
  const [number, setNumber] = React.useState(props.value)
  const [isEmpty, setIsEmpty] = React.useState(false)

  // Apply external change of value
  React.useEffect(() => {
    setNumber(props.value)
  }, [props.value])

  // Apply change of boundaries
  React.useEffect(() => {
    if (props.max !== undefined && number > props.max) {
      setNumber(props.max)
    }
    if (props.min !== undefined && number < props.min) {
      setNumber(props.min)
    }
  }, [props.min, props.max])

  const updateNumber = (newNumber: number): void => {
    if (props.max !== undefined && newNumber > props.max) {
      return
    }
    if (props.min !== undefined && newNumber < props.min) {
      return
    }

    setNumber(newNumber)
    props.onChange(newNumber)
  }

  return (
    <View style={{ flexDirection: 'row' }}>
      <Button size="tiny" style={{ height: 40 }} onPress={() => updateNumber(number - 1)} disabled={props.min !== undefined ? number === props.min : false}>-</Button>
      <Input textStyle={{ textAlign: 'center', width: 40, marginLeft: 0, marginRight: 0 }} style={{ width: 60, height: 40, textAlign: 'center' }} keyboardType="numeric" value={isEmpty ? '' : number.toString()} onChange={e => {
        const newValue = (e as any).target.value

        if (newValue === '') {
          setIsEmpty(true)
        }

        if (!isNaN(parseInt(newValue))) {
          updateNumber(parseInt(newValue))
          setIsEmpty(false)
        }
      }} onBlur={() => setIsEmpty(false)} />
      <Button size="tiny" style={{ height: 40 }} onPress={() => updateNumber(number + 1)} disabled={props.max !== undefined ? number === props.max : false}>+</Button>
    </View>
  )
}

export default NumberSelection
