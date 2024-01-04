import express from 'express';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import WebSocket, { WebSocketServer } from 'ws';
import { v4 as uuidv4 } from 'uuid';
import fileUpload from 'express-fileupload';
import fs from 'fs';

const app = express();
const port = 80;
const wssPort = 8080;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const clientBuildPath = path.resolve(__dirname, '../../client/dist');

app.use(express.static(clientBuildPath));
app.use(fileUpload());
app.use(express.json());

app.post('/api/motd', (req, res) => {
    const motd = req.body.motd;

    if (!motd) {
        return res.status(400).send('No message provided');
    } else res.status(200).send('Message received');

    fs.writeFile('./motd/motd.uwubaka', motd, (err) => {
        if (err) {
            console.error(err);
        }
    });

    motdClients.forEach((client) => {
        client.send(JSON.stringify({
            type: 'motd',
            motd: motd
        }));
    });
});


app.post('/api/upload', (req, res) => {
    if (!req.files || !req.files.file) {
        return res.status(400).send('No file uploaded');
    }

    const file = req.files.file;

    if (Array.isArray(file)) {
        return res.status(400).send('Invalid file');
    }

    const fileName = uuidv4() + '-' + file.name;
    const uploadPath = path.join(__dirname, 'uploads', fileName);

    file.mv(uploadPath, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }

        res.json({ fileName: fileName, filePath: `/uploads/${fileName}` });
    });
});

app.get('/api/download', (req, res) => {
    console.log('download request received');
    const fileName = 'flstudio.zip';
    const filePath = path.join(__dirname, 'uploads', fileName);

    res.download(filePath, fileName, (err) => {
        if (err) {
            console.error(err);
        }
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const wss = new WebSocketServer({ port: wssPort });

const clients: WebSocket[] = [];
const motdClients: WebSocket[] = [];

wss.on('connection', (ws: WebSocket) => {
    clients.push(ws);
    ws.on('close', () => {
        clients.splice(clients.indexOf(ws), 1);

        if (motdClients.includes(ws))
            motdClients.splice(motdClients.indexOf(ws), 1);
    });

    // fs.readFile('place/place.png', async (err, data) => {
    //     const canvas = createCanvas(1000, 1000);
    //     const ctx = canvas.getContext('2d');
    //     const img = await loadImage(data)
    //     ctx.drawImage(img, 0, 0);

    //     const imageData = ctx.getImageData(0, 0, 1000, 1000);
    //     const pixelData = Array.from(imageData.data);

    //     ws.send(JSON.stringify({
    //         type: 'canvas',
    //         canvas: pixelData,
    //         width: 1000,
    //         height: 1000
    //     }));
    // })

    ws.on('message', (message: string) => {
        const request = JSON.parse(message.toString());

        switch (request.type) {
            case 'motd':
                motdClients.push(ws);

                console.log('motd client connected');

                fs.readFile('./motd/motd.uwubaka', (err, data) => {
                    if (err) {
                        console.error(err);
                    }

                    ws.send(JSON.stringify({
                        type: 'motd',
                        motd: data.toString()
                    }));
                });
                break;
        }
    });
});

wss.on('listening', () => {
    console.log(`WebSocket server is listening on port ${wssPort}`);
});