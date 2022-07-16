class PriceOrder {
  #basePrice;
  #product;
  #quantity;
  #shippingMethod;
  
  constructor(product, quantity, shippingMethod){
    this.#basePrice = product.basePrice * quantity;
    this.#product = product;
    this.#quantity = quantity;
    this.#shippingMethod = shippingMethod; 
  }
  
  get discount(){
  return Math.max(this.#quantity - this.#product.discountThreshold, 0) *
    this.#product.basePrice *
    this.#product.discountRate;
  }

  get shippingPerCase(){
    return this.#basePrice > this.#shippingMethod.discountThreshold
    ? this.#shippingMethod.discountedFee
    : this.#shippingMethod.feePerCase;
  }

  get shippingCost(){
    return this.#quantity * this.shippingPerCase;
  }

  get price(){
    return this.#basePrice - this.discount + this.shippingCost;
  }
}

const product = {
  basePrice: 10,
  discountRate: 0.1,
  discountThreshold: 10,
};

const shippingMethod = {
  discountThreshold: 20,
  feePerCase: 5,
  discountedFee: 3,
};

const price = new PriceOrder(product, 5, shippingMethod);
console.log(price)