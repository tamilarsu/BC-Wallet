// Represent a specific value of a coin
class Coin {
  private value: number;

  constructor(value: number) {
    this.value = value;
  }

  get(): number {
    return this.value;
  }

  set coinValue(value: number) {
    console.log(value);
    this.value = value;
  }
}

export default Coin;
