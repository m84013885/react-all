import { observer, inject } from 'mobx-react'
import Toast from './toast'
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
        <Toast/>
      </View>
    )
  }
}

export default Main
