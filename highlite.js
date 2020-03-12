require("./base_commands")

highlite = {}

highlite.init = function() {
  highlite.apply_highlighting.bind(this)();
  this.on_key_post_hook.push(highlite.on_key);
}

highlite.highlight_em = function(regex, content_list, color) {
  content_list.forEach((line, i) => {
    while((match = regex.exec(line)) && match != null) {
      this.text_buffer.setAttrRegion({
        color: color
      },{
        xmin: match.index,
	ymin: i,
	ymax: i + 1
      });
      this.text_buffer.setAttrRegion({
      },{
        xmin: regex.lastIndex,
	ymin: i,
	ymax: i + 1
      });
    }
  });
}

highlite.reset_highlighting = function() {
  this.text_buffer.setAttrRegion({ defaultColor: true });
}

highlite.on_key = function() {
  highlite.apply_highlighting.bind(this)();
}

highlite.apply_highlighting = function() {
  let tokens = highlite.token_lists.javascript;
  let content = base_commands.get_text.bind(this)();
  let content_list = content.split("\n");
  highlite.reset_highlighting.bind(this)();
  highlite.highlight_em.bind(this)(tokens.specials_1, content_list, "cyan");
  highlite.highlight_em.bind(this)(tokens.strings_1, content_list, "yellow");
  highlite.highlight_em.bind(this)(tokens.strings_2, content_list, "yellow");
  highlite.highlight_em.bind(this)(tokens.specials_2, content_list, "green");
  highlite.highlight_em.bind(this)(tokens.specials_3, content_list, "violet");  highlite.highlight_em.bind(this)(tokens.regex, content_list, "red");  highlite.highlight_em.bind(this)(tokens.comments, content_list, "grey");
  highlite.highlight_em.bind(this)(tokens.inline_comments, content_list, "grey");
  

  this.draw();
}

highlite.token_lists = {
  javascript: {
    strings_1: /"(.*?)"/g,
    strings_2: /'(.*?)'/g,
    regex: /\/(.*?)\//g,
    specials_1: /\b(new|var|let|bind|if|do|while|switch|for|forEach|map|in|continue|break)(?=[^\w])/g,
    specials_2: /\b(indexOf|match|replace|toString|length|this)(?=[^\w])/g,
    specials_3: /\b(=>|function)(?=[^\w])/g,
    comments: /(\/\*.*\*\/)/g,
    inline_comments: /(\/\/.*)/g
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
