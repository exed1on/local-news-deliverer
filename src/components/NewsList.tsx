import React, { useEffect, useState } from 'react';
import { City, fetchNewsForCity } from '../api/NewsApi';

interface NewsArticle {
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
}

interface NewsListProps {
  selectedCity: City | null;
  includeGlobalNews: boolean;
}

const NewsList: React.FC<NewsListProps> = ({ selectedCity, includeGlobalNews }) => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const defaultImageUrl = '../images/no-photo.jpg';

  useEffect(() => {
    if (selectedCity) {
      fetchNewsForCity(selectedCity.name, selectedCity.stateName, includeGlobalNews).then((articles) => {
        setNews(articles);
      });
    }
  }, [selectedCity, includeGlobalNews]);

  if (!selectedCity) 
    return <div style={{ textAlign: 'center', color: '#555' }}>Please select a city to see news.</div>;

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      margin: '20px', 
      backgroundColor: '#fff', 
      padding: '20px', 
      borderRadius: '8px', 
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' 
    }}>
      <h3 style={{ color: '#333' }}>News for {selectedCity.name}</h3>
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '20px' }}>
        {news.length > 0 ? (
          news.map((article, index) => (
            <div key={index} style={{ 
              border: '1px solid #ddd', 
              borderRadius: '8px', 
              padding: '10px', 
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', 
              backgroundColor: '#f9f9f9' 
            }}>
              <img 
                src={article.urlToImage || defaultImageUrl}
                alt={article.title} 
                style={{ width: '100%', borderRadius: '8px', marginBottom: '10px' }} 
              />
              <h4 style={{ color: '#0066cc', margin: '0 0 10px' }}>{article.title}</h4>
              <p style={{ color: '#555', margin: '0 0 10px' }}>{article.description}</p>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ 
                  display: 'inline-block', 
                  backgroundColor: '#0066cc', 
                  color: '#fff', 
                  padding: '8px 12px', 
                  borderRadius: '4px', 
                  textDecoration: 'none' 
                }}
              >
                Read More
              </a>
            </div>
          ))
        ) : (
          <div style={{ color: '#888' }}>No news articles found for this city.</div>
        )}
      </div>
    </div>
  );
};

export default NewsList;
