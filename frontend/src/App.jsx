import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [url, setUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [copySuccess, setCopySuccess] = useState(''); // Track if the copy was successful

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/shorten', { originalUrl: url });
      setShortenedUrl(response.data.shortUrl);
    } catch (err) {
      console.error('Error shortening the URL', err);
    }
  };

  const handleCopy = () => {
    if (shortenedUrl) {
      navigator.clipboard.writeText(shortenedUrl).then(() => {
        setCopySuccess('URL copied to clipboard!'); // Set success message
        setTimeout(() => setCopySuccess(''), 2000); // Reset after 2 seconds
      }).catch(err => {
        console.error('Failed to copy: ', err);
        setCopySuccess('Failed to copy URL!'); // Show error if copy fails
        setTimeout(() => setCopySuccess(''), 2000); // Reset error message after 2 seconds
      });
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
          <button
            onClick={handleCopy}
            className="ml-4 bg-green-500 text-white py-2 px-4 rounded-md"
          >
            Copy
          </button>
          {copySuccess && <p className="mt-2 text-green-500">{copySuccess}</p>} {/* Show confirmation message */}
        </div>
      )}
    </div>
  );
}

export default App;
