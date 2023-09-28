require('dotenv').config();

const openai = require('openai');
const apiKey = process.env.OPENAI_API_KEY;
// console.log(apiKey);
const openaiClient = new openai({ apiKey });

// Function to generate a schedule using OpenAI GPT-3
async function generateSchedule(classSchedule, tasks) {
  try {
    const prompt = `Generate a JSON schedule for a student:\n{
      "classes": ${classSchedule},
      "tasks": ${tasks}
    }`;
        
    // Call the OpenAI API to generate the schedule
    const response = await openaiClient.completions.create({
      model: "gpt-3.5-turbo-instruct",
      prompt,
      max_tokens: 100, 
    });

    // Extract and return the generated schedule from the response
    const generatedSchedule = response.choices[0].text;
    return generatedSchedule;
  } catch (error) {
    console.error('Error generating schedule from OpenAI:', error);
    throw error;
  }
}

module.exports = { genSchedule: generateSchedule };
