class Node {
  constructor(value = undefined, previousNode = null, nextNode = null) {
    this.value = value;
    this.previousNode = previousNode;
    this.nextNode = nextNode;
  }
}
class LinkedList {
  #size = 0;
  #head = null;
  #tail = null;
  constructor() {
    this.#size = 0;
  }
  appendNode({ ...node }) {
    if (!this.#head) {
      this.#head = node;
      this.#tail = node;
    } else {
      this.#tail.nextNode = node;
      node.previousNode = this.#tail;
      this.#tail = node;
    }
    this.#size++;
  }
  prepend({ ...node }) {
    if (!this.#head) {
      this.#head = node;
      this.#tail = node;
    } else {
      node.nextNode = this.#head;
      this.#head.previousNode = node;
      this.#head = node;
    }
    this.#size++;
  }
  pop() {
    this.#tail = this.#tail.previousNode;
    this.#tail.nextNode = null;
    this.#size--;
  }
  get size() {
    return this.#size;
  }
  get head() {
    return this.#head;
  }
  get tail() {
    return this.#tail;
  }
  at(index) {
    if (index > this.#size || this.#size == 0) {
      return null;
    }
    let targetNode = null;
    let counter = 0;
    while (counter <= index) {
      targetNode = counter == 0 ? this.#head : targetNode.nextNode;
      counter++;
    }
    return targetNode;
  }
  contains(value) {}
}
let list = new LinkedList();
list.appendNode(new Node("10"));
list.appendNode(new Node("20"));
list.appendNode(new Node("30"));
