const synaptic = require('synaptic')

const Neuron = synaptic.Neuron,
  Layer = synaptic.Layer,
  Network = synaptic.Network,
  Trainer = synaptic.Trainer,
  Architect = synaptic.Architect

// function Perceptron(input, hidden, output)
// {
// 	// create the layers
// 	const inputLayer = new Layer(input);
// 	const hiddenLayer = new Layer(hidden);
// 	const outputLayer = new Layer(output);

// 	// connect the layers
// 	inputLayer.project(hiddenLayer);
// 	hiddenLayer.project(outputLayer);

// 	// set the layers
// 	this.set({
// 		input: inputLayer,
// 		hidden: [hiddenLayer],
// 		output: outputLayer
// 	});
// }

// extend the prototype chain
// Perceptron.prototype = new Network();
// Perceptron.prototype.constructor = Perceptron;

var myNetwork = new Architect.Perceptron(2, 2, 1)
var trainer = new Trainer(myNetwork)

var trainingSet = [
  {
    input: [0, 0],
    output: [0]
  },
  {
    input: [0, 1],
    output: [1]
  },
  {
    input: [1, 0],
    output: [1]
  },
  {
    input: [1, 1],
    output: [0]
  }
]

// trainer.train(trainingSet);
// OR

trainer.train(trainingSet, {
  rate: 0.1,
  iterations: 20000,
  error: 0.005,
  shuffle: true,
  log: 1000,
  cost: Trainer.cost.CROSS_ENTROPY
})
// also can add a scheduled task to occur during trainin as another param:
// schedule: {
// 	every: 500, // repeat this task every 500 iterations
// 	do: function(data) {
// 		// custom log
// 		console.log("error", data.error, "iterations", data.iterations, "rate", data.rate);
// 		if (someCondition)
// 			return true; // abort/stop training
// 	}
// }
var testingSet
trainer.test(testingSet, [options]) //like above

myPerceptron.activate([0, 0]) // 0.0268581547421616
myPerceptron.activate([1, 0]) // 0.9829673642853368
myPerceptron.activate([0, 1]) // 0.9831714267395621
myPerceptron.activate([1, 1]) // 0.02128894618097928
