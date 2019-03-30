"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randInRange = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
};
