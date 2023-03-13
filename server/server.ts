import express from 'express';
import fs from 'fs';
import path from 'path';

const PORT: number = 80;

const createServer = async (root = process.cwd()) => {
    const resolve = (p: string) => path.resolve(__dirname, p);

    const app = express();

    const vite = await require('vite').createServer({
        root,
        server: { middlewareMode: true },
    });

    app.use(vite.middlewares);

    app.use('*', async (req, res) => {
        try {
            const url = req.originalUrl;
            const template = fs.readFileSync(resolve('./index.html'), 'utf-8');
            const [appHtml] = await vite.transformIndexHtml(url, template);
            res.status(200).set({ 'Content-Type': 'text/html' }).end(appHtml);
        } catch (e: any) {
            vite.ssrFixStacktrace(e);
            console.error(e);
            res.status(500).end(e.message);
        }
    });

    return { app, vite };
}

createServer().then(({ app }) => {
    app.listen(PORT, () => {
        console.log(`http://localhost:${PORT}`);
    });
});