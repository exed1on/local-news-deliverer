import axios from 'axios';

export interface City {
    id: number;
    name: string;
    stateName: string;
    stateCode: string;
}

export interface NewsArticle {
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    isLocal: boolean;
    cities: City[];
}

axios.defaults.baseURL = 'https://local-news-deliverer-api.onrender.com';

export const fetchCities = async (): Promise<City[]> => {
    try {
        const response = await axios.get('/cities');
        return response.data;
    } catch (error) {
        console.error('Error fetching cities:', error);
        return [];
    }
};

export const fetchNewsForCity = async (city?: string, state?: string, includeGlobalNews: boolean = false): Promise<NewsArticle[]> => {
    try {
        const response = await axios.get('/news/search', { 
            params: { 
                cityName: city, 
                stateName: state,
                includeGlobalNews
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching news:', error);
        return [];
    }
};


export const searchCities = async (name?: string, stateName?: string): Promise<City[]> => {
    try {
        const response = await axios.get('/cities/search', { params: { name, stateName } });
        return response.data;
    } catch (error) {
        console.error('Error searching cities:', error);
        return [];
    }
};