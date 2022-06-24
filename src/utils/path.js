export function parse(str) {
  const searchStr = str || location.search.replace(/^\?/, '');
  if (parse[searchStr]) {
    return parse[searchStr];
  }
  const qsObj = searchStr.split('&').reduce((pre, cur) => {
    const [key, value] = cur.split('=');
    pre[key] = value;
    return pre;
  }, {});
  parse[searchStr] = qsObj;
  return qsObj;
}
