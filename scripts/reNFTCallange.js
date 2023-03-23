function ArrayChallenge(strArr) {
    const cache = {};
    const order = [];
  
    for (let i = 0; i < strArr.length; i++) {
      const element = strArr[i];
  
      if (cache[element]) {
        order.splice(order.indexOf(element), 1);
      } else {
        if (Object.keys(cache).length === 5) {
          const lru = order.pop();
          delete cache[lru];
        }
        cache[element] = true;
      }
  
      order.unshift(element);
    }
  
  // Filter the order array to only contain elements that are still in the cache,
  // reverse the order, and join the elements with hyphens to form the result string
    return order.filter((element) => cache[element]).reverse().join("-");
  }
  

console.log(ArrayChallenge(["A", "B", "A", "C", "A", "B"])); // "C-A-B"
console.log(ArrayChallenge(["A", "B", "C", "D", "E", "D", "Q", "Z", "C"])); // "E-D-Q-Z-C"
