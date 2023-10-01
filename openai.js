require("dotenv").config();

const openai = require("openai");
const apiKey = process.env.OPENAI_API_KEY;
// console.log(apiKey);
const openaiClient = new openai({ apiKey });

// Function to generate a schedule using OpenAI GPT-3
async function generateSchedule(classSchedule, tasks) {
  try {
    // const prompt = `Generate a JSON schedule for a student, using the following JSON data. Combine the classes and tasks array and arrange them in a timetable kind of way. Tasks should not replace classes but should only be put where there is free time. Return an array with an object with schema "time" and "task" to be done. :\n{
    //   "classes": ${JSON.stringify(classSchedule)},
    //   "tasks": ${JSON.stringify(tasks)}
    // }\n`;

    const prompt = `Using the following schedule data:\n{classes: ${JSON.stringify(classSchedule)}, "tasks": ${JSON.stringify(tasks)}}\n generate a schedule in JSON format, such that the tasks occupy free time between classes. Each class has a 'from' and 'to' attribute that indicate the starting and ending time of the class. Do not change the starting and ending time of classes. Make sure to indicate the start and ending time for each activity in the time field using the following format 'from - to'. You can estimate the time taken for a task to be completed. Take into consideration the task priority. The data returned must be in JSON format with the following schema,\n {schedule: [time: string, activity: {type: "class" | "task", name: string]}\n`;

    console.log(prompt);
    // Call the OpenAI API to generate the schedule
    const response = await openaiClient.completions.create({
      model: "gpt-3.5-turbo-instruct",
      prompt,
      max_tokens: 1000,
    });
    //
    //

    const schedule_schema = {
      type: "object",
    };
    const response_ =
      true ??
      (await openaiClient.createChatCompletion({
        model: "gpt-3.5-turbo-0613",
        messages: [
          {
            role: "system",
            content: "",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        functions: [
          {
            name: "create_schedule",
            parameters: schedule_schema,
          },
        ],
        function_call: {
          name: "create_schedule",
        },
      }));

    // Extract and return the generated schedule from the response
    // console.log(response)
    const generatedSchedule = response.choices[0].text;
    return generatedSchedule;
  } catch (error) {
    console.error("Error generating schedule from OpenAI:", error);
    throw error;
  }
}

module.exports = { genSchedule: generateSchedule };
