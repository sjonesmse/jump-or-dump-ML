const synaptic = require('synaptic')

export const runAnalysis = (input, output) => {
  let inputArr = input.map(elem => [
    elem.age,
    elem.gender,
    elem.jumps,
    elem.occupation,
    elem.region,
    elem.reserveRide
  ])
  let outputArr = output.map(elem => [elem.incident, elem.fatality])

  let trainingSet = []
  // {
  //   input: [0, 0],
  //   output: [0]
  // },

  for (let i = 0; i < 5000; i++) {
    let trainSetObj = {
      input: inputArr[i],
      output: outputArr[i]
    }
    trainingSet.push(trainSetObj) //not an array of objs with input and output arrays
  }

  const Trainer = synaptic.Trainer,
    Architect = synaptic.Architect

  const myNetwork = new Architect.Perceptron(6, 6, 2)
  const trainer = new Trainer(myNetwork)

  // trainer.train(trainingSet);
  // OR

  trainer.train(trainingSet, {
    rate: 0.1,
    iterations: 2000,
    error: 0.002,
    shuffle: true,
    log: 1000,
    cost: Trainer.cost.CROSS_ENTROPY
    // schedule: {
    //   every: 500, // repeat this task every 500 iterations
    //   do: function (data) {
    //     // custom log
    //     console.log("my error message", data.error, "iterations", data.iterations, "rate", data.rate);
    //     // if (someCondition)
    //     // 	return true; // abort/stop training
    //   }
    // }
  })
  console.log('training complete!')
  // also can add a scheduled task to occur during trainin as another param:
  // var testingSet
  // trainer.test(testingSet, {
  //   rate: 0.1,
  //   iterations: 20000,
  //   error: 0.005,
  //   shuffle: true,
  //   log: 1000,
  //   cost: Trainer.cost.CROSS_ENTROPY
  // }) //like above

  // myPerceptron.activate([0, 0]) // 0.0268581547421616
  // myPerceptron.activate([1, 0]) // 0.9829673642853368
  // myPerceptron.activate([0, 1]) // 0.9831714267395621
  // myPerceptron.activate([1, 1]) // 0.02128894618097928
}
