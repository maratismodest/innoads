'use client';

import { useState } from 'react';

export default function Home() {
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('/api/uploads', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      console.log(result);
    }
  };

  return (
    <div>
      <h1>Upload File</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          onChange={event => {
            if (event.target.files) {
              setFile(event.target.files[0]);
            }
          }}
        />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}
