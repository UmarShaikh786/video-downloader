import React, { useState } from 'react';
import axios from 'axios';
import loader from '../loader.gif';
import download from './down1.png';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const VideoDownloader = () => {
  const [url, setUrl] = useState('');
  const [links, setLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [videoName, setVideoName] = useState('');
  const [thumbnail, setThumbnail] = useState();

  const getData = async () => {
    const options = {
      method: 'GET',
      url: 'https://social-media-video-downloader.p.rapidapi.com/smvd/get/all',
      params: {
        url: url, // Use the URL from the state
        filename: videoName,
      },
      headers: {
        'X-RapidAPI-Key': '2a432247c1mshc79c8ff875339f2p1d10fajsn1c8a0840e79e',
        'X-RapidAPI-Host': 'social-media-video-downloader.p.rapidapi.com',
      },
    };

    try {
      setIsLoading(true);
      const response = await axios.request(options);
      setVideoName(response.data.title);
      setThumbnail(response.data.picture);
      setIsLoading(false);
      setLinks(response.data.links || []);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (url.trim()) {
      getData();
      setUrl('');
    }
  };

  return (
    <div className="flex flex-col items-center mt-10 p-4">
      <div className="flex w-auto items-center mb-5">
        <img className="w-10 h-10 mr-3 hover:animate-pulse" src={download} alt="downloader" />
        <h1 className="text-2xl font-bold text-center">Video Downloader -- Youtube/Instagram/Facebook/Tiktok</h1>
      </div>
      <div className="flex flex-col md:flex-row mb-5 w-full max-w-lg">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="p-2 border  md:w-[300px] border-gray-300 rounded-t-lg md:rounded-l-lg md:rounded-r-none focus:outline-none focus:border-blue-500"
          placeholder="Enter video URL"
        />
        <button
          onClick={handleDownload}
          className="p-2 bg-blue-500 text-white rounded-b-lg md:rounded-r-lg border-black border-[1px]  md:rounded-l-none hover:bg-blue-700"
        >
          Download
        </button>
      </div>
      <ToastContainer />
      <div className={`w-full max-w-lg ${links.length>0?'border border-gray-500':''} p-4 rounded-lg`}>
        {isLoading ? (
          <div className="flex justify-center my-10">
            <img className="w-20" src={loader} alt="Loading" />
          </div>
        ) : (
          ""
        )}
        {links.length > 0 && (
          <>
            <div className="flex justify-center mb-4">
              <img src={thumbnail} width={300} height={200} alt="thumbnail" className='border-black border-[1px]' />
            </div>
            <ul className="list-inside my-2">
              {links.map((link, index) => (
                <li key={index} className="mb-6">
                  <label className="block font-semibold">Quality: {link.quality}</label>
                  <a href={link.link} className="text-blue-500 hover:underline" target="_blank" onClick={()=>toast.success("Downloading started.....")} rel="noopener noreferrer">
                    Download Link
                  </a>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default VideoDownloader;
