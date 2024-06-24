const geminiAi = require("../utils/geminiAi");

const summaryController = async (req,res)=>{
    console.log('summary api started')

    const { paragraph } = req.body;
    // console.log(paragraph); 
    
    try {
        const summary = await geminiAi(`summarize this paragraph very short`, paragraph);
        res.send({ summary });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error'});
    }
}

const codeController = async (req,res)=>{
    console.log('code api running')
    const { language,inputedCode } = req.body;
    console.log(language,inputedCode);
    
    try {
        const codeSolution = await geminiAi(`write only code in a ${language} language for`,inputedCode);
        console.log('solution is > ', codeSolution);
        res.send({ codeSolution });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    summaryController,
    codeController
}