const app = require("./app");
const PORT = 3003;

app.get('/', (req, res) => {
  res.send('Backend is working!');
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Bharat Server is running on port ${PORT}`);
});

