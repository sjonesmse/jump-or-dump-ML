import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import {Analyzer} from './components'

class Routes extends Component {
  componentDidMount() {
    // this.props.loadInitialData()
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" component={Analyzer} />
      </Switch>
    )
  }
}

export default Routes
