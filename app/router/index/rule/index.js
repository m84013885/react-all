const { View, ScrollView } = window.QUI
import style from './index.css'
import Image from '../image'
const RULE_CLASS = [style.ruleLayer, style.ruleLayerShow]
const { RULE_TEXTS, PRIZE_TEXTS, PRIZE_TIP, PRIZE_TIP_TEXTS } = window.customTexts
function RuleTitle (props) {
  return (
    <View className={style.ruleSmallTitle}>
      <Image className={style.ruleStar} />
      <View className={style.ruleLable}>{props.label}</View>
      <Image className={style.ruleStar} />
    </View>
  )
}
RuleTitle.propTypes = { label: PropTypes.string }

function RuleTable (props) {
  const { data } = props
  return (
    <table className={style.ruleTable}>
      <thead>
        <tr>
          {
            data.thead.map((item, index) => <td key={index}>{item}</td>)
          }
        </tr>
      </thead>
      <tbody>
        {
          data.tbody.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item[0]}</td>
                <td>{item[1]}</td>
                <td>{item[2]}</td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}
RuleTable.propTypes = { data: PropTypes.object }

function RuleContentItem (props) {
  const { item } = props
  return (
    <View className={style.ruleContentItem}>
      <RuleTitle label={item.title} />
      <View className={style.ruleContents}>
        {
          item.contents.map((item, index) => {
            return <View className={style.ruleItem} key={index}>{item}</View>
          })
        }
      </View>
      {item.table ? <RuleTable data={item.table} /> : null}
    </View>
  )
}
RuleContentItem.propTypes = { item: PropTypes.object }

function PrizeTable (props) {
  const { data } = props
  return (
    <table className={style.prizeTable}>
      <thead>
        <tr>
          <td>主播排名</td>
          <td>奖励</td>
        </tr>
      </thead>
      <tbody>
        {
          data.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item[0]}</td>
                <td>{item[1]}</td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}
PrizeTable.propTypes = { data: PropTypes.object }

class Rule extends React.Component {
  static propTypes = {
    show: PropTypes.number,
    onToggleShow: PropTypes.func
  }

  handleClose = () => {
    this.props.onToggleShow(0)
  }

  render () {
    return (
      <View className={RULE_CLASS[this.props.show]}>
        <View className={style.ruleBox}>
          <View className={style.closeButton} tap={this.handleClose}></View>
          <ScrollView className={style.ruleContainer}>
            <View className={style.ruleTitle}>活动规则</View>
            <View className={style.ruleContent}>
              {
                RULE_TEXTS.map((item, index) => <RuleContentItem item={item} key={index} />)
              }
            </View>
            <View className={style.ruleTitlePrize}>活动奖励</View>
            <View className={style.rulePrizeTime}>{PRIZE_TIP}</View>
            <View className={style.ruleContent}>
              <PrizeTable data={PRIZE_TEXTS} />
              <View className={style.ruleContents}>
                {
                  PRIZE_TIP_TEXTS.map((item, index) => {
                    return <View className={style.ruleItem} key={index}>{item}</View>
                  })
                }
              </View>
            </View>
            <View className={style.fillHeight}></View>
          </ScrollView>
        </View>
      </View>
    )
  }
}

export default Rule
