"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isObject = void 0;
function isObject(value) {
    if (typeof value === "object" && value !== null) {
        if (typeof Object.getPrototypeOf === "function") {
            var proto = Object.getPrototypeOf(value);
            return proto === Object.prototype || proto === null;
        }
        return Object.prototype.toString.call(value) === "[object Object]";
    }
    return false;
}
exports.isObject = isObject;
//# sourceMappingURL=types.js.map