import multer from "multer";
import { Storage } from '@google-cloud/storage';
import Users from "../models/UserModels.js";

const storage = new Storage({
    projectId: 'capstone-trackmeals-405419',
    keyFilename: './config/key.json',
});

export default storage;

export const multerImage = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024,
    },
});

const bucket = storage.bucket("profile-image-user-trackmeals");

export const uploadImage = async (req, res) => {
    try {
        if (req.file) {

            if (!req.file) {
                return res.status(400).json({
                    error: true,
                    message: "Please provide all the required details",
                });
            }
            const uniqueFilename = `${Date.now()}.png`;

            console.log('file found trying to upload');
            const blob = bucket.file(uniqueFilename);
            const blobStream = blob.createWriteStream({});

            blobStream.on('finish', async () => {
                const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
                const userId = req.params.id;

                try {
                    // Use await to wait for the update operation to complete
                    await Users.update(
                        {
                            profilePic: publicUrl,
                        },
                        {
                            where: {
                                userId: userId,
                            },
                        }
                    );
                    res.status(200).send({
                        error: false,
                        message: 'Image uploaded.',
                        data: {
                            userId: userId,
                            profilePic: publicUrl,
                        }

                    });
                } catch (updateError) {
                    res.status(500).send({
                        error: true,
                        message: 'Internal Server Error',
                    });
                }
            });

            blobStream.end(req.file.buffer);
        }
    } catch (error) {
        res.status(500).send({
            error: true,
            message: 'Internal Server Error',
        });
    }
};
