//********************************************************************************
// Part 2 : Tests
//
// * Describe your process to tests some of the functions and properties above
// * It can either be code, or just commented explanations on the testing procedure
//   (what, how, ..)
//********************************************************************************
import Wallet from '../src/wallet';
import Coin from '../src/coin';
import { expect, assert } from 'chai';
// if you used the '@types/mocha' method to install mocha type definitions, uncomment the following line
// import 'mocha';
let wallet = new Wallet(10);
// to test the call constructor
describe('Wallet Constructor', () => {
  it('add coin to the wallet using constructor', () => {
    let walletConstructor = new Wallet(20);
    console.log(walletConstructor);
    expect(walletConstructor);
  });
});

describe('Wallet add coin', () => {
    it('add coin to the wallet using add method', () => {
      let added = wallet.add(new Coin(20));
      expect(added);
    });
  });

  describe('Test Suite 1', function () {
    it('add', function () {
      let wallet = new Wallet(10);
      let a = wallet.available();
      console.log(' --- ', wallet.available());
      expect(a);
    })
 })

 describe('Array', function() {
    describe('#indexOf()', function() {
      it('should return -1 when the value is not present', function(){
        assert.equal(-1, [1,2,3].indexOf(4));
      });
    });
  });