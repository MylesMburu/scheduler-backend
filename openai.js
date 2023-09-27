// Import the necessary libraries and set up your OpenAI API key
const openai = require('openai');
const apiKey = process.env.OPENAI_API_KEY;
const openaiClient = new openai({ apiKey });

// Function to generate a schedule using OpenAI GPT-3
async function generateSchedule(classSchedule, tasks) {
  try {
    const prompt = `Generate a schedule for a student with the following class schedule:\n${classSchedule}\n\nTasks to complete:\n${tasks}`;
    
    // Call the OpenAI API to generate the schedule
    const response = await openaiClient.Completion.create({
      engine: 'davinci',
      prompt,
      max_tokens: 100, // Adjust the max tokens as needed
    });

    // Extract and return the generated schedule from the response
    const generatedSchedule = response.choices[0].text;
    return generatedSchedule;
  } catch (error) {
    console.error('Error generating schedule from OpenAI:', error);
    throw error;
  }
}


module.exports = { generateSchedule };
