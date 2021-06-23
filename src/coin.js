"use strict";
exports.__esModule = true;
// Represent a specific value of a coin
var Coin = /** @class */ (function () {
    function Coin(value) {
        this.value = value;
    }
    Coin.prototype.get = function () {
        return this.value;
    };
    return Coin;
}());
exports["default"] = Coin;
