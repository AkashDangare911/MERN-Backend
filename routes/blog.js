import express from "express";
import AuthController from "../controllers/authController.js";
import BlogController from "../controllers/blogController.js";
import CategoryController from "../controllers/categoryController.js"
import multer from "multer";
import checkIsUserAuthenticated from "../middleware/authMiddleWare.js";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `public/upload/`);
    },
    filename: function (req, file, cb){
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = multer({ storage:storage });


const router = express.Router();

router.post("/user/register",AuthController.userRegistration);
router.post("/user/login",AuthController.userLogin);

// PROTECTED ROUTES

router.get("/get/saareblogs",checkIsUserAuthenticated,BlogController.getSaareBlogs);
router.get("/get/myblogs",checkIsUserAuthenticated,BlogController.getMyBlogs);
router.post("/add/blog",upload.single("thumbnail"),checkIsUserAuthenticated,BlogController.addNewBlog);
router.get("/get/blog/:id",checkIsUserAuthenticated,BlogController.getSingleBlog);
// router.delete("/get/myblogs/:id",checkIsUserAuthenticated,BlogController.deleteBlog);

router.get("/get/categories",checkIsUserAuthenticated,CategoryController.getAllCategories);
router.post("/add/category",checkIsUserAuthenticated,CategoryController.addNewCategory);

export default router;
