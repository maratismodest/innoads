import React from 'react';
import axios from 'axios';
import Input from '../components/Input/Input';
import handleImageUpload from '../functions/handleImageUpload';

const Test = () => {

        async function getCompressedImagesLinks(imagesFromInput: any) {
            for (let i = 0; i < imagesFromInput.length; i++) {
                const initialImage = imagesFromInput[i];
                const resizedImage = await handleImageUpload(imagesFromInput[i]);
                if (resizedImage) {
                    const formData = new FormData();
                    formData.append("image", resizedImage);
                    const res = await axios.post('http://80.78.253.184:8080', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })

                    console.log("res",res)

                }
                // const res = await axios.post('http://80.78.253.184:8080', resizedImage)


                // console.log("RESRESRESRESRESRESRESRESRES", res)
                // const image = storage.ref().child(initialImage.name);
                // await image.put(resizedImage);
                // const imageLink = await image.getDownloadURL();
                // setImages((prevState: string[]) => [...prevState, imageLink]);
            }
        }

        const imageHandler = async (e: any) => {
            const imagesFromInput = e.target.files;
            // const length = imagesFromInput.length + images.length;
            // if (length > 4) {
            //     return setError("Не больше 4 фотографий!");
            // }
            // setLoading(true)
            await getCompressedImagesLinks(imagesFromInput);
            // setLoading(false)
        };

        return (
            <Input
                id="upload"
                type="file"
                onChange={imageHandler}
                // hidden
                multiple
                name='image'
                accept=".jpg, .jpeg, .png"
            />
        );
    }
;

export default Test;