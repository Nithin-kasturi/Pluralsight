const http = require('http');
const app = require('./app'); // Import the app you want to test

const PORT = 3000;

const makeRequest = (path) => {
  return new Promise((resolve, reject) => {
    const req = http.request(
      {
        hostname: 'localhost',
        port: PORT,
        path: path,
        method: 'GET',
      },
      (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          resolve({ statusCode: res.statusCode, data });
        });
      }
    );

    req.on('error', (err) => reject(err));

    req.end();
  });
};

// Start the server
app.listen(PORT, async () => {
  console.log(`Server running at http://localhost:${PORT}`);

  // Test the root route
  const rootResponse = await makeRequest('/');
  if (rootResponse.statusCode === 200 && rootResponse.data === 'Hello world') {
    console.log('Root route test passed');
  } else {
    console.log('Root route test failed');
  }

  // Test the /name route
  const nameResponse = await makeRequest('/name');
  if (nameResponse.statusCode === 200 && nameResponse.data === 'Kasturi Nithin') {
    console.log('/name route test passed');
  } else {
    console.log('/name route test failed');
  }

  // Close the server
  process.exit();
});
