import React, { useState ,useEffect} from "react";
import "./UploadPost.css";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";

const UploadPost = () => {
  const [summary, setSummary] = useState("");
  const [imgFile, setImgFile] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [cloudImgId, setCloudImgId] = useState(null);
  const [location, setLocation] = useState('');


  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const res = await axios.get(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
            );
            const { city, principalSubdivision, countryName } = res.data;
            setLocation(`${city}/${principalSubdivision}, ${countryName}`);
          } catch (error) {
            console.error('Error fetching location:', error);
          }
        },
        (error) => {
          console.error('Error getting geolocation:', error);
        }
      );
    }
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImgFile(file);
    setImgPreview(URL.createObjectURL(file));
  };

  const handleSummaryChange = (e) => {
    setSummary(e.target.value);
  };

  const uploadFile = async () => {
    const data = new FormData();
    data.append("file", imgFile);
    data.append("upload_preset", "images_preset");

    try {
      const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
      const api = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

      const res = await axios.post(api, data);
      const { secure_url } = res.data;

      if (secure_url) {
        setCloudImgId(secure_url);
        return secure_url;
      } else {
        throw new Error("Failed to upload file");
      }
    } catch (error) {
      console.error("Error during Cloudinary upload:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const imageUrl = await uploadFile();

      if (imageUrl) {
        console.log("SuccessfullyUploadedImage"+imageUrl);
        
        setImgFile(null);
        setImgPreview(null);
        document.getElementById("imageInput").value = ""; // Clear file input
        document.getElementById("textarea").value = ""; // Clear file input
        
        const res = await axios.post("http://127.0.0.1:5000/api/users/post", {
          user_id: "1", // Replace with actual user ID
          image_url: imageUrl,
          caption: summary,
          location:location
        });

        console.log("Backend response:", res.data);
        setMessage("Post added successfully");
      } else {
        setMessage("Failed to upload image");
      }
    } catch (error) {
      console.error("Error during post creation:", error);
      setMessage("Error during post creation");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-form-container">
      <form onSubmit={handleSubmit} className="upload-form">
        <div className="image-upload">
          <label htmlFor="imageInput" className="image-label">
            {imgPreview ? (
              <img src={imgPreview} alt="Preview" className="image-preview" />
            ) : (
              <span className="image-placeholder">Click to Upload Image</span>
            )}
          </label>
          <input
            type="file"
            id="imageInput"
            accept="image/*"
            onChange={handleImageChange}
            className="image-input"
          />
        </div>
        <div className="summary-input-container">
          <textarea
            placeholder="Write a summary..."
            id="textarea"
            value={summary}
            onChange={handleSummaryChange}
            className="summary-input"
          />
        </div>
        <button type="submit" disabled={loading} className="submit-button">
          Submit
        </button>
        {loading && (
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#4fa94d"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        )}
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default UploadPost;
