var hehe = function(opt) {
  this.name = opt.name || "John";
}

hehe.prototype.getName = function() {
  return this.name
}
