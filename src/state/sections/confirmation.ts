import { ActionType } from '@chastilock/state/reducer'
import { Confirmation } from '@chastilock/state/types'
import { ConfirmationPopupProps } from '@chastilock/views/common/ConfirmationPopup'

export interface ConfirmationState {
  visible: boolean
  modalProps: ConfirmationPopupProps
}

export const initialState: ConfirmationState = {
  visible: false,
  modalProps: {
    title: 'Nothing to confirm - you should not see this :('
  }
}

const confirmationReducer = (action: ActionType, state: ConfirmationState = initialState): ConfirmationState => {
  switch (action.type) {
    case Confirmation.showConfirmation:
      return {
        visible: true,
        modalProps: (action as UpdateConfirmationAction).modalProps
      }
    case Confirmation.closeConfirmation:
      return {
        ...initialState
      }
  }
  return state
}
confirmationReducer.reducerName = 'confirmation'

interface UpdateConfirmationAction {
  type: Confirmation
  modalProps: ConfirmationPopupProps
}

export const actions = {
  showConfirmation: (modalProps: ConfirmationPopupProps): UpdateConfirmationAction => ({
    type: Confirmation.showConfirmation,
    modalProps
  }),
  closeConfirmation: (): ActionType => ({
    type: Confirmation.closeConfirmation
  })
}

export default confirmationReducer
