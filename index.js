const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const openai = require("./openai");

const app = express();
const port = 3000;

// routers
const TasksRouter = require("./routes/tasks.route");
const ScheduleRouter = require("./routes/schedule.route");
const { sendScheduleViaSMS } = require('./sms');

app.use(bodyParser.json());
  app.use(cors());

app.post("/api/abc", async (req, res) => {
  try {
    const divs2Data = req.body.schedule;
    console.log(divs2Data);

    const tasks2Data = req.body.tasks;
    console.log(tasks2Data);
    console.log("Generated Schedule 1");

    const phone = req.body?.phone ?? null;

    if (!phone) {
      return res.status(400).send('No phone')
    }

    if (!divs2Data && !tasks2Data) {
      return res.status(400).send("err")
    }

    const generatedSchedule = await openai.genSchedule(divs2Data, tasks2Data);

    console.log("Generated Schedule 2");

    console.log(generatedSchedule);

    // console.log(sendScheduleViaSMS_);

    // Parse the JSON data
// const scheduleData = JSON.parse(scheduleJson);

// // Format and print the schedule
// console.log("Your Schedule for Today:");
// scheduleData.forEach(item => {
//   const time = item.time;
//   const taskOrClass = item.task || item.class;
//   console.log(`time: ${time} task/class: ${taskOrClass}`);
// });

    function parseSchedule(schedule) {
      try {
        const parsedJSON = JSON.parse(schedule) ?? null;

        if (!parsedJSON) {
          throw new Error("Failed to parse");
        }
        if (parsedJSON?.schedule) {
          const mappedSchedule = parsedJSON?.schedule.map((act) => (`time: ${act?.time} task/class: ${act?.activity?.name} (${act?.activity?.type ?? "_"})`));

          return mappedSchedule.join('\n');
        }
      } catch(e) {
        console.log(e);
        return "";
      }
    }

    const messageResponse = await sendScheduleViaSMS(phone, parseSchedule(generatedSchedule));

    console.log(messageResponse);


    return res.json({ message: "Classes and tasks submitted successfully" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.use("/tasks", TasksRouter);
app.use("/schedule", ScheduleRouter);

app.post('/api/creds', (req, res) => {
  const phone = req.body?.number ?? null;

  console.log(phone);

    if (!phone) {
      return res.status(400).send('No phone')
    }

  return res.status(200).send("OK")
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
