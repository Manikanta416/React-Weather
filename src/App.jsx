import React, { useState } from 'react';
import './App.css';
import search from './assets/icons/search.svg';
import network from './assets/images/network.jpg';

import { useStateContext } from './Context';
import { BackgroundLayout, WeatherCard, MiniCard } from './Components';
    
function App() {
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('feedback');
  const [name, setName] = useState('');
  const [missingPlace, setMissingPlace] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [userGuess, setUserGuess] = useState('');
  const [guessFeedback, setGuessFeedback] = useState('');
  const { weather, thisLocation, values, place, setPlace } = useStateContext();

  const submitCity = () => {
    setPlace(input);
    setInput('');
  };

  const handleFeedbackSubmit = () => {
    console.log("Name:", name);
    console.log('Feedback:', feedback);
    console.log("Missing Place:", missingPlace);
    setFeedback("");
    setName("");
    setMissingPlace("");
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 600000);

    // Here you can handle the submission of feedback data, such as sending it to a server
  };

  const checkGuess = () => {
    // Replace this with actual weather data retrieval logic
    const actualWeather = weather.conditions.toLowerCase();

    // Check if the user's guess matches the actual weather
    if (userGuess.toLowerCase() === actualWeather) {
      setGuessFeedback('Congratulations! Your guess is correct.');
    } else {
      setGuessFeedback(`Sorry, your guess is incorrect. The weather is ${actualWeather}. Please try again.`);
    }
  };

  return (
    <div className='w-full h-screen px-8 text-white '>
      <nav className='flex items-center justify-between w-full p-3'>
        <h1 className='text-5xl font-bold tracking-wide text-center text-orange-600'>Weather Wrap</h1>
        <div className='flex items-center w-64 gap-2 p-2 overflow-hidden bg-white rounded shadow-2xl'>
          <img src={search} alt="search" className='w-6 h-6' />
          <input
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                submitCity();
              }
            }}
            type="text"
            placeholder='Search city'
            className='focus:outline-none w-full text-[#212121] text-lg'
            value={input}
            onChange={e => setInput(e.target.value)}
          />
        </div>
      </nav>
      <BackgroundLayout></BackgroundLayout>
      <main className='flex items-start w-full gap-8 py-4'>
        <div className='w-full lg:w-1/3'>
          <WeatherCard
            place={thisLocation}
            windspeed={weather.wspd}
            humidity={weather.humidity}
            temperature={weather.temp}
            heatIndex={weather.heatindex}
            iconString={weather.conditions}
            conditions={weather.conditions}
          />
        </div>

        <div className='flex flex-wrap w-full gap-4 lg:w-2/3'>
          {values?.slice(1, 7).map(curr => (
            <div key={curr.datetime} className='w-full sm:w-1/2 lg:w-1/3'>
              <MiniCard
                time={curr.datetime}
                temp={curr.temp}
                iconString={curr.conditions}
              />
            </div>
          ))}
        </div>
      </main>
      <footer className='flex justify-between w-full p-4 mt-auto bg-grey-700'>
        <div className='w-full lg:w-1/2'>
          {isSubmitted ? (
            <div className='p-4 bg-yellow-600 congrats-message'>
              <h2 className='overflow-visible text-4xl font-bold text-blue-800'>Congratulations</h2>
              <h2 className='mt-3 text-4xl text-bold'>Thank You For Your Feedback</h2>
              <h2 className='mt-3 text-4xl text-bold'>🙏🤗🙏</h2>
            </div>
          ) : (
            <div className='p-4 mx-auto font-bold text-black bg-white rounded shadow-lg'>
              <h2 className='mb-4 text-xl font-bold text-black'>Submit Feedback</h2>
              <input
                type='text'
                className='w-full p-2 mb-4 border rounded focus:outline-none'
                placeholder='Your name'
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <div className='mb-4'>
                {feedbackType !== "missingPlace" && (
                  <label className='mr-4'>
                    <input
                      type='radio'
                      name="feedbackType"
                      value='feedback'
                      checked={feedbackType === 'feedback'}
                      onChange={() => setFeedbackType('feedback')}
                    /> Feedback
                  </label>
                )}

                {feedbackType === "feedback" && (
                  <label>
                    <input
                      type='radio'
                      name='feedbackType'
                      value='missingPlace'
                      checked={feedbackType === "missingPlace"}
                      onChange={() => setFeedbackType("missingPlace")}
                    />
                    Missing Place
                  </label>
                )}
              </div>
              {feedbackType === "missingPlace" && (
                <input
                  className='mb-4 border rounded focus:outline-none'
                  type='text'
                  placeholder='Enter missing Place'
                  value={missingPlace}
                  onChange={e => setMissingPlace(e.target.value)}
                />
              )}
              <textarea
                className='w-full p-2 mb-4 border rounded focus:outline-none'
                rows='4'
                placeholder='Enter Your Feedback'
                value={feedback}
                onChange={e => setFeedback(e.target.value)}
              />
              <button
                className='w-full p-2 text-white bg-orange-500 rounded hover:bg-orange-700'
                onClick={handleFeedbackSubmit}
              >
                Submit
              </button>
            </div>
          )}
        </div>

        <div className='w-full ml-10 lg:w-1/2'>
          <div className='p-4 mx-auto font-bold text-black bg-white rounded shadow-lg'>
            <h2 className='mb-4 text-xl font-bold text-black'>Guess Today's Weather</h2>
            <div className="flex flex-wrap gap-2 place-items-center">
              <label className="w-1/2">
                <input
                  type='radio'
                  name="weatherGuess"
                  className='mr-2'
                  value='rainy'
                  checked={userGuess === 'rainy'}
                  onChange={e => setUserGuess(e.target.value)}
                />
                Rainy ⛈️
              </label>
              <label className="w-1/2">
                <input
                  type='radio'
                  name="weatherGuess"
                  className='mr-2'
                  value='sunny'
                  checked={userGuess === 'sunny'}
                  onChange={e => setUserGuess(e.target.value)}
                />
                Sunny ☀️
              </label>
              <label className="w-1/2">
                <input
                  type='radio'
                  name="weatherGuess"
                  className='mr-2'
                  value='cloudy'
                  checked={userGuess === 'cloudy' || "Partially cloudy"}
                  onChange={e => setUserGuess(e.target.value)}
                />
                Cloudy ☁️
              </label>
              <label className="w-1/2">
                <input
                  type='radio'
                  name="weatherGuess"
                  className='mr-2'
                  value='clear overcast'
                  checked={userGuess === 'clear overcast'}
                  onChange={e => setUserGuess(e.target.value)}
                />
                Clear 🌥️
              </label>
            </div>
            <button
              className='w-full p-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-700'
              onClick={checkGuess}
            >
              Check Guess
            </button>
            <p className="mt-2 text-black">{guessFeedback}</p>
          </div>
        </div>

        <div className='max-w-md p-4 mx-auto ml-10 font-bold text-black bg-white rounded shadow-lg'>
          <h2 className='mb-4 text-xl font-bold text-black'>Share Weather To Your Networks</h2>
          <div className="flex flex-wrap justify-between">
            <img src={network} alt="img" className='object-contain mb-0 h-30 w-30' />
          </div>
        </div>
      </footer>
      <div className='mt-4 font-bold text-center text-red-600 bg-green-400'>
        <span className="text-2xl ">&copy; Manikanta_Swamy</span>
      </div>
    </div>
  );
}

export default App;
