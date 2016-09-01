module.exports = function (s) {
  return String(s).replace(/[&<>]/g, function (m) {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
    }[m];
  });
};
