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
    if (this.#size < 1) {
      throw new Error("List is empty");
    }
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
    if (index >= this.#size || this.#size == 0) {
      throw new Error("Index out of range");
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
  getNodeAt(index) {
    if (index > this.#size - 1 || index < 0) {
      throw new Error("Index out of range");
    }
    let node = null;
    let counter = 0;
    while (counter <= index) {
      node = counter == 0 ? this.#head : node.nextNode;
      counter++;
    }
    return node;
  }
  insertAt(value, index) {
    if (index > this.#size - 1 || index < 0) {
      throw new Error("Index out of range");
    }
    let insertedNode = new Node(value);
    let targetNode = this.getNodeAt(index);
    insertedNode.previousNode = targetNode;
    insertedNode.nextNode = targetNode.nextNode ? targetNode.nextNode : null;
    if (targetNode.nextNode) {
      targetNode.nextNode.previousNode = insertedNode;
    }
    targetNode.nextNode = insertedNode;
    this.#tail = this.#size - 1 == index ? targetNode : this.#tail;
    this.#size++;
  }
  removeAt(index) {
    if (index > this.#size - 1 || index < 0) {
      throw new Error("Index out of range");
    }
    let targetNode = this.getNodeAt(index);
    if (index == 0) {
      this.#head = this.#head.nextNode;
    }
    if (index == this.#size - 1) {
      this.#tail = this.#tail.previousNode;
    }
    if (targetNode.nextNode) {
      targetNode.nextNode.previousNode = targetNode.previousNode
        ? targetNode.previousNode
        : null;
    }
    if (targetNode.previousNode) {
      targetNode.previousNode.nextNode = targetNode.nextNode
        ? targetNode.nextNode
        : null;
    }
    this.#size--;
  }
}
