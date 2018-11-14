'use strict'
const { View } = window.QUI
import { Int64BE } from 'int64-buffer'
import style from './css.css'
import { sigFunc1 } from '../../utils/sig'
import must from '../../utils/must'
import msgpack from 'msgpack-lite'
import ProgressEnter from './progress-enter'
import PrizeEnter from './prize-enter'
import { toUrl } from '../../utils/goto'

const serverData = window.serverData
const anchor = serverData.anchor
const dataURL = serverData.dataURL
const source_id = anchor.source_id
const source = anchor.source
const mc_uid = anchor.mc_uid
const mc_source = anchor.mc_source
const router = serverData.router

class Enter extends React.Component {
  reTimes = 0
  speedTimer = null
  boxId = ''
  constructor (props) {
    super(props)
    this.state = {
      msg39: {
        n: 0, // 总榜积分
        s: '99+', // 总榜排名
        d: 0, // 当日积分
        r: '99+' // 当日排名
      },
      msg41: {
        s: 0, // 宝箱状态
        d: 0, // 宝箱id
        t: 0, // 宝箱不可点击时的倒计时
        c: 0, // 宝箱可点击时的倒计时
        n: 0, // 剩余宝箱个数
        e: '', // 奖励文案，可能没有此字段
        u: 0 // 用户津贴数
      },
      allowanceCount: 0
    }
  }

  componentDidMount () {
    window.fakeMessage = this.fakeMessage
    this.initWsParam()
  }

  initWsParam () {
    const paramer = must(0)
    paramer.mc_uid = mc_uid
    paramer.source = source
    paramer.mc_source = mc_source
    paramer.source_id = source_id
    paramer.router = router
    const sigObj = sigFunc1(paramer)
    const url = `${dataURL}?sig=${sigObj.sig}&${sigObj.str}`
    this.wsURL = url
    this.linkWs()
  }

  fakeMessage = (type) => {
    if (type === 1) {
      this.setState({
        msg39: {
          p: 10039,
          n: 6473,
          r: 9
        }
      })
    }
    else if (type === 2) {
      this.setState({
        msg41: {
          s: 1, // 宝箱状态
          d: 378237, // 宝箱id
          t: 60, // 宝箱不可点击时的倒计时
          c: 0, // 宝箱可点击时的倒计时
          n: 1, // 剩余宝箱个数
          e: '' // 奖励文案，可能没有此字段
        }
      })
    }
    else if (type === 3) {
      this.setState({
        msg41: {
          s: 2, // 宝箱状态
          d: 378237, // 宝箱id
          t: 60, // 宝箱不可点击时的倒计时
          c: 120, // 宝箱可点击时的倒计时
          n: 1, // 剩余宝箱个数
          e: '' // 奖励文案，可能没有此字段
        }
      })
    }
    else if (type === 4) {
      this.setState({
        msg41: {
          s: 4, // 宝箱状态
          d: 378237, // 宝箱id
          t: 60, // 宝箱不可点击时的倒计时
          c: 120, // 宝箱可点击时的倒计时
          n: 0, // 剩余宝箱个数
          e: '恭喜你获得' // 奖励文案，可能没有此字段
        }
      })
    }
    else if (type === 5) {
      this.setState({
        msg41: {
          s: 0, // 宝箱状态
          d: 378237, // 宝箱id
          t: 60, // 宝箱不可点击时的倒计时
          c: 10, // 宝箱可点击时的倒计时
          n: 0, // 剩余宝箱个数
          e: '恭喜你获得' // 奖励文案，可能没有此字段
        }
      })
    }
  }

  linkWs () {
    if (this.reTimes >= 300) {
      console.log('重连结束')
      return
    }
    // this.reTimes++
    // this.fakeMessage(3)
    // return
    let ws = null
    try {
      ws = new WebSocket(this.wsURL)
    }
    catch (error) {
      console.log('catch')
      if (this.reTimes === 3) {
        // console.log("重试次数过多")
        return
      }
      this.reTimes++
      // console.log(error)
      const paramer = must(0)
      paramer.mc_uid = mc_uid
      paramer.source = source
      paramer.mc_source = mc_source
      paramer.source_id = source_id
      paramer.router = router
      const sigObj = sig(paramer)
      const url = `${dataURL}?sig=${sigObj.sig}&${sigObj.str}`
      this.wsURL = url
      this.linkWs()
      return
    }
    this.ws = ws
    ws.binaryType = 'arraybuffer'
    let heartbeat = 0
    ws.onopen = () => {
      // 发送心跳包
      this.reTimes = 0
      window.console.log('连接成功')
      this.error = null
      heartbeat = setInterval(() => {
        const ts = new Date().getTime()
        const data = {
          i: Int64BE(source_id),
          d: Int64BE(0),
          p: 10005,
          o: parseInt(source),
          t: Int64BE(ts),
          b: Int64BE(ts),
          m: '',
          c: Int64BE(mc_uid),
          n: parseInt(mc_source)
        }
        const buffer = msgpack.encode(data)
        ws.send(buffer)
      }, 15 * 1000)
    }
    ws.onmessage = (evt) => {
      const arrayBuffer = evt.data
      const u8Array = new Uint8Array(arrayBuffer)
      const options = {
        codec: msgpack.createCodec({
          int64: true
        })
      }
      const data = msgpack.decode(u8Array, options)
      const { p, m } = data
      // 消息
      if (p === 10044) { // 入口消息
        this.setState({
          msg39: m
        })
      }
      else if (p === 10046 || p === 10047) {
        this.boxId = m.d.toString()
        console.log(this.boxId)
        const nextState = {
          msg41: m
        }
        if (p === 10047) {
          nextState.allowanceCount = m.u
        }
        this.setState(nextState)
      }
      console.log(data)
    }
    ws.onclose = () => {
      window.console.log('断开连接,1秒后重连')
      clearInterval(heartbeat)
      setTimeout(() => this.linkWs(), 1000)
      window.console.log('关闭链接')
    }
    ws.onerror = (e) => {
      // 错误处理
      window.console.log(e)
      this.error = e
      ws.close()
    }
    this.ws = ws
  }

  handleGoToActivity () {
    toUrl(window.serverData.activityURL)
  }

  handleGetPrize = () => {
    const { msg41 } = this.state
    if (msg41.s === 2) {
      console.log('领取宝箱')
      const giftSentObj = {
        'm': {
          'd': Int64BE(this.boxId)
        },
        'p': 10048,
        'i': Int64BE(window.serverData.source_id),
        'o': window.serverData.source,
        'c': Int64BE(window.serverData.mc_uid),
        'n': window.serverData.mc_source
      }
      console.log(giftSentObj)
      console.log('jjj')
      const buffer = msgpack.encode(giftSentObj)
      this.ws.send(buffer)
    }
  }

  render () {
    const { msg39, msg41, allowanceCount } = this.state
    return (
      <View className={style.container}>
        <ProgressEnter
          msg={msg39}
          tap={this.handleGoToActivity}
          allowanceCount={allowanceCount}></ProgressEnter>
        <PrizeEnter msg={msg41} onGetPrize={this.handleGetPrize}></PrizeEnter>
      </View>
    )
  }
}
export default Enter
