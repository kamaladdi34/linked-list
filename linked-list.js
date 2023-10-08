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
  contains(value) {
    if (this.#size == 0) {
      return false;
    }
    function check(node) {
      if (node == null) {
        return false;
      }
      if (node.value == value) {
        return true;
      } else {
        return check(node.nextNode);
      }
    }
    return check(this.#head);
  }
  find(value) {
    if (this.#size == 0) {
      return null;
    }
    function check(node, count = 0) {
      if (node == null) {
        return false;
      }
      if (node.value == value) {
        return count;
      } else {
        return check(node.nextNode, ++count);
      }
    }
    return check(this.#head);
  }
  toString() {
    if (this.#size == 0) {
      return "";
    }
    function nodeToString(node) {
      if (node == null) {
        return "(null)";
      }
      return `(${node.value}) => ${nodeToString(node.nextNode)}`;
    }
    return nodeToString(this.#head);
  }
}
let list = new LinkedList();
list.appendNode(new Node("10"));
list.appendNode(new Node("20"));
list.appendNode(new Node("30"));
console.log(list.toString());
