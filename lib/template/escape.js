module.exports = function (s) {
  return String(s).replace(/[<>]/g, function (m) {
    return {
      "<": "&lt;",
      ">": "&gt;",
    }[m];
  });
};
