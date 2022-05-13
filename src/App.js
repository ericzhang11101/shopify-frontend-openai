import React, {useState} from 'react'

import './App.css';
import PromptForm  from './components/PromptForm';
import ResponseContainer from './components/ResponseContainer';

export default function App() {
  const [responses, setResponses] = useState([])
  
  return (
    <div className="App">
      <header className="App-header">
        OpenAI Shopify Thing
      </header>
      <PromptForm 
        handleInput={handleUserInput}
      />
      <ResponseContainer 
        responses={responses}
      />
    </div>
  );

  async function handleUserInput(prompt, currentEngine){
    console.log("API KEY")
    console.log(process.env.API_KEY)
    console.log(process.env.TEST)
    console.log(process.env.TOKEN)

    const apiKey = "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"

    const data = {
      prompt,
      temperature: 0.5,
      max_tokens: 128,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    };
      
    const response = await fetch(`https://api.openai.com/v1/engines/${currentEngine}/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(data),
    })
    .then((res) => res.json())
    .then((data) => {
      if (data.choices){
        return data.choices[0].text
      }
    })

    if (response !== null){
      setResponses([{
        prompt,
        response
      }, ...responses])
    }
  }
}

 