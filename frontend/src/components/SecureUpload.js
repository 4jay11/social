import axios from 'axios';
import React, { useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';

const SecureUpload = () => {
    const [video, setVideo] = useState(null);
    const [img, setImg] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    console.log(process.env.REACT_APP_CLOUDINARY_API_KEY);
    const uploadFile = async (type,timestamp,signature) => {
        const data = new FormData();
        data.append("file", type === 'image' ? img : video);
        // data.append("upload_preset", type === 'image' ? 'images_preset' : 'videos_preset');
        data.append("timestamp", timestamp);
        data.append("signature", signature);
        data.append('api_key',process.env.REACT_APP_CLOUDINARY_API_KEY);
        
        


        try {
            const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
            const resourceType = type === 'image' ? 'image' : 'video';
            const api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;
    
            const res = await axios.post(api, data);
            const { secure_url } = res.data;

            if (secure_url) {
                
                return secure_url;
            } else {
                throw new Error('Failed to upload file');
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

const getSignatureForUpload=async (folder) => {
    try{
        const res =await axios.post(`${process.env.REACT_APP_BACKEND_BASEURL}/api/sign-upload`,{folder});
        return res.data;
    }catch (error) {
        console.error(error);
    
    }
}

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {

            const {timestamp:imgTimestamp,signature:imgSignature}=await getSignatureForUpload('images');
            const {timestamp:videoTimestamp,signature:vedioSignature}=await getSignatureForUpload('videos');
            
            const imageUrl = await uploadFile('image',imgTimestamp,imgSignature);
            const videoUrl = await uploadFile('video',videoTimestamp,vedioSignature);

            if (imageUrl && videoUrl) {
                // Send backend API request
                // await axios.post(`${process.env.REACT_APP_BACKEND_BASEURL}/api/videos`, { imageUrl, videoUrl });

                setImg(null);
                setVideo(null);
                // Clear the input fields
            document.getElementById('video').value = '';
            document.getElementById('img').value = '';
                setMessage('Files uploaded successfully');
            } else {
                setMessage('Failed to upload files');
            }
        } catch (error) {
            setMessage('Error during file upload');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Upload Files using Cloudinary Services - Secure Upload</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="video">Video</label>
                    <br />
                    <input 
                        type="file" 
                        accept="video/*" 
                        id="video" 
                        onChange={(e) => setVideo(e.target.files[0])} 
                    />
                </div>
                <br />
                <div>
                    <label htmlFor="img">Image</label>
                    <br />
                    <input 
                        type="file" 
                        accept="image/*" 
                        id="img" 
                        onChange={(e) => setImg(e.target.files[0])} 
                    />
                </div>
                <br />
                <button type="submit" disabled={loading}>Upload</button>
            </form>

            {loading && 
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
            }

            {message && <p>{message}</p>}
        </div>
    );
};

export default SecureUpload;
