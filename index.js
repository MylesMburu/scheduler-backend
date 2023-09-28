const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const openai  = require('./openai');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.post('/api/abc', async (req, res) => {
  try {
    const divs2Data = req.body.divs2;
    console.log(divs2Data);

    const tasks2Data = req.body.tasks2;
    console.log(tasks2Data);

    console.log("Generated Schedule 1")

    const generatedSchedule = await openai.genSchedule(divs2Data, tasks2Data);

    console.log("Generated Schedule 2")

    console.log(generatedSchedule)

    res.json({ message: 'Classes and tasks submitted successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
