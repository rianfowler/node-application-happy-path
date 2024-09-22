const express = require('express');
const actuator = require('express-actuator');
const app = express();
const port = process.env.PORT || 3000;

// Kubernetes health check endpoints (using express-actuator)
app.use(actuator({
  basePath: '/actuator', // Actuator endpoints will be exposed at /actuator/* by default
  infoGitMode: 'simple',
  customEndpoints: [
    {
      id: 'health',
      controller: (req, res) => {
        res.status(200).send('OK');
      }
    },
    {
      id: 'readiness',
      controller: (req, res) => {
        res.status(200).send('Ready');
      }
    }
  ]
}));

// Example hello world endpoints
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/hello/:name', (req, res) => {
  const name = req.params.name;
  res.send(`Hello, ${name}!`);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

