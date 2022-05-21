"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const products_1 = require("../controllers/products");
const router = (0, express_1.Router)();
router.route('/')
    .get(products_1.getProducts)
    .post(auth_1.protect, products_1.createProduct);
router.route('/:id')
    .get()
    .patch(auth_1.protect, products_1.updateProduct);
exports.default = router;
