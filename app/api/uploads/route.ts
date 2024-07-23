import fs from 'fs';
import multer from 'multer';
import { NextRequest, NextResponse } from 'next/server';
import { promisify } from 'util';

// Configure Multer storage
const upload = multer({
  storage: multer.diskStorage({
    destination: './public/uploads', // Specify the upload directory
    filename: (req, file, cb) => {
      cb(null, file.originalname); // Keep the original filename
    },
  }),
});

// Convert Multer middleware to a promise to use with async/await
const uploadMiddleware = promisify(upload.single('file'));

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get('image');
  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }
  if (file instanceof File) {
    try {
      const fileName = file.name.replace(/ /g, '_');
      const tempFilePath = `./public/uploads/${fileName}`;
      const fileStream = fs.createWriteStream(tempFilePath);
      const fileBuffer = Buffer.from(await file.arrayBuffer());
      fileStream.write(fileBuffer);
      fileStream.end();

      const fileUploadApi =
        process.env.NEXT_PUBLIC_NODE_ENV === 'development'
          ? 'http://localhost:3000'
          : process.env.NEXT_PUBLIC_APP_URL;
      const link = `${fileUploadApi}/uploads/${fileName}`;
      // const link = `/uploads/${fileName}`;
      console.log('link', link);
      return NextResponse.json(
        {
          data: 'File uploaded successfully',
          link: link,
        },
        { status: 200 }
      );
    } catch (error: any) {
      return NextResponse.json(
        { error: `Something went wrong: ${error.message}` },
        { status: 500 }
      );
    }
  }
}
