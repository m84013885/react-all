import style from './css.css'
import { observer, inject } from 'mobx-react'

const { View } = window.QUI

@inject('store') @observer class Main extends React.Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }

  render () {
    return (
      <View>
        123
      </View>
    )
  }
}

export default Main
