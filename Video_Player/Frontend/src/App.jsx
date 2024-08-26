import './App.css'
import VideoPlayer from './components/VideoPlayer';
import VideoUpload from './components/VideoUpload';

function App() {
  const videoId = "your-video-file-name.mp4";

  return (
    <div className="App">
            <header className="App-header">
                <h1>Video Management App</h1>
            </header>
            <main>
                <VideoUpload />
                <VideoPlayer videoId={videoId} />
            </main>
        </div>
  )
}

export default App
