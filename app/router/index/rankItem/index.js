import style from './index.css'
import Image from '../image'
const { View } = window.QUI
import gotoRoom from '../../../utils/gotoRoom'
import asyncFetch from '../../../utils/asyncFetch'
import mustParam from '../../../utils/must'
import sig from '../../../utils/sig'
const { todayTop3, actorList } = window.serverData
class RankItem extends React.Component {
  static propTypes = {
    item: PropTypes.object,
    type: PropTypes.string,
    bg: PropTypes.bool
  }

  static defaultProps = {
    item: {},
    type: 'date',
    bg: true
  }
  requesting = false
  constructor (props) {
    super(props)
    this.state = {
      item: { ...props.item }
    }
  }

  handlePortriatTap = () => {
    const { item, type } = this.props
    if (type !== 'helper') {
      gotoRoom(item)
    }
  }

  followBothRank (uid) {
    todayTop3.forEach(item => {
      if (item.uid === uid) {
        item.follow = 1
      }
    })

    actorList.forEach(item => {
      if (item.uid === uid) {
        item.follow = 1
      }
    })
  }

  handleFollow = async () => {
    const nextItem = this.props.item
    if (nextItem.follow === 1 || this.requesting) {
      return
    }
    this.requesting = true
    // nextItem.follow = 1
    // this.followBothRank(nextItem.uid)
    // this.setState({ item: nextItem })
    // return
    try {
      console.log('follow')
      const { apiURL, user_info } = window.serverData
      const paramer = mustParam()
      const body = {
        source: user_info.source,
        source_id: user_info.uid,
        to_source: nextItem.source,
        to_source_id: nextItem.uid
      }
      const sigObj = sig(paramer, body)
      const url = `${apiURL}?sig=${sigObj.sig}&${sigObj.str}`
      const res = await asyncFetch({
        url: url,
        method: 'POST',
        obj: body
      })
      this.requesting = false
      if (res.err !== 0) {
        window.mtoast.show(res.err_msg)
        return false
      }
      this.followBothRank(nextItem.uid)
      // nextItem.follow = 1
      this.setState({
        item: nextItem
      })
    }
    catch (err) {
      this.requesting = false
      window.mtoast.show('服务器异常')
    }
  }

  render () {
    const stateItem = this.state.item
    const { item, type, bg } = this.props
    const portraitRank = item.rank > 3 || type !== 'shop' ? '' : item.rank
    const portraitSize = item.rank > 4 && type === 'shop' ? 'small' : ''
    return (
      <View className={bg ? style.rankItem : style.rankItemNoBg}>
        <View className={style.rank}>{item.rank}</View>
        <View className={style[`portraitWrapper${portraitRank}`]}>
          <View
            tap={this.handlePortriatTap}
            className={style[`portrait${portraitSize}`]}
            style={{ backgroundImage: `url(${item.headurl})` }}>
            {item.live ? <Image className={style.liveTag}></Image> : null}
          </View>
        </View>
        <View className={style.centerInfo}>
          <View className={style.name}>{item.name}</View>
          {type === 'date' ? <View className={style.count}>购物值 {item.num}</View> : null}
        </View>
        <View className={style.rightInfo}>
          {type === 'helper' || type === 'shop' ? <View className={style.count}>{item.num}</View> : null}
          {(type === 'shop' || type === 'date') && item.rank < 4 ? <View className={item.follow ? style.buttonFollowed : style.buttonFollow} tap={this.handleFollow}>关注</View> : null}
        </View>
      </View>
    )
  }
}

export default RankItem
