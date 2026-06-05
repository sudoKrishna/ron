isme doubley link list lagayi hai why?
what is doulble linklist ?

ex : train me jest har diba node hai dibe ke pass 2 links hai aagewalte coach ke tarf or pichu

so this is doubly link list

har dibe me 3 chise hoti hai 
- data value stote hoto hai 
- prev pointer pichle dibe ka pata add.
- next pointer agle node ka address

ex :
null <- [10] <-> [20] <-> [30] -> null

10 ka prev = NULL (kyunki pehla node hai)
10 ka next = 20
20 ka prev = 10
20 ka next = 30
30 ka next = NULL (kyunki last node hai)

aab why linked list array kyun nahi 
array middel se delete = o(n)
shift lagta hai delete karne mai

linkedlist me delete any order = o(1)
no shifting 
trading ke liye thik hai

export class privelevel kya jai kiyo hai same price ke order ka group

- fifo 
head: Order | null = null;
tail: Order | null = null;

head  = first order 
tail = last order

head - 1 - 2 -3 -tail

add fun fifo insetion 

if !this.tail { this.head === this.tail = order}

else {
    this.tail.next = order 
}
mtlb first order aaye head = tail = same node 

aagar delete karna hai 
phele neghbors save kar liye 

reconnect prev
if (prev) prev.next = next;
else this.head = next;

agae prev hai skip current 
agae prev nahi this was head 

reconnect next same login dobara 
clean node 
order.prev = null;
order.next = null;

