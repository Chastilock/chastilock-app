import React from 'react'
import { Button, Card, Modal } from '@ui-kitten/components'

import { Text, TextType, useTranslation } from '@chastilock/components'
import { useDispatch } from '@chastilock/state'
import { actions } from '@chastilock/state/sections/confirmation'

export interface ConfirmationPopupProps {
  title: string
  text?: string
  isVisible?: boolean
  onYes?: () => void
  onNo?: () => void
  onDismiss?: () => void
  onOk?: () => void
  onClose?: () => void
}
const ConfirmationPopup = (props: ConfirmationPopupProps): React.ReactElement => {
  const dispatch = useDispatch()
  const [translator] = useTranslation()

  const close = (): void => {
    props.onClose?.()
    dispatch(actions.closeConfirmation())
  }

  /* const yes = (): void => {
    close()
    props.onYes?.()
  }

  const no = (): void => {
    close()
    props.onNo?.()
  } */

  const ok = (): void => {
    close()
    props.onOk?.()
  }

  const dismiss = (): void => {
    close()
    props.onDismiss?.()
  }

  return (
    <Modal
      visible={props.isVisible}
      backdropStyle={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
      }}
      onBackdropPress={dismiss}>
      <Card disabled>
        <Text category={TextType.HEADING5} center>{props.title}</Text>
        {props.text !== undefined && <Text center>{props.text}</Text>}
        {props.onOk !== undefined && <Button onPress={ok} style={{ marginTop: 10 }}>{translator('confirmation.ok')}</Button>}
      </Card>
    </Modal>
  )
}

export default ConfirmationPopup
