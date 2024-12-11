import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import loader from '../loader.gif';

const VideoDownloader = () => {
  const [url, setUrl] = useState('');
  const [videoData, setVideoData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getData = async () => {
    const options = {
      method: 'GET',
      url: 'https://social-media-video-downloader.p.rapidapi.com/smvd/get/all',
      params: {
        url: url,
        filename: 'Downloaded video'
      },
      headers: {
        'X-RapidAPI-Key': '2a432247c1mshc79c8ff875339f2p1d10fajsn1c8a0840e79e',
        'X-RapidAPI-Host': 'social-media-video-downloader.p.rapidapi.com'
      }
    };

    try {
      setIsLoading(true);
      const response = await axios.request(options);
      setIsLoading(false);

      if (response.data && response.data.links) {
        setVideoData({
          links: response.data.links,
          name: response.data.videoName || 'Unknown Video',
          thumbnail: response.data.thumbnail
        });
        toast.success('Video details fetched successfully!');
      } else {
        toast.error('Failed to fetch video details.');
      }
    } catch (error) {
      setIsLoading(false);
      toast.error('An error occurred while fetching the video details.');
      console.error(error);
    }
  };

  const handleDownload = () => {
    if (url.trim()) {
      getData();
      setUrl('');
    } else {
      toast.warn('Please enter a valid URL.');
    }
  };

  return (
    <div className="flex flex-col items-center px-4 py-6 sm:px-6 md:px-8">
    <img 
  src='down1.png' 
  alt='logo..' 
  height='80px' 
  width='80px' 
  className="animated-logo" 
/>
      <h1 className="text-2xl font-bold text-center mb-5">Video Downloader - YouTube/Instagram/Facebook/TikTok</h1>
      <div className="flex w-full max-w-md mb-5">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:border-blue-500"
          placeholder="Enter video URL"
        />
        <button
          onClick={handleDownload}
          className="p-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-700"
        >
          Fetch Video
        </button>
      </div>
      <div className="w-full max-w-lg">
        {isLoading && (
          <div className="flex justify-center my-4">
            <img className="w-12 h-12" src={loader} alt="Loading..." />
          </div>
        )}

        {videoData && (
          <div className="my-5 text-center">
            <h2 className="text-lg font-semibold mb-3">{videoData.name}</h2>
            {videoData.thumbnail ? (
              <img
                src={videoData.thumbnail}
                alt="Video Thumbnail"
                className="w-full mb-4 rounded-lg shadow-md"
              />
            ) : (
              <p className="text-red-500">Thumbnail not available.</p>
            )}
            <ul className="list-none">
              {videoData.links.map((link, index) => (
                <li key={index} className="mb-4 border p-2 rounded-lg shadow-sm">
                  <span className="block font-semibold">Quality: {link.quality}</span>
                  <a
                    href={link.link}
                    className="text-blue-500 hover:underline"
                    download
                  >
                    Download Link
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default VideoDownloader;
