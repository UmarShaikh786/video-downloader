import React, { useState } from 'react';
import axios from 'axios';
import loader from '../loader.gif'

const VideoDownloader = () => {
  const [url, setUrl] = useState('');
  const [links, setLinks] = useState([]);
  const [isloading,setisLoading]=useState(false)

  const getData = async () => {
    const options = {
      method: 'GET',
      url: 'https://social-media-video-downloader.p.rapidapi.com/smvd/get/all',
      params: {
        url: url, // Use the URL from the state
        filename: 'Downloaded video'
      },
      headers: {
        'X-RapidAPI-Key': '2a432247c1mshc79c8ff875339f2p1d10fajsn1c8a0840e79e',
        'X-RapidAPI-Host': 'social-media-video-downloader.p.rapidapi.com'
      }
    };

    try {
        setisLoading(true)
      const response = await axios.request(options);
      setisLoading(false)

      setLinks(response.data.links || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDownload = () => {
      
    if (url.trim()) {
      getData();
      setUrl('');
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-2xl font-bold mb-5">Video Downloader -- Youtube/Instagram/Facebook/Tiktok</h1>
      <div className="flex mb-5">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="p-2 border w-[300px] border-gray-300 rounded-l-lg focus:outline-none focus:border-blue-500"
          placeholder="Enter video URL"
        />
        <button
          onClick={handleDownload}
          className="p-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-700"
        >
          Download
        </button>
      </div>
      <div className="w-full max-w-lg ">
      { isloading===true?<div className='flex align-middle justify-center'>
        <img className='w-20 my-10 'src={loader} alt=""></img></div>:""}
        {links.length > 0 && (
          <ul className=" list-inside my-2">
            {links.map((link, index) => (
              <li key={index} className="mb-6 ">
                <label className="block font-semibold">Quality :{link.quality}</label>
               
                <a href={link.link} className="text-blue-500 hover:underline" >
                  Download Link
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default VideoDownloader;
