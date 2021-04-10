import React from 'react'
import { Button, Card, Modal } from '@ui-kitten/components'

import { Text, TextType, useTranslation } from '@chastilock/components'
import { useDispatch } from '@chastilock/state'
import { actions } from '@chastilock/state/sections/confirmation'

export interface ConfirmationPopupProps {
  title: string
  text?: string
  isVisible?: boolean
  isForced?: boolean
  onYes?: () => void
  onNo?: () => void
  onDismiss?: () => void
  onOk?: () => void
  onClose?: () => void
  onCancel?: () => void
}
const ConfirmationPopup = (props: ConfirmationPopupProps): React.ReactElement => {
  const dispatch = useDispatch()
  const [translator] = useTranslation()

  const close = (): void => {
    props.onClose?.()
    dispatch(actions.closeConfirmation())
  }

  const cancel = (): void => {
    close()
    props.onCancel?.()
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
    // Closing a forced popup is not allowed
    // We know this is annoying, but this is for example if the connection is interrupted
    if (props.isForced === true) {
      return
    }

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
        {props.onCancel !== undefined && <Button status="basic" onPress={cancel} style={{ marginTop: 10 }}>{translator('confirmation.cancel')}</Button>}
      </Card>
    </Modal>
  )
}

export default ConfirmationPopup
