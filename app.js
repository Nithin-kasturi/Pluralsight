const express = require('express');
const app = express();
const PORT = 3000;
//Testing
app.get('/', (req, res) => {
  res.send('Hello world');
});

app.get('/name', (req, res) => {
  res.send('Kasturi Nithin');
});

// Export the app for testing purposes
module.exports = app;

// Listen on the port (this will only be executed during app startup, not during testing)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}
