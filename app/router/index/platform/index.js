const { View } = window.QUI
import style from './index.css'
import Image from '../image'
import Progress from '../progress'
import UserBox from '../userbox'
import Treasure from '../treasure'
import ActorBox from '../actorBox'
class Platform extends React.Component {
  render () {
    return (
      <View className={style.platform}>
        <Treasure />
        <Image className={style.platformTopBoard}>
        </Image>
        <View className={style.platformContainerOuter}>
          <View className={style.platformContainer}>
            <Progress />
          </View>
        </View>
        <ActorBox />
        <UserBox />
      </View>
    )
  }
}

export default Platform
