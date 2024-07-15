"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Operation_1 = require("./Operation");
var CombineOperation = (function (_super) {
    __extends(CombineOperation, _super);
    function CombineOperation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CombineOperation.prototype.name = function () {
        return "combine";
    };
    CombineOperation.prototype.processInObject = function (keyword, source, target) {
        var keywordValue = source[keyword];
        return this._processor.processSource(keywordValue, target);
    };
    return CombineOperation;
}(Operation_1.default));
exports.default = CombineOperation;
//# sourceMappingURL=CombineOperation.js.map