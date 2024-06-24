const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

const geminiAi = async (text,content)=>{
    const prompt = `${text} ${content}`

    console.log('prompt: ', prompt);

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const textData = response.text();
    console.log(textData);
    if(textData){
        return textData
    }
    else{
        return "API is not Working"
    }
}

module.exports = geminiAi;