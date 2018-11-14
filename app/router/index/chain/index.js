import style from './index.css'
const { View } = window.QUI
import Image from '../image'
class UserBox extends React.Component {
  static propTypes = {
    children: PropTypes.children,
    className: PropTypes.string,
    chainPos: PropTypes.string,
    infoClassName: PropTypes.string
  }

  static defaultProps = {
    className: '',
    chainPos: 'top'
  }

  render () {
    const { className, chainPos, children, infoClassName } = this.props
    return (
      <View className={`${style.userBox} ${className}`}>
        <Image className={`${style.chainLeft} ${style['chainPos' + chainPos]}`}></Image>
        <Image className={`${style.chainRight} ${style['chainPos' + chainPos]}`}></Image>
        <View className={`${style.infoWrapper} ${infoClassName}`}>
          {children}
        </View>
      </View>
    )
  }
}

export default UserBox
