const { View } = window.QUI
import style from './css.css'
import Platform from './platform'
import Image from './image'
import AllowancePanel from './allowancePanel'
import Rank from './rank'
import Rule from './rule'
import Toast from './toast'
const { stage } = window.serverData
class Router extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      ruleShow: 0
    }
  }

  handleRuleShow = (ruleShow) => {
    this.setState({
      ruleShow
    })
  }

  render () {
    return (
      <View className={style.container}>
        <Image className={style.rule} tap={() => { this.handleRuleShow(1) }} />
        <Platform />
        {stage === 3 ? <AllowancePanel /> : null}
        <Rank />
        <View className={style.copyright}>本活动最终解释权归平台所有</View>
        <Toast />
        <Rule
          show={this.state.ruleShow}
          onToggleShow={this.handleRuleShow} />
      </View>
    )
  }
}

export default Router
