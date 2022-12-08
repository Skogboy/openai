
import './App.css'
import { useState } from 'react'
import { Configuration, OpenAIApi } from 'openai'
function App() {
  const [prompt, setPrompt] = useState('')
  const [result, setResult] = useState('')
  import.meta.env.VITE_Open_AI_Key;
  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_Open_AI_Key,
});


const openai = new OpenAIApi(configuration);


const generateImage = async () => {
  const response = await openai.createImage({
    prompt: prompt,
    n: 1,
    size: "1024x1024",
  });
  response.data.data[0].url;
  
  setResult(response.data.data[0].url)
};
  return (
    <div className='app-main'>
      <h1>Generate an Image using Open AI API</h1>
      <h2>Created by Benjamin Skogman</h2>
      <input className='app-input'
      placeholder='Try "Walter White"'
      onChange={(e) => setPrompt(e.target.value)} 
      />

     <button onClick={generateImage}>Generate Image</button>
    {result.length > 0 ? <img className='result-image' src={result} alt='your result' /> : <></>}
    </div>
  );
}

export default App
