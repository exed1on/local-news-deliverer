import React, { useState } from 'react';
import './styles/App.css'; 
import CitySearch from './components/CitySearch';
import NewsList from './components/NewsList'; 
import { City } from './api/NewsApi';

const App: React.FC = () => {
    const [selectedCity, setSelectedCity] = useState<City | null>(null); 
    const [includeGlobalNews, setIncludeGlobalNews] = useState<boolean>(false);

    const handleCitySelect = (city: City) => {
        setSelectedCity(city);
    };

    const handleGlobalNewsToggle = (includeGlobal: boolean) => {
        setIncludeGlobalNews(includeGlobal);
    };

    return (
        <div className="app">
            <header className="app-header">
                <h1>Local News Search</h1>
                <CitySearch 
                    onCitySelect={handleCitySelect} 
                    onGlobalNewsToggle={handleGlobalNewsToggle}
                />
            </header>
            <main className="news-list">
                <NewsList 
                    selectedCity={selectedCity} 
                    includeGlobalNews={includeGlobalNews}
                />
            </main>
            <footer className="app-footer">
                <p>US cities dataset: <a href="https://simplemaps.com/data/us-cities" target="_blank" rel="noopener noreferrer">https://simplemaps.com/data/us-cities</a></p>
                <p>Local news datasets: <a href="https://github.com/wm-newslab/3DLNews/tree/main" target="_blank" rel="noopener noreferrer">https://github.com/wm-newslab/3DLNews/tree/main</a></p>
            </footer>
        </div>
    );
};

export default App;
