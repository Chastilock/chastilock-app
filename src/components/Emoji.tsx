import React from 'react'
import Image from './Image'

import mapping from '../assets/images/emojis/emojiMapping.json'
import YELLOW from '../assets/images/emojis/yellow.png'

export const EMOJI_TYPE = {
  YELLOW
}

interface EmojiProps {
  name: string
  type: any
  size: number
}
const Emoji = (props: EmojiProps): React.ReactElement => {
  const zoom = props.size / 128
  return <Image src={props.type} sprite={{ mapping, name: props.name, zoom }} width={1280} height={1280} />
}

export default Emoji
