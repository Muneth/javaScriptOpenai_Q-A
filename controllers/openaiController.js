const OpenAI = require("openai-api");
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const openai = new OpenAI(OPENAI_API_KEY);

// Create an instance of the GPT-3 model
const model = "text-davinci-002";
async function generateAnswer(question) {
  const prompt = `Question: ${question}\nAnswer:`;
  const gptResponse = await openai.complete({
    engine: model,
    prompt,
    maxTokens: 250,
    temperature: 0.9,
    topP: 1,
    presencePenalty: 0,
    frequencyPenalty: 0,
    bestOf: 1,
    n: 1,
    stream: false,
    stop: ["\n", "Question: "],
  });
  const answer = gptResponse.data.choices[0].text;
  return answer;
}
const generateAnswer1 = async (req, res) => {
  // User input from the form
  const { prompt } = req.body;
  generateAnswer(prompt)
    // sending data to the frontend
    .then((answer) => {
      res.status(200).json({
        success: true,
        data: answer,
      });
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
      } else {
        console.log(error.message);
      }
      res.status(400).json({
        success: false,
        error: "The OpenAI API is not responding",
      });
    });
};

module.exports = {
  generateAnswer1,
};
