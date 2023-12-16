import { Storage } from '@google-cloud/storage';

const storage = new Storage({
    projectId: 'capstone-trackmeals-405419',
    keyFilename: 'key.json',
});

export default storage;