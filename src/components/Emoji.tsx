import React from 'react'
import Image from './Image'

import mapping from '../assets/images/emojis/emojiMapping.json'

import BLUE from '../assets/images/emojis/blue.png'
import GREEN from '../assets/images/emojis/green.png'
import ORANGE from '../assets/images/emojis/orange.png'
import PURPLE from '../assets/images/emojis/purple.png'
import RED from '../assets/images/emojis/red.png'
import WHITE from '../assets/images/emojis/white.png'
import YELLOW from '../assets/images/emojis/yellow.png'

export const EMOJI_TYPE = {
  BLUE,
  GREEN,
  ORANGE,
  PURPLE,
  RED,
  WHITE,
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
