// const { array } = require("joi");

// const arr = [
//   {
//     _id: "5f161a73b069a8011e9d0ce7",
//     children: [],
//     title: "444",
//     icon: "uploads/icons/1595284077925.png",
//     parentId: null,
//     updatedAt: "2020-07-20T22:28:03.751Z",
//     createdAt: "2020-07-20T22:28:03.751Z",
//   },
//   {
//     _id: "5f1aa7f6f80059014a6e2b93",
//     children: ["5f1aa82cf80059014a6e2b95"],
//     title: "تست",
//     icon: "uploads/icons/1595582452344.png",
//     parentId: "5f161a73b069a8011e9d0ce7",
//     updatedAt: "2020-07-24T09:20:54.673Z",
//     createdAt: "2020-07-24T09:20:54.673Z",
//   },
//   {
//     _id: "5f1aa82cf80059014a6e2b95",
//     children: [],
//     title: "تست 1",
//     icon: "uploads/icons/1595582489976.png",
//     parentId: "5f1aa7f6f80059014a6e2b93",
//     updatedAt: "2020-07-24T09:21:48.487Z",
//     createdAt: "2020-07-24T09:21:48.487Z",
//   },
// ];

// function getParent(id, d) {
//   const fin = arr.find((res) => {
//     if (res._id === id) {
//       return res;
//     }
//   });
//   if (fin) {
//     d.push(fin);
//     getParent(fin.parentId, d);
//   }
//   return fin;
// }
// let d = [];
// getParent("5f1aa7f6f80059014a6e2b93", d)
// console.log(d);

let a=(async () => {
  return await setTimeout(() => {
    console.log("1");
    return 100;
  }, 1000);
})();
console.log("2");
