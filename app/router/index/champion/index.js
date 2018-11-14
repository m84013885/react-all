import style from './index.css'
import gotoRoom from '../../../utils/gotoRoom'
const { View } = window.QUI
const { yestodayChampion } = window.serverData
class Champion extends React.Component {
  handlePotraitTap = () => {
    gotoRoom(yestodayChampion)
  }

  render () {
    if (!yestodayChampion) {
      return null
    }
    return (
      <View className={style.champion}>
        <View className={style.item}>
          <View className={style.text}>昨日冠军</View>
          <View className={style.portraitChampion}>
            <View className={style.portrait} style={{ backgroundImage: `url(${yestodayChampion.headurl})` }} tap={this.handlePotraitTap}></View>
          </View>
          <View className={style.name}>{yestodayChampion.name}</View>
        </View>
        <View className={style.item}>
          <View className={style.text}>最佳助力</View>
          <View className={style.portraitHelper}>
            <View className={style.portrait} style={{ backgroundImage: `url(${yestodayChampion.top1headurl})` }}></View>
          </View>
          <View className={style.name}>{yestodayChampion.top1name}</View>
        </View>
      </View>
    )
  }
}

export default Champion
