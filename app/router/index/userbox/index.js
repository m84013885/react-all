import style from './index.css'
const { View } = window.QUI
import Image from '../image'
import Chain from '../chain'
const { userInfo } = window.serverData
class UserBox extends React.Component {
  render () {
    if (!userInfo) {
      return null
    }
    return (
      <Chain>
        <View className={style.infoBox}>
          <Image className={style.infoPortrait} style={{ backgroundImage: `url(${userInfo.headurl})` }}></Image>
          <View className={style.infos}>
            <View className={style.name}>{userInfo.name}</View>
            <View className={style.allowance}>我的津贴：{userInfo.allowance}</View>
          </View>
        </View>
      </Chain>
    )
  }
}

export default UserBox
