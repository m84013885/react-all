const { View } = window.QUI
import style from './index.css'

class Image extends React.Component {
  static propTypes = {
    className: PropTypes.string.isRequired
  }
  render () {
    return (
      <View {...this.props} className={`${style.image} ${this.props.className}`}></View>
    )
  }
}

export default Image
