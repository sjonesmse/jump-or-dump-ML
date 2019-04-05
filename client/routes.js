import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import {Analyzer, NewChart} from './components'

class Routes extends Component {
  componentDidMount() {
    // this.props.loadInitialData()
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" component={Analyzer} />
        {/* <Route exact path="/chart" component={NewChart} /> */}
      </Switch>
    )
  }
}

// /**
//  * CONTAINER
//  */
// const mapState = state => {
//   return {
//     // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
//     // Otherwise, state.user will be an empty object, and state.user.id will be falsey
//     isLoggedIn: !!state.user.id
//   }
// }

// const mapDispatch = dispatch => {
//   return {
//     loadInitialData() {
//       dispatch(me())
//     }
//   }
// }

export default Routes
