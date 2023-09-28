function sort({list, desc = -1}) {
  return list.sort((a, b)=> {
      return (a.score - b.score) * desc;
  });
}