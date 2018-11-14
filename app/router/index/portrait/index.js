import style from './index.css'
import PropTypes from 'prop-types'
const { View } = window.QUI
class Portrait extends React.Component {
  static propTypes = {
    src: PropTypes.string,
    bg: PropTypes.bool,
    live: PropTypes.bool,
    fullsize: PropTypes.fullsize,
    className: PropTypes.string,
    onTap: PropTypes.func
  }

  static defaultProps = {
    src: 'http://avatar.app-remix.com/live_default2.jpg?imageMogr2/format/jpg/thumbnail/300x300/auto-orient"',
    bg: false,
    live: false,
    className: ''
  }

  render () {
    const { src, bg, live, fullsize, className, onTap } = this.props
    let initClassName = ''
    if (fullsize) {
      initClassName = style.portraitFullsize
    }
    if (bg) {
      initClassName = style.portraitBg
    }
    initClassName = initClassName + ' ' + className
    return (
      <View className={initClassName}>
        <View
          tap={onTap}
          className={style.portrait}
          style={{ backgroundImage: `url("${src}")` }}>
          {live ? <View className={style.live}>LIVE</View> : null}
        </View>
      </View>
    )
  }
}

export default Portrait
