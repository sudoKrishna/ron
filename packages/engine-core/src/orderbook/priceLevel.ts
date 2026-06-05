// const queue = new Map<number , string[]>();

// function joinQueue(price : number , orderId : string) {
// if(!queue.has(price)) {
//     queue.set(price , [])
// }

// queue.get(price)!.push(orderId)
// }

// function getNextOrder(price : number) : string | undefined {
//     return queue.get(price)?.shift()
// }


export class Order {
  id: string;
  price: number;
  quantity: number;

  prev: Order | null = null;
  next: Order | null = null;
  
  constructor(id : string , price : number , quantity : number) {
    this.id = id;
    this.price = price;
    this.quantity = quantity;
  }
}

export class PriceLevel {
   price : number;
   head : Order | null  = null;
   tail : Order | null = null;

   totalQuantity : number = 0;
   orderCount : number = 0;

   constructor (price : number) {
    this.price = price ;
   }

   add(order : Order) : void {
    if(!this.tail) {
        this.head = this.tail = order;
    } else  {
        this.tail.next = order;
        order.prev = this.tail
        this.tail = order;
    }

    this.totalQuantity += order.quantity;
    this.orderCount  += 1;
   }
 
   remove(order : Order)  : void{
   const prev = order.prev;
   const next = order.next;

   if(prev) prev.next = next;
   else this.head = next;
   if(next) next.prev = prev;
   else this.tail = prev;

   order.prev = null;
   order.next = null;

   this.totalQuantity -= order.quantity;
   this.orderCount -= 1;
   }

   matchHead(quantity : number) : number {
    if(!this.head)  return 0; 

    const headOrder = this.head;

    const executed  = Math.min(headOrder.quantity, quantity);
    headOrder.quantity -= executed;
    this.totalQuantity -= executed;

    if(headOrder.quantity === 0) {
        this.remove(headOrder)
    }
    return executed
   }

   isEmpty() : boolean  {
    return this.head === null;
   }

}