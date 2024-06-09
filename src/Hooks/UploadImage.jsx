// useImageUpload.js
import BrightAlert from 'bright-alert';
import { useState } from 'react';

const useImageUpload = () => {
    const [uploadState, setUploadState] = useState({
        imageUrl: null,
        error: null,
        isLoading: false
    });

    const uploadImage = async (file) => {
        setUploadState({ ...uploadState, isLoading: true });

        try {
            console.log(file);
            const formData = new FormData();
            formData.append('image', file);
            console.log(formData);

            const url = `https://doob.dev/api/v1/image/upload-image`;
            const response = await fetch(url, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                BrightAlert('Failed to upload image', '', 'error');
                throw new Error('Failed to upload image');

            }

            const imageData = await response.json();
            setUploadState({ ...uploadState, imageUrl: imageData.imageUrl });
            return imageData.imageUrl;
        } catch (error) {
            setUploadState({ ...uploadState, error: error.message });
            return null;
        } finally {
            setUploadState({ ...uploadState, isLoading: false });
        }
    };

    return { uploadImage };
};

export default useImageUpload;