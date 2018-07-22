export default (post, { searchText }) => {
  return post.posts.filter(post => {
    const textMatch = post.name
      .toLowerCase()
      .includes(searchText.toLowerCase());

    return textMatch;
  });
};
