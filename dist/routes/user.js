"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const auth_1 = require("../controllers/auth");
const router = (0, express_1.Router)();
router.route('/login')
    .post(auth_1.login);
router.route('/register')
    .post(user_1.registerUser);
router.route('/')
    .post(auth_1.protect);
exports.default = router;
