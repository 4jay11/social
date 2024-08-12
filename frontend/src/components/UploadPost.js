import React, { useState } from 'react';
import './UploadPost.css';

const UploadPost = () => {
  const [image, setImage] = useState(null);
  const [summary, setSummary] = useState('');

  const handleImageChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleSummaryChange = (e) => {
    setSummary(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission logic here
    console.log('Image:', image);
    console.log('Summary:', summary);
  };

  return (
    <div className="upload-form-container">
      <form onSubmit={handleSubmit} className="upload-form">
        <div className="image-upload">
          <label htmlFor="imageInput" className="image-label">
            {image ? (
              <img src={image} alt="Preview" className="image-preview" />
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
            value={summary}
            onChange={handleSummaryChange}
            className="summary-input"
          />
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default UploadPost;
