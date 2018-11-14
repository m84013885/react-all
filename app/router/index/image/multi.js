import Image from './index'

class MultiImage extends React.Component {
  static propTypes = {
    multiClassName: PropTypes.array,
    index: PropTypes.number
  }

  static defaultProps = {
    multiClassName: [],
    index: 0
  }

  render () {
    const { multiClassName, index } = this.props
    return (
      <Image {...this.props} className={multiClassName[index]}></Image>
    )
  }
}

export default MultiImage
