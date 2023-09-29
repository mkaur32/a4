"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.createUser = void 0;
const user_1 = __importDefault(require("../model/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, userPassword } = req.body;
        const existingUser = yield user_1.default.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }
        const newUser = new user_1.default({ username, userPassword });
        yield newUser.save();
        return res.status(201).json({ message: 'User created successfully' });
    }
    catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
});
exports.createUser = createUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, userPassword } = req.body;
        const user = yield user_1.default.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Authentication failed' });
        }
        const isPasswordValid = yield user.comparePassword(userPassword);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Authentication failed' });
        }
        // Create a JWT token with the user's identity (username)
        const token = jsonwebtoken_1.default.sign({ user: user.username }, 'your-secret-key', {
            expiresIn: '1h', // Token expiration time
        });
        // console.log(token)
        console.log("I got hereee");
        return res.status(200).json({ message: 'Authentication successful', token });
    }
    catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
});
exports.loginUser = loginUser;
