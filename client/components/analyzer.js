import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button, Container, Form, Loader} from 'semantic-ui-react'
import {
  getTrainInputThunk,
  getTrainOutputThunk,
  getTestInputThunk,
  getTestOutputThunk
} from '../store/skydiver'
// import { runAnalysis } from '../neuralnetwork'
const synaptic = require('synaptic')
const Trainer = synaptic.Trainer
const Architect = synaptic.Architect

const myNetwork = new Architect.Perceptron(6, 6, 6, 2)
const trainer = new Trainer(myNetwork)

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
    this.train = this.train.bind(this)
    this.handleTestClick = this.handleTestClick.bind(this)
    this.handleTrainClick = this.handleTrainClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  train() {
    let inputArr = this.props.trainSetInput.map(elem => [
      elem.age,
      elem.gender,
      elem.jumps,
      elem.occupation,
      elem.region,
      elem.reserveRide
    ])
    let outputArr = this.props.trainSetOutput.map(elem => [
      elem.incident,
      elem.fatality
    ])

    let trainingSet = []

    for (let i = 0; i < 10000; i++) {
      let trainSetObj = {
        input: inputArr[i],
        output: outputArr[i]
      }
      trainingSet.push(trainSetObj)
    }

    trainer.train(trainingSet, {
      rate: 0.001,
      iterations: 2000,
      error: 0.05,
      shuffle: true,
      log: 500,
      cost: Trainer.cost.CROSS_ENTROPY
    })
    console.log('training complete!')
  }

  handleTestClick() {
    this.props.getTestInput() //returns all the input attributes for test set
    this.props.getTestOutput() //returns all the output attributes for test set
  }
  handleTrainClick() {
    this.props.getTrainInput() //returns all the input attributes for train set
    this.props.getTrainOutput() //returns all the output attributes for train set
  }

  handleSubmit() {
    console.log('this is what you get with submit', this.state)
    const body = this.state
    const dataInput = [
      body.age,
      body.gender,
      body.jumps,
      body.occupation,
      body.region,
      body.reserveRide
    ]
    console.log(dataInput)
    const results = myNetwork.activate(dataInput)
    console.log('results', results)
    if (results[0] < 0.02 && results[1] < 0.002) {
      console.log('RISK LEVEL LOW')
    } else if (results[0] < 0.05 && results[1] < 0.005) {
      console.log('RISK LEVEL MED')
    } else if (results[0] >= 0.05 || results[1] >= 0.005) {
      console.log('RISK LEVEL HIGH')
    }
  }

  handleChange(event, {name, value}) {
    if (value === undefined) {
      this.setState({
        reserveRide: 1
      })
    } else {
      this.setState({
        [name]: parseInt(value)
      })
    }
  }

  render() {
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
        <Button onClick={this.handleTrainClick}>Collect Training Data</Button>
        <Button onClick={this.handleTestClick}>Collect Testing Data</Button>
        <Button onClick={this.train}>Train</Button>

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
              name="gender"
              label="Gender"
              options={genderOps}
              placeholder="Gender"
              onChange={this.handleChange}
            />
            <Form.Select
              fluid
              name="occupation"
              label="Occupation"
              options={occupationOps}
              placeholder="Occupation"
              onChange={this.handleChange}
            />
            <Form.Select
              fluid
              name="region"
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
          <Form.Checkbox
            label="Have you had a reserve ride this year?"
            name="reserveRide"
            // value='1'
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
    trainSetInput: state.skydiver.trainSetInput,
    trainSetOutput: state.skydiver.trainSetOutput,
    testSetInput: state.skydiver.testSetInput,
    testSetOutput: state.skydiver.testSetOutput
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getTestInput: () => dispatch(getTestInputThunk()),
    getTestOutput: () => dispatch(getTestOutputThunk()),
    getTrainInput: () => dispatch(getTrainInputThunk()),
    getTrainOutput: () => dispatch(getTrainOutputThunk())
    // runAnalysisSet: (input, output) => dispatch(runAnalysis(input, output))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Analyzer)
