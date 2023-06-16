import express from 'express';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import WebSocket, { WebSocketServer } from 'ws';
import fs from 'fs';
import { createCanvas, loadImage } from 'canvas';

const app = express();
const port = 80;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const clientBuildPath = path.resolve(__dirname, '../../client/dist');

app.use(express.static(clientBuildPath));

app.get('*', (req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const wss = new WebSocketServer({ port: 8080 });

const clients: WebSocket[] = [];

wss.on('connection', (ws: WebSocket) => {
    clients.push(ws);
    ws.on('close', () => {
        clients.splice(clients.indexOf(ws), 1);
    });

    fs.readFile('place/place.png', async (err, data) => {
        const canvas = createCanvas(1000, 1000);
        const ctx = canvas.getContext('2d');
        const img = await loadImage(data)
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, 1000, 1000);
        const pixelData = Array.from(imageData.data);

        ws.send(JSON.stringify({
            type: 'canvas',
            canvas: pixelData,
            width: 1000,
            height: 1000
        }));
    })

    ws.on('message', (message: string) => {

    });
});