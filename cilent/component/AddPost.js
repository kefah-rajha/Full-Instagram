import { useState, useRef } from "react";
import axios from "axios";

function AddPost({user}) {
  const [input, setInput] = useState([]);
  const [multiPhoto, setMultiPhotho] = useState([]);
  const [startCaptur, setStartCaptur] = useState(false);
  const videoRef = useRef(null);
  const photoRef = useRef(null);

  const inputFiles = (e) => {
    const files = [...e.target.files];

    const newfiles = [];
    files.map((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        newfiles.push(reader.result);
        setMultiPhotho([...multiPhoto, ...newfiles]);
      };
    });

  };

  const getStreaming = async () => {
    setStartCaptur(true);
    await navigator.mediaDevices
      .getUserMedia({ video: { width: 300 } })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      });
  };
  const CapturePhoto = () => {
    let video = videoRef.current;
    let photo = photoRef.current;
    let ctx = photo.getContext("2d");
    const width = 300;
    const height = 300;
    photo.width = width;
    photo.height = height;
    ctx.drawImage(video, 0, 0, width, height);
    const dataPhot = photo.toDataURL();
    const capturePhoto = [];
    capturePhoto.push(dataPhot);
    console.log(dataPhot);
    setMultiPhotho([...multiPhoto, ...capturePhoto]);
  };
  const closeUploadPhoto = () => {
    if (!startCaptur) return console.log("error");
    const video = videoRef.current;
    const stream = video.srcObject;
    const tracks = stream.getTracks();
    tracks[0].stop();
    setStartCaptur(false);
  };
  function upload(e) {
    e.preventDefault();

    if (!multiPhoto.length) {
      closeUploadPhoto();
    } else {
      closeUploadPhoto();
      const res = axios.post("/api/posts", {images:multiPhoto,id:user._id});
      console.log(res);
      setMultiPhotho([]);
    }
  }
  const deletPhoto = (index) => {
    multiPhoto.splice(index, 1);
  };
  return (
    <div>
      <div>
        {multiPhoto.length > 0 &&
          multiPhoto.map((photo, index) => {
            return (
              <div key={index}>
                <img src={photo} style={{ height: "40px", width: "40px" }} />
              </div>
            );
          })}
      </div>

      <input
        type="file"
        value={input}
        onChange={inputFiles}
        multiple="multiple"
      />
      <button
        type="button"
        className="btn btn-primary btn-block"
        onClick={upload}
      >
        Upload
      </button>
      <button onClick={getStreaming}>Capture Photo</button>
      {startCaptur ? <button onClick={CapturePhoto}>Capture</button> : null}
      {startCaptur ? (
        <div>
          <video ref={videoRef}></video>
          <canvas ref={photoRef}></canvas>
        </div>
      ) : null}
    </div>
  );
}

export default AddPost;
