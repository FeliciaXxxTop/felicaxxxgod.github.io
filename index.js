import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

function encryptFileName(originalName) {
    const encryptedName = crypto.createHash('sha256')
        .update(originalName + Date.now())
        .digest('hex');
    return encryptedName;
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const encryptedName = encryptFileName(file.originalname);
        const fileExtension = path.extname(file.originalname);
        cb(null, encryptedName + fileExtension);
    }
});

const upload = multer({ storage: storage });

app.get('/skibidi-toilet', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>File Upload</title>
        </head>
        <body>
            <h1>Upload your file</h1>
            <form id="uploadForm">
                <input type="file" id="fileInput" name="file" required>
                <button type="submit">Upload</button>
            </form>
            <p id="statusMessage"></p>
            <script>
                document.getElementById('uploadForm').addEventListener('submit', async (event) => {
                    event.preventDefault();

                    const fileInput = document.getElementById('fileInput');
                    const formData = new FormData();
                    formData.append('file', fileInput.files[0]);

                    try {
                        const response = await fetch('/upload', {
                            method: 'POST',
                            body: formData,
                        });

                        const result = await response.json();
                        const statusMessage = document.getElementById('statusMessage');

                        if (response.ok) {
                            statusMessage.textContent = \`File uploaded successfully: \${result.fileUrl}\`;
                            window.location.href = result.pageUrl; // Redirect to the dynamic page
                        } else {
                            statusMessage.textContent = \`File upload failed: \${result.message}\`;
                        }
                    } catch (error) {
                        const statusMessage = document.getElementById('statusMessage');
                        statusMessage.textContent = \`An error occurred: \${error.message}\`;
                        console.error('Error:', error);
                    }
                });
            </script>
        </body>
        </html>
    `);
});

app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    const pageUrl = `${req.protocol}://${req.get('host')}/file/${req.file.filename}`;
    res.send({ message: 'File uploaded successfully', fileUrl: fileUrl, pageUrl: pageUrl });
});

app.get('/uploads/:filename', (req, res) => {
    const filePath = path.join(uploadDir, req.params.filename);
    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.status(404).send('File not found');
    }
});

app.get('/file/:filename', (req, res) => {
    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.params.filename}`;
    const uploadTime = new Date().toLocaleString();
    const uploader = "neyoshiiuem";

    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>FeliciaXxx The Slump God</title>

            <!-- Open Graph Meta Tags -->
            <meta property="og:title" content="FeliciaXxx The Slump God">
            <meta property="og:description" content="im not ching chong, fuck u ass">
            <meta property="og:url" content="${fileUrl}">
            <meta property="og:image" content="${fileUrl}">
            <meta property="og:image:width" content="1280" />
            <meta property="og:image:height" content="720" />
            <meta property="og:type" content="website">
            <meta property="og:site_name" content="feliciaxxx.xyz">
            <meta property="og:locale" content="en_US">
            <meta property="og:author" content="${uploader}">
            <meta property="og:published_time" content="${new Date().toISOString()}">
            <meta property="og:color" content="#2F3136">

            <!-- Twitter Card Meta Tags -->
            <meta name="twitter:card" content="summary_large_image">
            <meta name="twitter:title" content="FeliciaXxx The Slump God">
            <meta name="twitter:description" content="im not ching chong, fuck u ass">
            <meta name="twitter:image" content="${fileUrl}">
            <meta name="twitter:creator" content="@FeliciaXxx">
            <meta name="twitter:site" content="@FeliciaXxx">
            <meta name="twitter:label1" content="Uploaded by">
            <meta name="twitter:data1" content="${uploader}">
            <style>
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    background-color: #2F3136;
                    color: white;
                    margin: 0;
                    padding: 20px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                }
                .container {
                    background-color: #36393F;
                    padding: 20px;
                    border-radius: 10px;
                    max-width: 600px;
                    width: 100%;
                    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
                }
                .container h1 {
                    font-size: 24px;
                    margin-bottom: 15px;
                    color: #00AEEF;
                }
                .container p {
                    margin: 10px 0;
                    font-size: 16px;
                    color: #B9BBBE;
                }
                .uploader, .filename {
                    color: #0096FF;
                    font-weight: bold;
                }
                .filename {
                    color: #00AEEF;
                    font-weight: bold;
                }
                .embed-image {
                    width: 100%;
                    border-radius: 10px;
                    margin-top: 20px;
                    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
                }
                .footer {
                    font-size: 14px;
                    color: #B9BBBE;
                    margin-top: 20px;
                    text-align: center;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>FeliciaXxx The Slump God</h1>
                <p class="uploader">${uploader}</p>
                <p class="filename">${req.params.filename}</p>
                <p>Uploaded at ${uploadTime} by ${uploader}</p>
                <img src="${fileUrl}" alt="Uploaded Image" class="embed-image">
                <div class="footer">
                    <p>FeliciaXxx The Slump God</p>
                    <p>im not ching chong, fuck u ass</p>
                </div>
            </div>
        </body>
        </html>
    `);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
