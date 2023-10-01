const Africastalking = require('africastalking');
const apiKey = process.env.AT_API_KEY;
const username = 'testprime';

// Create an instance of the Africastalking SMS service
const sms = Africastalking({
  apiKey,
  username,
});

// Function to send a schedule as an SMS
async function sendScheduleViaSMS(phoneNumber, schedule) {
  try {
    const options = {
      to: [phoneNumber], // Phone number to send the SMS to
      message: `Your Schedule for Today:\n${schedule}`, // Customize the SMS message
    };

    // Send the SMS
    const response = await sms.SMS.send(options);

    // Log the response
    console.log('SMS sent successfully:', response);
  } catch (error) {
    console.error('Error sending SMS:', error);
    throw error;
  }
}

module.exports = { sendScheduleViaSMS };
