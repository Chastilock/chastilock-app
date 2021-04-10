import React from 'react'
import { Image as NativeImage, View } from 'react-native'

export interface SpriteMapping {
  name: String
  xStart: number
  yStart: number
  width: number
  height: number
}

export interface ImageProps {
  src: any
  sprite?: {
    mapping: SpriteMapping[]
    name: string
    zoom?: number
  }
  height: number
  width: number
}
const Image = (props: ImageProps): React.ReactElement => {
  const style: any = {}
  const imageStyle: any = {}

  if (props.sprite !== undefined) {
    const mapping = props.sprite.mapping.filter(m => m.name === props.sprite?.name)[0]
    style.width = mapping.width
    style.height = mapping.height
    imageStyle.marginLeft = -mapping.xStart
    imageStyle.marginTop = -mapping.yStart
    style.overflow = 'hidden'
    style.zoom = props.sprite.zoom
  }

  imageStyle.height = props.height
  imageStyle.width = props.width

  return <View style={style}><NativeImage source={props.src} style={imageStyle} /></View>
}

export default Image
