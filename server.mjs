import express, { json } from 'express';
import { join, resolve } from 'path';
import { initialize } from './repository.mjs';
import router from './router.mjs';

express()
    .use(json())
    .use(express.static(join(resolve(), 'web')))
    .use('/', router)
    .listen(3000, async () => {
        try {
            await initialize();
        } catch (error) {
            console.error(error);
        }
    });