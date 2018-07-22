// case UPDATE_POST:
//   // Create a copy of the current array of posts
//   const currentPostToUpdate = [...state.posts];
//   // Determine at which index in posts array is the post to be deleted
//   const indexToUpdate = currentPostToUpdate.findIndex(function(post) {
//     return post.id === action.payload.id;
//   });
//   // Create a new post object with the new values and with the same array index of the item we want to replace. To achieve this we will use ...spread but we could use concat methos too
//   const newPostToUpdate = {
//     ...currentPostToUpdate[indexToUpdate],
//     text: action.payload.postData.text
//   };
//   // This Log has the purpose to show you how newPostToUpdate looks like
//   // console.log("what is it newPostToUpdate", newPostToUpdate);
//   //use slice to remove the book at the specified index, replace with the new object and concatenate witht he rest of items in the array
//   return {
//     posts: [
//       ...currentPostToUpdate.slice(0, indexToUpdate),
//       newPostToUpdate,
//       ...currentPostToUpdate.slice(indexToUpdate + 1)
//     ]
//   };

// case UPDATE_POST:
// return state.posts.map(post => {
//   if (post.id === action.payload.id) {
//     return {
//       ...state,
//       posts: [...action.payload.postData, ...state.posts]
//     };
//   } else {
//     return state;
//   }
// });
