import style from './css.css'
const { View } = window.QUI
const TOAST_STYLE = [style.toast, style.toastShow]
class Toast extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      text: '',
      visible: 0
    }
  }

  componentDidMount () {
    window.mtoast = this
  }

  show (text, timeout) {
    timeout = timeout || 3000
    this.setState({
      text,
      visible: 1
    }, () => {
      this.startCloseTimer(timeout)
    })
  }

  startCloseTimer (timeout) {
    window.clearTimeout(this.timer)
    this.timer = window.setTimeout(() => {
      this.setState({
        visible: 0
      })
    }, timeout)
  }

  render () {
    const { text, visible } = this.state
    return (
      <View className={[TOAST_STYLE[visible]]}>
        <View className={style.toastText}>{text}</View>
      </View>
    )
  }
}

export default Toast
