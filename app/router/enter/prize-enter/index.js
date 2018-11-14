import style from './index.css'
import AnimationFrame from '../animFrame'

const { View } = window.QUI
const PRIZE_CSS = [style.prizeBox, style.prizeBoxShow]
class ProgressEnter extends React.Component {
  propTypes = {
    msg: PropTypes.object,
    onGetPrize: PropTypes.func
  }

  constructor (props) {
    super(props)
    this.state = {
      prizeShow: 0,
      timeCount: 0,
      timerOver: false
    }
  }

  handleBoxTap = () => {
    this.props.onGetPrize()
  }

  componentDidUpdate (prevProps) {
    const { msg } = this.props
    const status = msg.s
    if (prevProps.msg.s !== status) {
      let timeCount = 0
      if (status === 1) { // 不可点击倒计时
        timeCount = msg.t
      }
      else if (status === 2 || status === 4) { // 可点击倒计时
        timeCount = msg.c
      }
      this.setState({
        timerOver: false
      })
      if (timeCount !== 0) {
        this.setState({
          timeCount
        }, () => {
          this.startTimer(timeCount)
        })
      }
    }
  }

  componentDidMount () {
    this.initAnimFrame()
  }

  componentWillUnmount () {
    clearTimeout(this.speedTimer)
    this.frameAnimation.destroy()
  }

  startTimer (timeCount) {
    clearTimeout(this.speedTimer)
    let count = 0
    const startTime = new Date().getTime()
    const timeoutCallback = (next) => {
      timeCount--
      count++
      if (timeCount < 0) {
        this.setState({ timerOver: true })
        clearTimeout(this.speedTimer)
        return
      }
      this.updateTimeCount(timeCount)
      const offset = new Date().getTime() - (startTime + count * 1000)
      let nextTime = 1000 - offset
      if (nextTime < 0) {
        nextTime = 0
      }
      this.speedTimer = setTimeout(timeoutCallback, nextTime)
    }
    this.speedTimer = setTimeout(timeoutCallback, 1000)
  }

  updateTimeCount (timeCount) {
    this.setState({
      timeCount
    })
  }

  initAnimFrame () {
    this.frameAnimation = new AnimationFrame({
      time: 40,
      canvas: this.refCanvas,
      path: 'https://static.app-remix.com/activityWeb/activityDouble11/assets/images/',
      type: '.png',
      frame: {
        width: this.refCanvas.width,
        height: this.refCanvas.height
      }
    })
    this.playFrame()
  }

  playFrame () {
    const conf = {
      id: 'id',
      count: 49,
      prefix: 'dw',
      time: 10
    }
    this.frameAnimation.preloadImageSource(conf)
  }

  getCanvasRef = (ref) => {
    this.refCanvas = ref
  }

  render () {
    const { msg } = this.props
    const { timeCount, timerOver } = this.state
    let prizeShow = 0
    if (msg.s === 4 && msg.e) {
      prizeShow = 1
    }
    let hidden = false
    // 状态为0，状态为过渡期并且宝箱为0，倒计时结束且宝箱个数为0
    if (msg.s === 0 || (msg.s === 3 && msg.n === 0) || ((!msg.n || msg.n <= 0) && (timerOver || msg.c <= 0))) {
      hidden = true
    }
    return (
      <View className={hidden ? style.wrapperHidden : style.wrapper}>
        <View className={PRIZE_CSS[prizeShow]}>{msg.e}</View>
        <canvas
          className={msg.s === 2 ? style.canvas : style.canvasHidden}
          ref={this.getCanvasRef}
          width="95"
          height="50"></canvas>
        <View className={style.ngbg} tap={this.handleBoxTap}>
          <View className={timeCount <= 0 ? style.timerHidden : style.timer}>倒计时：{timeCount}s</View>
          <View className={!msg.n ? style.countHidden : style.count}>{msg.n}</View>
        </View>
      </View>
    )
  }
}

export default ProgressEnter
