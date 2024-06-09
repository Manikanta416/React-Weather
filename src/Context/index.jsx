import { useContext, createContext, useState, useEffect } from "react";
import axios from 'axios';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const [weather, setWeather] = useState({});
    const [values, setValues] = useState([]);
    const [place, setPlace] = useState(''); // Default place changed to Delhi
    const [thisLocation, setLocation] = useState('delhi');

    useEffect(() => {
        const fetchData = async () => {
            const options = {
                method: 'GET',
                url: 'https://visual-crossing-weather.p.rapidapi.com/forecast',
                params: {
                    aggregateHours: '24',
                    location: place,
                    contentType: 'json',
                    unitGroup: 'metric',
                    shortColumnNames: 0,
                },
                headers: {
                    'X-RapidAPI-Key': '8d95eac14cmshd6890c09b2d1fbbp158004jsn89ce734f20cd',
                    'X-RapidAPI-Host': 'visual-crossing-weather.p.rapidapi.com'
                }
            };

            try {
                const response = await axios.request(options);
                console.log(response.data);
                const thisData = Object.values(response.data.locations)[0];
                setLocation(thisData.address);
                setValues(thisData.values);
                setWeather(thisData.values[0]);
            } catch (e) {
                console.error(e);
            }
        };

        fetchData(); // Call the fetchData function immediately
    }, [place]);

    useEffect(() => {
        console.log(values);
    }, [values]);

    return (
        <StateContext.Provider value={{
            weather,
            setPlace,
            values,
            thisLocation,
            place
        }}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
