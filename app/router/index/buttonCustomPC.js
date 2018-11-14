const { View } = window.QUI
import isPC from '../../utils/isPC'
class ButtonCustomPC extends React.Component {
  static propTypes = {
    tap: PropTypes.func,
    className: PropTypes.string,
    style: PropTypes.object
  }

  render () {
    if (isPC()) {
      return (<div onClick={this.props.tap} className={this.props.className} style={this.props.style}></div>)
    }
    else {
      return (<View tap={this.props.tap} className={this.props.className} style={this.props.style}></View>)
    }
  }
}

export default ButtonCustomPC
