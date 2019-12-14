function resolveStyle(style) {
  return Object.keys(style)
    .map(key => `${key}:${style[key]};`)
    .join('');
}

function flattenArray(arr) {
  let result = [];
  arr.forEach(item => {
    if (Array.isArray(item)) {
      result = result.concat(flattenArray(item));
    } else {
      result.push(item);
    }
  });
  return result;
}

export { resolveStyle, flattenArray };
