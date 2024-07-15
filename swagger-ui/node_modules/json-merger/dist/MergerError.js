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
var json_ptr_1 = require("json-ptr");
var Scope_1 = require("./Scope");
var MergerError = (function (_super) {
    __extends(MergerError, _super);
    function MergerError(originalError, scope) {
        var _this = _super.call(this) || this;
        _this.__proto__ = MergerError.prototype;
        var message = _this._createMessage(scope);
        var stack = _this._createProcessingStackTrace(scope);
        _this.name = "MergerError";
        _this.message = "".concat(message).concat(stack, "\n").concat(originalError.message);
        _this.stack = "".concat(message).concat(stack, "\n").concat(originalError.stack);
        return _this;
    }
    MergerError.prototype._createMessage = function (scope) {
        var message = "";
        if (scope) {
            var lastProp = scope.propertyPath[scope.propertyPath.length - 1];
            message = "An error occurred while processing the property \"".concat(lastProp, "\"\n");
        }
        return message;
    };
    MergerError.prototype._createProcessingStackTrace = function (scope) {
        var trace = "";
        var currentScope = scope;
        while (currentScope && !(currentScope instanceof Scope_1.GlobalScope)) {
            var pathEncoded = (0, json_ptr_1.encodePointer)(currentScope.propertyPath);
            var filePath = "";
            if (currentScope instanceof Scope_1.MergeFileScope ||
                currentScope instanceof Scope_1.RootMergeFileScope) {
                filePath = currentScope.sourceFilePath;
            }
            trace += "    at ".concat(filePath, "#").concat(pathEncoded, "\n");
            currentScope = currentScope.parent;
        }
        return trace;
    };
    return MergerError;
}(Error));
exports.default = MergerError;
//# sourceMappingURL=MergerError.js.map