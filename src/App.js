
import './App.css';
import Footer from './component/Footer';
import VideoDownloader from './component/VideoDownloader';

function App() {
  return (
    <div className="App">
     <VideoDownloader/>
     <div>
      <Footer/>
     </div>
    </div>
  );
}

export default App;
