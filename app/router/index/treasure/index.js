import style from './index.css'
const { View } = window.QUI
import MultiImage from '../image/multi'
const { stage } = window.serverData
class Treasure extends React.Component {
  render () {
    return (
      <View className={style.treasure}>
        <View className={style.treasureItem}>
          <MultiImage index={1} multiClassName={[style.treasureBox1Off, style.treasureBox1On]} />
        </View>
        <View className={style.treasureItem}>
          <MultiImage index={stage >= 2 ? 1 : 0} multiClassName={[style.treasureBox2Off, style.treasureBox2On]} />
        </View>
        <View className={style.treasureItem}>
          <MultiImage index={stage >= 3 ? 1 : 0} multiClassName={[style.treasureBox3Off, style.treasureBox3On]} />
        </View>
      </View>
    )
  }
}

export default Treasure
