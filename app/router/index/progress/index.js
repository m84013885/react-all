import style from './index.css'
const { View } = window.QUI
import Image from '../image'
const { PROGRESS_INFOS } = window.customTexts
const { stage } = window.serverData
class Progress extends React.Component {
  render () {
    const stateInfo = PROGRESS_INFOS[stage - 1]
    return (
      <View className={style.progressWrapper}>
        {/* 进度条 */}
        <View className={style.progress}>
          <View className={style.progressBar}>
            <View className={style[`progressBarInner${stage}`]}></View>
          </View>
          <Image className={style[`dot${stage}`]}></Image>
        </View>
        {/* 进度条文字 */}
        <View className={style.progressInfos}>
          <View className={style.progressInfoItem}>
            <View>{PROGRESS_INFOS[0].title}</View>
            <View>11/08-11/11</View>
          </View>
          <View className={style.progressInfoItem}>
            <View>{PROGRESS_INFOS[1].title}</View>
            <View>11/10-11/11</View>
          </View>
          <View className={style.progressInfoItem}>
            <View>{PROGRESS_INFOS[2].title}</View>
            <View>11/11</View>
          </View>
        </View>
        <View className={style.currentMessage}>
          <View className={style.messageTitle}>{stateInfo.title}</View>
          <View>
            {
              stateInfo.infos.map((item, index) => {
                return (<View key={index} className={style.messageItem}>{item}</View>)
              })
            }
          </View>
        </View>
      </View>

    )
  }
}

export default Progress
