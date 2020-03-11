require("./base_commands");

highlite = {}

highlite.init = function() {
  highlite.apply_highlighting.bind(this)();
}

highlite.apply_highlighting = function() {
  let tokens = highlite.token_lists.javascript;
  let content = base_commands.get_text.bind(this)();

  let parsed = content.replace(tokens.specials_1, "^G$&^:");
  parsed = parsed.replace(tokens.specials_2, "^c$&^:");
  parsed = parsed.replace(tokens.strings_1, "^Y$&^:");
  parsed = parsed.replace(tokens.strings_2, "^Y$&^:");
  parsed = parsed.replace(tokens.comments, "^K$&^:");
  parsed = parsed.replace(tokens.inline_comments, "^K$&^:");

  this.text_buffer.setText(parsed, true);
  this.draw();
}

highlite.token_lists = {
  javascript: {
    strings_1: /"(.*?)"/g,
    strings_2: /'(.*?)'/g,
    specials_1: /\b(new|var|if|do|function|while|switch|for|foreach|in|continue|break)(?=[^\w])/g,
    specials_2: /\b(indexOf|match|replace|toString|length|this)(?=[^\w])/g,
    comments: /(\/\*.*\*\/)/g,
    inline_comments: /(\/\/.*)/g,
  }
}

highlite.classic_scheme = {
  javascript: {
    strings_1: "yellow",
    strings_2: "yellow",
    specials: "blue",
    comments: "grey",
    inline_comments: "grey"
  }
}

module.exports = highlite;
