import ZoomVideo from "@zoom/videosdk";
import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [zoomClient, setZoomClient] = useState(null);

  useEffect(() => {
    window.log("inside use effect");
    if (ZoomVideo.checkSystemRequirements().audio) {
      const client = ZoomVideo.createClient();

      client
        .init("en-US")
        .then(() => {
          console.log("initialized");
          setZoomClient(client);
        })
        .catch((err) => console.error(err));
    }
  }, []);

  const handleJoin = () => {
    if (zoomClient) {
      console.log("Join button clicked", process.env.REACT_APP_API_ENDPOINT);
      axios
        .post(
          `${process.env.REACT_APP_API_ENDPOINT}/api/zoom/video-sdk/jwt`,
          {}
        )
        .then((response) => {
          zoomClient
            .join("Testing", response.data.token, "Aashutosh")
            .then(() => {
              console.log("joined");
            })
            .catch((err) => console.log(err));
        })
        .catch((error) => {
          console.error("Error fetching token", error);
        });
    } else {
      console.log("Zoom client not initialized yet");
    }
  };

  const handleLeave = () => {
    if (zoomClient) zoomClient.leave();
  };
  const handleStartSpeaking = () => {
    if (zoomClient) {
      const stream = zoomClient.getMediaStream();
      stream.startAudio();
    }
  };

  return (
    <div style={{ margin: 10 }}>
      <button onClick={handleJoin}>Join</button>
      <button onClick={handleStartSpeaking}>Start Speaking</button>
      <button onClick={handleLeave}>Leave</button>
    </div>
  );
}

export default Home;
