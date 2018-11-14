import style from './index.css'
const { View } = window.QUI
class ProgressEnter extends React.Component {
  static propTypes = {
    tap: PropTypes.func,
    msg: PropTypes.object,
    allowanceCount: PropTypes.number
  }

  static defaultProps = {
    allowanceCount: 0
  }

  getBarWidth (current, total) {
    return current / total * 100 + '%'
  }

  render () {
    const { msg, allowanceCount } = this.props
    const num = msg.n || '0'
    const rank = msg.s || '99+'
    return (
      <View className={style.wrapper} tap={this.props.tap}>
        <div className={style.number}>第{rank}名</div>
        <div className={style.progress}>
          <div className={style.bar} style={{ width: this.getBarWidth(msg.n, 1111) }}>
          </div>
        </div>
        <div className={style.progressText}>
          {num}/1111
        </div>
        <div className={style.titleAllowance}>我的津贴</div>
        <div className={style.allowanceCount}>{allowanceCount}</div>
      </View>
    )
  }
}

export default ProgressEnter
