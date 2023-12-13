import express from "express";
import { Login, Logout, Register, changePassword, forgotPassword, updateProfile } from "../controllers/Users.js";
import { getNutrisions, addNutrisions } from "../controllers/Nutrisions.js";
import { getMealsById, addMeal, deleteMealsById, dashboardAPi } from "../controllers/Meals.js";
import { getRandomFact, addFactHealths } from "../controllers/FactHealths.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import { uploadImage, multerImage } from "../controllers/UploadImage.js";

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello world');
});


router.post('/register', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);
router.post('/forgotpassword', forgotPassword);
router.post('/changepassword/:id', verifyToken, changePassword);
router.put('/updateprofile/:id', verifyToken, updateProfile)
//bug image get image that logged user
router.put('/uploadprofile/:id', verifyToken, multerImage.single('file'), uploadImage);

// Nutrisions
router.get('/nutrisions', getNutrisions);
router.post('/nutrisions', addNutrisions);


//meals
router.get('/meals/:id', getMealsById);
router.post('/addmeal/:id', verifyToken, addMeal);
router.post('/deletemeal/:id', verifyToken, deleteMealsById);
router.get('/dashboard/:id', verifyToken, dashboardAPi);

//fact healths
router.get('/facthealths', getRandomFact);
router.post('/facthealths', addFactHealths);


export default router;