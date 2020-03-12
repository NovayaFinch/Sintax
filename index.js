const tk = require("terminal-kit");
const fs = require("fs");

require("./base_commands");
require("./base_keymaps");

class Sintax {
  constructor() {
    this.term = tk.terminal;

    this.screen_buffer = new tk.ScreenBuffer({
      dst: this.term,
      height: this.term.height,
      y: 1
    });

    this.text_buffer = new tk.TextBuffer({
      dst: this.screen_buffer
    })

    this.text_buffer.setText("");
    this.file_is_modified = false;
    this.current_keymap = base_keymaps.classic_map;
    this.current_file = undefined;
    this.disable_user_interaction = false;
    this.is_editable = true;

    this.on_key_pre_hook = [];
    this.on_key_post_hook = [];
  }

  init(file) {
    this.term.on("key", this.onKey.bind(this));
    this.term.on("resize", this.onResize.bind(this));

    this.term.fullscreen(true);

    this.text_buffer.moveTo(0, 0);
    this.screen_buffer.moveTo(0, 0);

    this.term.grabInput({
      mouse: false
    });

    if(file) {
      base_commands.cmd_load_and_open_file.bind(this)(file);
    }
  }

  draw() {
    this.text_buffer.draw();
    this.screen_buffer.draw();
    this.drawCursor();
  }

  drawCursor() {
    this.text_buffer.drawCursor();
    this.screen_buffer.drawCursor();
  }

  onKey(key, matches, data) {
    if(this.on_key_pre_hook) {
      this.on_key_pre_hook.forEach(function(func) {
        func.bind(this)(key);      }.bind(this))
    }

    if(key === "CTRL_C") {
      process.exit();
    }

    if(key === "CTRL_S") {
      base_commands.save_file.bind(this)(this.current_file);
    }
    else {
      if(!this.disable_user_interaction) {
        if(key in this.current_keymap) {
          this.current_keymap[key].bind(this)();
        }
        else if (data.isCharacter && this.is_editable) {
          this.file_is_modified = true;
          this.text_buffer.insert(key);
          this.draw();
        }
      }
    }

    if(this.on_key_post_hook) {
      this.on_key_post_hook.forEach(function(func) {
        func.bind(this)(key);
      }.bind(this))
    }
  }

  onResize(width, height) {
    this.screen_buffer.resize({
      x: 0,
      y: 0,
      width: width,
      height: height
    });
    this.draw();
  }
}

module.exports = Sintax;
