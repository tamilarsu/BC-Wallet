/* eslint-disable class-methods-use-this */
import Coin from './coin';
import Distribution from './distribution';
import ReservationHandle from './reservation-handle';

// The Wallet Class
class Wallet {
  private coins: Array<Coin>;

  private reserveCoins: Array<Coin> = [];

  constructor(value: number) {
    // You are free to change the constructor to match your needs.
    this.coins = [new Coin(value)];
  }

  //* *******************************************************************************
  // Part 1 : API
  //* *******************************************************************************

  //* *******************************************************************************
  // Part 1.1: return the total amount of coins available in this wallet
  //* *******************************************************************************
  public available(): number {
    // TODO: Your implementation here
    const availableCoins: number = this.getTotalCoins(this.coins, true);
    return availableCoins;
  }

  //* *******************************************************************************
  // Part 1.2: Add coins to this wallet
  //
  // We want the ability to reserve
  //* *******************************************************************************
  public add(coin: Coin) {
    // TODO: Your implementation here
    this.coins.push(coin);
  }

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
  public distribution(scale: number): Distribution {
    const buckets = new Array();
    // TODO: Your implementation here
    return new Distribution(buckets);
  }

  //* *******************************************************************************
  // Part 1.4: Spending from this wallet a specific amount
  //
  // Try to construct a valid result where the sum of coins return are above the requested
  // amount, and try to stay close to the amount as possible. Explain your choice of
  // algorithm.
  //
  // If the requested cannot be satisfied then an error should be return.
  //* *******************************************************************************
  public spend(amount: number): Array<Coin> {
    // TODO: Your implementation here
    // get the total available coin in the wallet.
    const availableCoins: number = this.getTotalCoins(this.coins, true);
    if (availableCoins < amount) throw new Error('Spend Error: Insufficient funds in the wallet.');
    const reserveCoinArray = this.getWalletValues(amount, this.coins);
    this.coins = [];
    for (let k = 0; k < reserveCoinArray.length; k++) {
      this.coins.push(new Coin(reserveCoinArray[k]));
    }
    return this.coins;
  }

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
  public reserve(amount: number): ReservationHandle {
    // TODO: Your implementation here
    const availableCoins: number = this.getTotalCoins(this.coins, true);
    if (availableCoins < amount) throw new Error('Spend Error: Insufficient funds in the wallet.');
    const reserveCoinArray = this.getWalletValues(amount, this.coins);
    this.reserveCoins.push(new Coin(amount));

    this.coins = [];
    for (let k = 0; k < reserveCoinArray.length; k++) {
      this.coins.push(new Coin(reserveCoinArray[k]));
    }

    return this.reserveCoins;
  }

  public reservationSpend(reservation: ReservationHandle): Array<Coin> {
    // TODO: Your implementation here
    const reservedTotalCoins: number = this.getTotalCoins(this.reserveCoins, false);
    const reserveCoinArray = this.getWalletValues(reservation, this.reserveCoins);
    if (reservedTotalCoins < reservation) throw new Error('Spend Error: Insufficient funds in the reservewallet.');
    this.reserveCoins = [];
    for (let k = 0; k < reserveCoinArray.length; k++) {
      this.reserveCoins.push(new Coin(reserveCoinArray[k]));
    }
    return this.reserveCoins;
  }

  public reservationCancel(reservation: ReservationHandle) {
    // TODO: Your implementation here
    const reservedTotalCoins: number = this.getTotalCoins(this.reserveCoins, false);
    if (reservedTotalCoins < reservation) throw new Error('Spend Error: Insufficient funds in the reservewallet.');
    const reserveCancel = this.getWalletValues(reservation, this.reserveCoins);
    this.reserveCoins = [];
    for (let k = 0; k < reserveCancel.length; k++) {
      this.reserveCoins.push(new Coin(reserveCancel[k]));
      this.coins.push(new Coin(reserveCancel[k]));
    }
  }

  private getWalletValues(reservation: number | ReservationHandle, reserveCoins: Array<Coin>) {
    let reserveSpend: any = reservation;
    const walletCoinValueArray:any = [];
    // push coin array to a new array, so that it will be easy to the operations based on the result we get.
    // initial array will look like [ Coin { value: 5}, Coin { value: 15}, ...]
    // new array will look like [5, 10, ...]
    for (let i = 0; i < reserveCoins.length; i++) {
      const walletValue = reserveCoins[i].get();
      walletCoinValueArray.push(walletValue);
    }

    for (let j = 0; j < walletCoinValueArray.length; j++) {
      let updatedReseveamount: any = 0;
      const coinArrayValue: any = walletCoinValueArray[j];
      if (reserveSpend === 0) {
        break;
      }
      if (walletCoinValueArray[j] >= reserveSpend) {
        updatedReseveamount = coinArrayValue - reserveSpend;
        const reserveindex = walletCoinValueArray.indexOf(coinArrayValue);
        // remove the current element from the array
        walletCoinValueArray.splice(reserveindex, 1);
        // if coinarrayvalue becomes 0, then there is need to push that value into the array
        if (updatedReseveamount !== 0) walletCoinValueArray.push(updatedReseveamount);
        reserveSpend = 0;
      } else {
        reserveSpend -= coinArrayValue;
        const index: number = walletCoinValueArray.indexOf(coinArrayValue);
        walletCoinValueArray.splice(index, 1);
      }
    }
    return walletCoinValueArray;
  }

  private getTotalCoins(coin:Array<Coin>, totalCoinBool: Boolean): number {
    let totalCoins: number = 0;
    coin.forEach((val) => {
      const walletValue = val.get();
      totalCoins += walletValue;
    });
    if (totalCoinBool) {
      this.reserveCoins.forEach((val) => {
        const coinValue = val.get();
        totalCoins += coinValue;
      });
    }

    return totalCoins;
  }
}
const wallet = new Wallet(10);
// wallet.add(new Coin(15));
// wallet.add(new Coin(13));
// wallet.available();
// wallet.reserve(5);
// wallet.reservationCancel(5);
// wallet.reserve(23;
// wallet.reservationSpend(2);
// wallet.spend(12);
// wallet.available();
// wallet.getTotalCoins(this.coins);
export default Wallet;
