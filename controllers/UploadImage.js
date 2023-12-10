import multer from "multer";
import { Storage } from "@google-cloud/storage";
import Users from "../models/UserModels.js";

const storage = new Storage({
    projectId: "capstone-trackmeals-405419",
    keyFilename: "./config/key.json",
});

const bucket = storage.bucket("profile-image-user-trackmeals");

export const multerImage = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024,
    },
});

export const uploadImage = async (req, res) => {
    const userId = req.params.id;

    try {
        if (!req.file) {
            return res.status(400).json({
                error: true,
                message: "Please provide an image file",
            });
        }

        const uniqueFilename = `profil-${userId}.png`;
        const blob = bucket.file(uniqueFilename);

        const [exists] = await blob.exists();

        if (exists) {
            await blob.delete();
        }

        const blobStream = blob.createWriteStream();

        blobStream.on("finish", async () => {
            const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

            try {
                await Users.update(
                    { profilePic: publicUrl },
                    { where: { userId: userId } }
                );

                res.status(200).json({
                    error: false,
                    message: "Image uploaded.",
                    data: { userId, profilePic: publicUrl + "?authuser=1" },
                });
            } catch (updateError) {
                console.error("Database update error:", updateError);
                res.status(500).json({
                    error: true,
                    message: "Failed to update user record.",
                });
            }
        });

        blobStream.end(req.file.buffer);
    } catch (uploadError) {
        console.error("Image upload error:", uploadError);
        res.status(500).json({
            error: true,
            message: "Internal Server Error",
        });
    }
};

export const deleteImage = async (req, res) => {
    const userId = req.params.id;

    try {
        const uniqueFilename = `profil-${userId}.png`;
        const blob = bucket.file(uniqueFilename);

        const [exists] = await blob.exists();

        if (exists) {
            await blob.delete();

            await Users.update(
                { profilePic: null },
                { where: { userId: userId } }
            );

            res.status(200).json({
                error: false,
                message: "Image deleted.",
            });
        } else {
            res.status(404).json({
                error: true,
                message: "Image not found.",
            });
        }
    } catch (deleteError) {
        console.error("Image delete error:", deleteError);
        res.status(500).json({
            error: true,
            message: "Internal Server Error",
        });
    }
};
