# Introduction

This application was created as a hackathon-style project in four days to demonstrate the use of machine learning and neural networking to analyze the "riskiness" of insuring a given skydiver by fake skydiving insurance company. The user inputs the demographic information of a skydiver in the user fields after training the system to determine whether the jumper is "Low," "Medium," or "High" risk for the company to insure. The neural network is trained using a database of 40,000 skydiver records, including information on Age, Gender, Occupation, Region, Current Number of Jumps, and if they've had an emergency deployment of their reserve parachute (a "Reserve Ride"). The neural network uses these values as inputs and registers two outputs: Number of Incidents, and Death of a skydiver in the records. After the neural network learns what statistically expect from the demographic inputs, it makes a prediction on how likely the skydiver in question is to insure, based on [very contrived] output ranges of risk.

## Background

Synaptic.js is a JavaScript library that provides the architecture and structure for building neural networks in the Node.js environment. A Perceptron-style neural network was used, which uses supervised learning in order to develop accuracy in predictions. With supervised learning, the perceptron is trained with known input and output values, and uses backpropagation of results to adjust its calculations (or guesses) for the next iteration of execution. It refines itself algorithmically through the training process using "gradient descent," which is essentially an approach towards the most correct answer possible by following the path with the steepest descent in whatever applicable value you're assessing (and can also be compared to blindly ambling downhill in order to get to the bottom of a mountain, if you will). In short, Synaptic.js provided the tools to create a neural network and then train it with whatever input data was needed to teach the network how to make predictions.

## Built With

- [Synaptic.js](https:http://caza.la/synaptic/#/) - The Synaptic.js JavaScript neural network library
- [React](https://reactjs.org/) - React JavaScript component library for user interfaces
- [Semantic UI - React](https://react.semantic-ui.com/) - React styling library
- [Heroku](https://heroku.com/) - A lovely webpage hosting service


## How to Use 

1. Navigate [here](http://http://jump-or-dump.herokuapp.com/) to view the page.
2. Open the Dev Console in your browser by pressuring Ctrl + Shift + J (or CMD + Shift + J on MAC) to observe training if desired. Training takes some time, so please be patient.
3. Press "Collect Training Data". This will pull the data from the database into the web app.
4. Press "Train." The app will train on the data collected, and when finished will report the results from training in the lower portion of the screen.
5. After training is complete, you may input a skydiver's information and click "Jump or Dump?" to see the risk assessment results in graphical form (thumbs up/down or warning) at the bottom of the page.

Thank you!! I hope you enjoy my project :)

