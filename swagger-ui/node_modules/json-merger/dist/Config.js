"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ArrayMergeOperations = [
    "combine",
    "replace",
    "concat",
];
var Config = (function () {
    function Config(config) {
        this.set(config);
    }
    Config.prototype.set = function (config) {
        config = config || {};
        this.cwd = typeof config.cwd === "string" ? config.cwd : "";
        this.errorOnFileNotFound = config.errorOnFileNotFound !== false;
        this.errorOnRefNotFound = config.errorOnRefNotFound !== false;
        this.operationPrefix =
            typeof config.operationPrefix === "string" ? config.operationPrefix : "$";
        this.params = config.params;
        this.stringify =
            config.stringify === true || config.stringify === "pretty"
                ? config.stringify
                : false;
        this.defaultArrayMergeOperation =
            ArrayMergeOperations.indexOf(config.defaultArrayMergeOperation) !== -1
                ? config.defaultArrayMergeOperation
                : "combine";
    };
    return Config;
}());
exports.default = Config;
//# sourceMappingURL=Config.js.map