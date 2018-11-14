import style from './index.css'
import Image from '../image'
const { View } = window.QUI
const { actorInfo } = window.serverData
class ActorBox extends React.Component {
  render () {
    if (!actorInfo) {
      return null
    }
    return (
      <View className={style.actorBox}>
        <View className={style.actorInfo}>
          <View className={style.infoLeft}>
            <Image className={style.portrait} style={{ backgroundImage: `url(${actorInfo.headurl})` }} />
            <View className={style.name}>{actorInfo.name}</View>
          </View>
          <View className={style.infoRight}>
            <View className={style.infoItem}>
              <View className={style.infoTitle}>购物值总计</View>
              <View className={style.infoContent}>{actorInfo.allScore}</View>
            </View>
            <View className={style.infoItem}>
              <View className={style.infoTitle}>总榜排名</View>
              <View className={style.infoContent}>{actorInfo.allrank}</View>
            </View>
            <View className={style.infoItem}>
              <View className={style.infoTitle}>今日购物值</View>
              <View className={style.infoContent}>{actorInfo.todayScore}</View>
            </View>
            <View className={style.infoItem}>
              <View className={style.infoTitle}>日榜排名</View>
              <View className={style.infoContent}>{actorInfo.rank}</View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default ActorBox
