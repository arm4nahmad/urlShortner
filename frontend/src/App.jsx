import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [url, setUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/shorten', { originalUrl: url });
      setShortenedUrl(response.data.shortUrl);
    } catch (err) {
      console.error('Error shortening the URL', err);
    }
  };

  return (
    <div className="container mx-auto text-center p-8">
      <h1 className="text-4xl font-bold mb-4">URL Shortener</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL to shorten"
          className="px-4 py-2 border rounded-md w-2/3"
          required
        />
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md ml-2">
          Shorten
        </button>
      </form>

      {shortenedUrl && (
        <div className="mt-4">
          <p className="text-xl">Your shortened URL is:</p>
          <a
            href={shortenedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            {shortenedUrl}
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
