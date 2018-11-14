const { View } = window.QUI
import style from './index.css'
import Chain from '../chain'
import Champion from '../champion'
import RankItem from '../rankItem'
import Image from '../image'
const { todayTop3, actorList, richerList } = window.serverData

function DateItem (props) {
  return (
    <View className={style.dateItem}>
      <RankItem item={props.item} type="date" bg={false} />
      <View className={style.dateTopItem}>
        <Image className={style.topPortrait} style={{ backgroundImage: `url(${props.item.top1headurl})` }} />
        <View className={style.topInfos}>
          <View className={style.topName}>{props.item.top1name}</View>
          <View className={style.topNum}>贡献值 {props.item.top1point}</View>
        </View>
        <Image className={style.topTag}></Image>
      </View>
    </View>
  )
}
DateItem.propTypes = { item: PropTypes.object }

function RankDate (props) {
  return (
    <View className={style.dateRank}>
      <Champion />
      <View className={style.dateRankList}>
        {
          todayTop3.map(item => <DateItem item={item} key={item.rank} />)
        }
      </View>
    </View>
  )
}

function RankShop (props) {
  return (
    <View className={style.rankList}>
      <View className={style.rankHeader}>
        <View className={style.header1}>排名</View>
        <View className={style.header2}>主播昵称</View>
        <View className={style.header3}>购物值</View>
      </View>
      <View className={style.shopRank}>
        {
          actorList.map(item => <RankItem item={item} type="shop" key={item.rank} />)
        }
      </View>
    </View>
  )
}
function RankHelper (props) {
  return (
    <View className={style.rankList}>
      <View className={style.rankHeader}>
        <View className={style.header1}>排名</View>
        <View className={style.header2}>主播昵称</View>
        <View className={style.header3}>贡献值</View>
      </View>
      <View className={style.shopRank}>
        {
          richerList.map(item => <RankItem item={item} type="helper" key={item.rank} />)
        }
      </View>
    </View>
  )
}
class Rank extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      type: 0
    }
  }

  handleTypeChange (type) {
    this.setState({ type })
  }

  renderSwitcher () {
    const { type } = this.state
    return (
      <Chain className={style.rankChecker} infoClassName={style.infoClassName} chainPos="bottom">
        <View className={style.buttonSwicther}>
          <View className={style.buttonSwitchBorder}>
            <View className={type === 0 ? style.buttonSwitchActive : style.buttonSwitchDefault}
              tap={() => this.handleTypeChange(0)}>日榜</View>
          </View>
          <View className={style.buttonSwitchBorder}>
            <View className={type === 1 ? style.buttonSwitchActive : style.buttonSwitchDefault}
              tap={() => this.handleTypeChange(1)}>购物榜</View>
          </View>
          <View className={style.buttonSwitchBorder}>
            <View className={type === 2 ? style.buttonSwitchActive : style.buttonSwitchDefault}
              tap={() => this.handleTypeChange(2)}>助力榜</View>
          </View>
        </View>
      </Chain>
    )
  }

  renderRank () {
    const { type } = this.state
    if (type === 0) {
      return <RankDate />
    }
    else if (type === 1) {
      return <RankShop />
    }
    else {
      return <RankHelper />
    }
  }

  render () {
    return (
      <View className={style.rankWrapper}>
        {this.renderSwitcher()}
        <View className={style.rankPanel}>
          {this.renderRank()}
        </View>
      </View>
    )
  }
}

export default Rank
