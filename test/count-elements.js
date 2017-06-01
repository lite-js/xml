import each from 'lodash/each';

module.exports = (elements) => {
  let count = 0;

  function countOne(obj) {
    if (obj.type !== 'Document' && obj.type !== 'TextNode') {
      count++;
    }
    if (obj.children) {
      each(obj.children, (child) => {
        countOne(child);
      });
    }
  }

  countOne(elements);
  return count;
};
