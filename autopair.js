require("./base_commands");
autopair = {}

autopair.init = function() {
  this.on_key_post_hook.push(autopair.on_key);
}

autopair.on_key = function(key) {
  if(key == "(") {  }

  autopair.pairs.forEach(function(pair) {
    if(key == pair[0]) {
      this.text_buffer.insert(pair[1]);
      base_commands.cmd_move_cursor_left.bind(this)();
    }
  }.bind(this));

  // Make it draw more seldom
  this.draw();
}

autopair.pairs = [
  ["(", ")"],
  ["[", "]"],
  ["{", "}"]
]

module.exports = autopair;
