'use client';

import Image from 'next/image';
import { ChangeEvent, FormEvent, useState } from 'react';

import { uploadClientFile } from '@/utils/api/client/uploadClientFile';

export default function FileUploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState<string | undefined>();
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) return;
    try {
      const result = await uploadClientFile(file);
      console.log(result);
      setUrl(result.link);
      // Handle successful upload (e.g., show success message, reset form)
    } catch (error) {
      console.error('Upload failed:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <div>
      <h1>Upload File</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit" disabled={!file}>
          Upload
        </button>
      </form>
      {url && <Image width={300} height={300} alt="" src={url} />}
    </div>
  );
}
