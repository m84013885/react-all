import style from './index.css'
const { View } = window.QUI
import { goCharge } from '../../../utils/goto'
import device from '../../../utils/index'
const { ALLOWANCE, TIP } = window.customTexts
class AllowancePanel extends React.Component {
  handleGoCharge () {
    goCharge({})
  }

  renderTbody () {
    let counter = 0
    return ALLOWANCE.map((item, index) => {
      counter++
      return (
        <tr key={index}>
          <td>{item.money}</td>
          <td>{item.withoutAllowance}</td>
          {
            counter !== ALLOWANCE.length && index !== item.length ? (<td>
              <span className={style.withAllowance}>{item.withAllowance}</span>
              <span className={style.allowanceCount}>(需{item.allowance}津贴)</span>
              <span className={style.discount}>{item.discount}折</span>
            </td>)
              : (<td className={style.lineTd}><span></span></td>)
          }
        </tr>
      )
    })
  }

  render () {
    return (
      <View className={style.allowancePanel}>
        <View className={style.allowanceTable}>
          <table className={style.table}>
            <thead>
              <tr>
                <td rowSpan="2">充值金额(元)</td>
                <td colSpan="2">共获钻石</td>
              </tr>
              <tr>
                <td>无津贴</td>
                <td>有津贴</td>
              </tr>
            </thead>
            <tbody>
              {this.renderTbody()}
            </tbody>
          </table>
        </View>
        {
          device.app === 0 ? <View className={style.iosTip}>{TIP}</View>
            : <View className={style.buttonFuli} tap={this.handleGoCharge}>领取福利</View>
        }
      </View>
    )
  }
}

export default AllowancePanel
