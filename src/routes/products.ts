import { Router } from "express";
import { connection } from "../db";
import {protect} from "../controllers/auth"
import {getProducts,createProduct,updateProduct}from "../controllers/products"
const router = Router();

router.route('/')
    .get(getProducts)
    .post(protect,createProduct);
router.route('/:id')
    .get()
    .patch(protect,updateProduct);
    
export default router ;