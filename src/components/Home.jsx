import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "./context/UserAuthContext";
import '../App.css'
import { useState } from 'react'
import { Configuration, OpenAIApi } from 'openai'
import logo from '../images/react.png'
import logoFire from '../images/firebase.png'




const Home = () => {
  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState('')
  const [result, setResult] = useState('')
  import.meta.env.VITE_Open_AI_Key;
  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_Open_AI_Key,
    });
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
// // 

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

//   //

  return (
    <>
      <div className="p-4 box mt-3 text-center">
      <div>
      <h1>Welcome to Image Generator</h1>
      <img src={logo} />
      <img src={logoFire} className='fireimg' />
      </div>
      {user && user.email}
      </div>
      <div className="d-grid gap-2">
        <Button variant="primary" onClick={handleLogout}>
          Log out
        </Button>
      </div>
      <div>
      <input className='app-input'
      placeholder='Try "Walter White"'
      onChange={(e) => setPrompt(e.target.value)} 
      />

     <button onClick={generateImage}>Generate Image</button>
    {result.length > 0 ? <img className='result-image' src={result} alt='your result' /> : <></>}

      </div>
    </>
    
  );
};
// }

export default Home;

