import axios from 'axios'
// import history from '../history'

/**
 * ACTION TYPES
 */
const GET_SKYDIVER = 'GET_SKYDIVER'
const GET_SKYDIVERS = 'GET_SKYDIVERS'
const ADD_SKYDIVER = 'ADD_SKYDIVER'
const GET_TRAIN_INPUT = 'GET_TRAIN_INPUT'
const GET_TRAIN_OUTPUT = 'GET_TRAIN_OUTPUT'

/**
 * INITIAL STATE
 */
const initialState = {
  selectedSkydiver: {},
  skydivers: [],
  trainSetInput: [],
  trainSetOutput: []
}

/**
 * ACTION CREATORS
 */
const getSkydiver = skydiver => ({type: GET_SKYDIVER, skydiver})
const getSkydivers = skydivers => ({type: GET_SKYDIVERS, skydivers})
const addSkydiver = skydiver => ({type: ADD_SKYDIVER, skydiver})
const getTrainInput = input => ({type: GET_TRAIN_INPUT, input})
const getTrainOutput = output => ({type: GET_TRAIN_OUTPUT, output})

/**
 * THUNK CREATORS
 */
export const getAllSkydiversThunk = () => async dispatch => {
  try {
    const res = await axios.get('/api/skydivers')
    dispatch(getSkydivers(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const getTrainInputThunk = () => async dispatch => {
  try {
    const res = await axios.get('/api/skydivers/trainingSetInput')
    dispatch(getTrainInput(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const getTrainOutputThunk = () => async dispatch => {
  try {
    const res = await axios.get('/api/skydivers/trainingSetOutput')
    dispatch(getTrainOutput(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const addSkydiverThunk = skydiver => async dispatch => {
  try {
    const res = await axios.post('/api/skydivers', skydiver)
    dispatch(addSkydiver(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const getSkydiverThunk = skydiver => async dispatch => {
  try {
    const res = await axios.get(`/skydivers/${skydiver.id}`)
    dispatch(getSkydiver(res.data || initialState.selectedSkydiver))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SKYDIVERS:
      return {...state, skydivers: action.skydivers}
    case GET_SKYDIVER:
      return {...state, selectedSkydiver: action.skydiver}
    case ADD_SKYDIVER:
      return {
        ...state,
        selectedSkydiver: action.skydiver,
        skydivers: [...state.skydivers, action.skydiver]
      }
    case GET_TRAIN_INPUT:
      return {...state, trainSetInput: action.input}
    case GET_TRAIN_OUTPUT:
      return {...state, trainSetOutput: action.output}

    default:
      return state
  }
}
