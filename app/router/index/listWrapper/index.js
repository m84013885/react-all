import style from './index.css'
import PropTypes from 'prop-types'

class ListWrapper extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
  }

  static defaultProps = {
    className: ''
  }

  render () {
    const { children, className } = this.props
    return (
      <div className={`${style.listBgContainer} ${className}`}>
        <div className={style.listWrapper}>
          <div className={style.bg}></div>
          <div className={style.lists}>
            {children}
          </div>
        </div>
      </div>
    )
  }
}

export default ListWrapper
