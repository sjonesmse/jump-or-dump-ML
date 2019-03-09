import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button, Container, Form, Input, Select} from 'semantic-ui-react'
import {
  addSkydiverThunk,
  getSkydiverThunk,
  getAllSkydiversThunk,
  getTestSkydiversThunk,
  getTrainSkydiversThunk
} from '../store/skydiver'

class Analyzer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      age: 0,
      gender: 0,
      occupation: 0,
      region: 0,
      jumps: 0,
      reserveRide: 0
    }
    this.runAnalysis = this.runAnalysis.bind(this)
    this.handleTestClick = this.handleTestClick.bind(this)
    this.handleTrainClick = this.handleTrainClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  // need a function for training data set (tie to a button, generate a map of the error value decreasing)
  // need a function for testing data set (are these diff?)
  // need to be able to take inputs from a form and run them through the network to produce a response (yes/no, or risk level)
  runAnalysis() {}

  handleTestClick() {
    this.props.getTestSet()
  }
  handleTrainClick() {
    this.props.getTrainSet()
  }

  handleSubmit() {
    console.log('this is what you get with submit', this.state)
    const body = this.state
  }

  handleChange(event, {name, value}) {
    this.setState({
      [name]: parseInt(value)
    })
  }

  render() {
    const {age, gender, occupation, region, jumps, reserveRide} = this.state

    const genderOps = [
      {key: 'm', text: 'Male', value: 1}, //double check these values
      {key: 'f', text: 'Female', value: 0}
    ]

    const regionOps = [
      {key: 1, text: 'North', value: 1},
      {key: 2, text: 'South', value: 2}
    ]

    const occupationOps = [
      {key: 'occ1', text: 'Retired', value: 1},
      {key: 'occ2', text: 'Military', value: 2}
    ]

    return (
      <Container>
        <Button onClick={this.handleTrainClick}>Train The Brain!</Button>
        <Button onClick={this.handleTestClick}>Run Test Analysis</Button>

        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              name="age"
              label="Age"
              placeholder="Age"
              onChange={this.handleChange}
            />
            <Form.Select
              fluid
              label="Gender"
              options={genderOps}
              placeholder="Gender"
              onChange={this.handleChange}
            />
            <Form.Select
              fluid
              label="Occupation"
              options={occupationOps}
              placeholder="Occupation"
              onChange={this.handleChange}
            />
            <Form.Select
              fluid
              label="Region"
              options={regionOps}
              placeholder="Region"
              onChange={this.handleChange}
            />
            <Form.Input
              fluid
              name="jumps"
              label="Number of Jumps"
              placeholder="Jumps"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Radio
            label="Have you had a reserve ride this year?"
            name="reserveRide"
            value="1"
            checked={reserveRide === '1'}
            onChange={this.handleChange}
          />
          <Form.Button>Jump or Dump?</Form.Button>
        </Form>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    selectedSkydiver: state.skydiver.selectedSkydiver,
    skydivers: state.skydiver.skydivers,
    trainSet: state.skydiver.trainSet,
    testSet: state.skydiver.testSet
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllSkydivers: () => dispatch(getAllSkydiversThunk()),
    getSkydiver: skydiver => dispatch(getSkydiverThunk(skydiver)),
    addSkydiver: skydiver => dispatch(addSkydiverThunk(skydiver)),
    getTestSet: () => dispatch(getTestSkydiversThunk()),
    getTrainSet: () => dispatch(getTrainSkydiversThunk())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Analyzer)
