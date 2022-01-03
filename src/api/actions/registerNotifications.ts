import { createAction, ApiAction } from './genericAction'

export default (notificationToken: string): ApiAction => createAction({
  actionName: 'register_notifications',
  query: `
    mutation registerNotifictions($notificationToken: String!) {
        registerNotifictions(NotificationToken: $notificationToken) {
            Notification_Token
        }
    }
  `,
  getVariables: () => ({
    notificationToken
  }),
  handleResponse: (options) => {
    const token: string = options.response.data.Notification_Token

    options.dispatch({
      type: options.KEY_RECEIVE,
      response: options.response,
      token
    })
  }
})
