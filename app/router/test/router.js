const { View } = window.QUI
import style from './css.css'
import { Provider } from 'mobx-react'
import stores from './stores'
import Main from './main'

class Router extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
        
    }
  }


  render () {
    return (
        <Provider {...stores}>
            <View className={style.container}>
                <Main/>
            </View>
        </Provider>
    )
  }
}

export default Router
