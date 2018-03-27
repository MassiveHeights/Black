// class BST {
//   constructor(compareFn) {
//     this.mRoot = null;
//     this.mComparer = compareFn || BST.defaultComparer;
//   }

//   insert(data) {
//     let newNode = new BSTNode(data);

//     if (this.mRoot === null)
//       return (this.mRoot = newNode);

//     let current = this.mRoot;
//     let parent = null;

//     while (current !== null) {
//       parent = current;

//       let diff = this.mComparer(data, current.data);
//       if (diff < 0) {
//         current = current.left;

//         if (current === null)
//           parent.left = newNode;
//       } else if (diff > 0) {
//         current = current.right;

//         if (current === null)
//           parent.right = newNode;
//       }
//       else
//         return Debug.throw('Duplicates is not allowed.');
//     }
//   }

//   traverseInOrder(action) {
//     function inOrder(node) {
//       if (node == null)
//         return;

//       if (node.left !== null)
//         inOrder(node.left);

//       action(node);

//       if (node.right !== null)
//         inOrder(node.right);
//     }

//     inOrder(this.mRoot);
//   }
// }

// class BSTNode {
//   constructor(data) {
//     this.data = data;

//     this.left = null;
//     this.right = null;
//   }
// }

// BST.defaultComparer = (a, b) => {
//   //return a - b;
//   if (a === b)
//     return 0;

//   return a < b ? -1 : 1;
// }