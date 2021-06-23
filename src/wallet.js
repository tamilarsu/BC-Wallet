"use strict";
exports.__esModule = true;
var coin_1 = require("./coin");
var distribution_1 = require("./distribution");
// The Wallet Class
var Wallet = /** @class */ (function () {
    function Wallet(value) {
        // You are free to change the constructor to match your needs.
        this.coins = [new coin_1["default"](value)];
    }
    //* *******************************************************************************
    // Part 1 : API
    //* *******************************************************************************
    //* *******************************************************************************
    // Part 1.1: return the total amount of coins available in this wallet
    //* *******************************************************************************
    Wallet.prototype.available = function () {
        // TODO: Your implementation here
        // let totalCoins: number = 0;
        // for (let i = 0; i < this.coins.length; i++) {
        //   totalCoins += this.coins[i];
        // }
        console.log(this.coins[0].get());
        return 0;
    };
    //* *******************************************************************************
    // Part 1.2: Add coins to this wallet
    //
    // We want the ability to reserve
    //* *******************************************************************************
    Wallet.prototype.add = function (coin) {
        // TODO: Your implementation here
    };
    //* *******************************************************************************
    // Part 1.3: Distribution of coins
    //
    // We want to be able to categorize the coins scale distribution we have in the wallet.
    //
    // For example, using a scale of 1000, we want to categorize in bucket of the following range:
    //
    // * bucket[0] : 0 .. 999
    // * bucket[1] : 1_000 .. 999_999
    // * bucket[2] : 1_000_000 .. 999_999_999.
    // * bucket[3] : etc
    //
    // Given the following wallet coins: [1_234, 5, 67, 1_000_001] should result in the following:
    // * bucket[0] : [5, 67]
    // * bucket[1] : [1_234]
    // * bucket[2] : [1_000_001]
    //* *******************************************************************************
    Wallet.prototype.distribution = function (scale) {
        var buckets = new Array();
        // TODO: Your implementation here
        return new distribution_1["default"](buckets);
    };
    //* *******************************************************************************
    // Part 1.4: Spending from this wallet a specific amount
    //
    // Try to construct a valid result where the sum of coins return are above the requested
    // amount, and try to stay close to the amount as possible. Explain your choice of
    // algorithm.
    //
    // If the requested cannot be satisfied then an error should be return.
    //* *******************************************************************************
    Wallet.prototype.spend = function (amount) {
        // TODO: Your implementation here
        throw new Error('Spend Error: Insufficient funds in the wallet.');
    };
    //* *******************************************************************************
    // Part 1.5: Reserving assets
    //
    // In certain cases, it's important to consider that some coins need to be reserved;
    // for example we want to put aside some coins from a wallet while
    // we conduct other verification, so that once we really want to spend, we
    //
    // We need a way to reserve and keep a handle of this reservation; this works very similarly
    // to the previous part (1.4) except that the fund are kept in the wallet and reserved
    // until the user either 'cancel' or 'spend' this reservation.
    //
    // With cancel, the locked coins are returned to the available funds
    // With spend, the locked coins are remove from the wallet and given to the user
    //* *******************************************************************************
    Wallet.prototype.reserve = function (amount) {
        // TODO: Your implementation here
        throw new Error('Spend Error: Insufficient funds in the wallet.');
    };
    Wallet.prototype.reservationSpend = function (reservation) {
        // TODO: Your implementation here
        return new Array();
    };
    Wallet.prototype.reservationCancel = function (reservation) {
        // TODO: Your implementation here
    };
    return Wallet;
}());
var wallet = new Wallet(50);
wallet.available();
exports["default"] = Wallet;
