import React, { useState, useEffect } from "react";

const api = {
    key: "dc2b0ef4d2f2dd920dad329e9f160e4e",
    base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
    const [searchInput, getSearchInput] = useState("");
    const [searchCity, setSearchCity] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [weatherInfo, setWeatherInfo] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        setSearchCity(searchInput);
    };

    useEffect(() => {
        const fetchWeatherData = async () => {
            if (!searchCity) return;
            setLoading(true);
            //Process
            try {
                const url = `${api.base}weather?q=${searchCity}&appid=${api.key}`;
                const response = await fetch(url);
                const data = await response.json();
                if (response.ok) {
                    setWeatherInfo(`${data.name}, ${data.sys.country}, ${data.weather[0].description}, ${data.main.temp}`);
                    setErrorMessage("");
                } else {
                    setErrorMessage(data.message);
                }
            } catch (error) {
                setErrorMessage(error.message);
            }
            setLoading(false);
        };

        fetchWeatherData();
    }, [searchCity]);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="City"
                    value={searchInput}
                    onChange={(e) => {
                        getSearchInput(e.target.value);
                    }}
                />
                <button>Search</button>
            </form>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <>{errorMessage ? <div style={{ color: "red" }}>{errorMessage}</div> : <div>{weatherInfo}</div>}</>
            )}
        </div>
    );
}

export default App;
