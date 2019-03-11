import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button, Container, Form, Icon, Table, Segment} from 'semantic-ui-react'
import {
  getTrainInputThunk,
  getTrainOutputThunk,
  getTestInputThunk,
  getTestOutputThunk
} from '../store/skydiver'

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
      reserveRide: 0,
      renderOutcome: '',
      color: '',
      error: 0,
      iterations: 0,
      rate: 0,
      results: [],
      riskLevel: ''
    }
    this.train = this.train.bind(this)
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

    for (let i = 0; i < 20000; i++) {
      let trainSetObj = {
        input: inputArr[i],
        output: outputArr[i]
      }
      trainingSet.push(trainSetObj)
    }
    let results = {}
    trainer.train(trainingSet, {
      rate: 0.001,
      iterations: 2000,
      error: 0.05,
      shuffle: true,
      log: 500,
      cost: Trainer.cost.CROSS_ENTROPY,
      schedule: {
        every: 2000,
        do: function(data) {
          console.log(
            'error',
            data.error,
            'iterations',
            data.iterations,
            'rate',
            data.rate
          )
          results = data
        }
      }
    })

    this.setState({
      error: results.error,
      iterations: results.iterations,
      rate: results.rate
    })
    console.log('training complete!', results)
  }

  handleTrainClick() {
    this.props.getTrainInput()
    this.props.getTrainOutput()
  }

  handleSubmit() {
    const body = this.state
    let dataInput = [
      body.age,
      body.gender,
      body.jumps,
      body.occupation,
      body.region,
      body.reserveRide
    ]
    console.log(dataInput)
    let results = myNetwork.activate(dataInput)
    // let incidentRisk = results[0] * 1000000 //50,000
    // let deathRisk = results[1] * 1000000 //1,000

    console.log('results', results)
    if (results[0] < 0.055 && results[1] < 0.00066) {
      this.setState('RISK LEVEL LOW')
      this.setState({
        renderOutcome: 'thumbs up outline',
        color: 'green',
        riskLevel: 'LOW'
      })
    } else if (results[0] < 0.06 && results[1] < 0.00068) {
      console.log('RISK LEVEL MED')
      this.setState({
        renderOutcome: 'exclamation triangle',
        color: 'yellow',
        riskLevel: 'MED'
      })
    } else if (results[0] >= 0.06 || results[1] >= 0.00068) {
      console.log('RISK LEVEL HIGH')
      this.setState({
        renderOutcome: 'thumbs down outline',
        color: 'red',
        riskLevel: 'HIGH'
      })
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
      {key: 'm', text: 'Male', value: 1},
      {key: 'f', text: 'Female', value: 0}
    ]

    const regionOps = [
      {key: 1, text: 'Central', value: 1},
      {key: 2, text: 'East', value: 2},
      {key: 3, text: 'Foreign', value: 3},
      {key: 4, text: 'Gulf', value: 4},
      {key: 5, text: 'Midatlantic', value: 5},
      {key: 6, text: 'Mideast', value: 6},
      {key: 7, text: 'Mountain', value: 7},
      {key: 8, text: 'North Central', value: 8},
      {key: 9, text: 'Northeast', value: 9},
      {key: 10, text: 'Northwest', value: 10},
      {key: 11, text: 'Pacific', value: 11},
      {key: 12, text: 'Southeast', value: 12},
      {key: 13, text: 'South', value: 13},
      {key: 14, text: 'Southwest', value: 14},
      {key: 15, text: 'West', value: 15}
    ]

    const occupationOps = [
      {key: 'occ1', text: 'Engineering/Science', value: 1},
      {key: 'occ2', text: 'Military', value: 2},
      {key: 'occ3', text: 'Business', value: 3},
      {key: 'occ4', text: 'Medicine', value: 4},
      {key: 'occ5', text: 'Retired', value: 5},
      {key: 'occ6', text: 'Labor', value: 6}
    ]

    return (
      <Container>
        <Button onClick={this.handleTrainClick}>Collect Training Data</Button>
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
            onChange={this.handleChange}
          />
          <Form.Button>Jump or Dump?</Form.Button>
          {this.state.renderOutcome !== '' ? (
            <div>
              <Icon
                name={this.state.renderOutcome}
                size="massive"
                color={this.state.color}
              >
                {this.state.riskLevel}
              </Icon>
            </div>
          ) : (
            <div>
              <Table striped>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Parameter</Table.HeaderCell>
                    <Table.HeaderCell>Value</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  <Table.Row>
                    <Table.Cell>Error</Table.Cell>
                    <Table.Cell>
                      {(this.state.error * 100).toFixed(2)}%
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Iterations</Table.Cell>
                    <Table.Cell>{this.state.iterations}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Rate</Table.Cell>
                    <Table.Cell>{this.state.rate}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </div>
          )}
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
