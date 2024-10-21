import React, { useState } from 'react';
import { City, searchCities } from '../api/NewsApi';
import '../styles/styles.css';

interface CitySearchProps {
    onCitySelect: (city: City) => void;
    onGlobalNewsToggle: (includeGlobal: boolean) => void;
}

const CitySearch: React.FC<CitySearchProps> = ({ onCitySelect, onGlobalNewsToggle }) => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [cities, setCities] = useState<City[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [includeGlobalNews, setIncludeGlobalNews] = useState<boolean>(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchTerm(value);
        if (!value) {
            setCities([]);
            return;
        }
        handleSearch(value);
    };

    const handleSearch = async (term: string) => {
        setLoading(true);
        try {
            if (term.length > 1) {
                const results = await searchCities(term);
                if (Array.isArray(results)) {
                    setCities(results);
                } else {
                    console.error('Expected an array from searchCities:', results);
                }
            }
        } catch (error) {
            console.error('Error searching cities:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCitySelect = (city: City) => {
        setSearchTerm(`${city.name}, ${city.stateCode}`);
        setCities([]);
        onCitySelect(city);
    };

    const handleGlobalNewsToggle = () => {
        const newValue = !includeGlobalNews;
        setIncludeGlobalNews(newValue);
        onGlobalNewsToggle(newValue);
    };

    return (
        <div className="centered-container">
            <div className="input-container" style={{ marginTop: '5px', display: 'flex', alignItems: 'center', width: '100%', maxWidth: '600px', position: 'relative' }}>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleInputChange}
                    placeholder="Search for a city"
                    style={{ flex: 1, padding: '8px', marginRight: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
                />
                <label style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                        type="checkbox"
                        checked={includeGlobalNews}
                        onChange={handleGlobalNewsToggle}
                        style={{ marginRight: '5px' }}
                    />
                    Include Global News
                </label>
                {loading && <div className="loading-spinner"></div>}
                {cities.length > 0 && (
                    <ul className="dropdown">
                        {cities.map((city) => (
                            <li key={city.id} onClick={() => handleCitySelect(city)}>
                                {city.name}, {city.stateCode}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default CitySearch;
