const dotenv = require("dotenv").config();
const OpenAI = require("openai-api");
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const openai = new OpenAI(OPENAI_API_KEY);
const model = "text-davinci-002";

// Function to generate answers to questions
async function generateAnswer(question) {
  const prompt = `Question: ${question}\nAnswer:`;
  const gptResponse = await openai.complete({
    engine: model,
    prompt,
    maxTokens: 5,
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

// Test the function with a sample question
const question = "capital of france";
generateAnswer(question).then((answer) => {
  console.log(answer);
});
