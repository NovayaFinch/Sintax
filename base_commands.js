const fs = require("fs");

base_commands = {}

base_commands.cmd_delete_last_character = function() {
  this.text_buffer.backDelete(1);
  this.file_is_modified = true;
  this.draw();
}

base_commands.cmd_new_line = function() {
  this.file_is_modified = true;
  this.text_buffer.newLine();
  this.draw();

  if(this.screen_buffer.height - this.text_buffer.y - 1 < this.text_buffer.cy) {
    base_commands.cmd_scroll_down_by_one.bind(this)();
  }
}

base_commands.cmd_scroll_up_by_one = function() {
  this.text_buffer.y++;
  this.draw();
}

base_commands.cmd_scroll_down_by_one = function() {
  this.text_buffer.y--;
  this.draw();
}

base_commands.cmd_move_cursor_left = function() {
  this.text_buffer.moveBackward();
  this.drawCursor();
}

base_commands.cmd_move_cursor_right = function() {
  this.text_buffer.moveForward();
  this.drawCursor();
}

base_commands.cmd_move_cursor_up = function() {
  this.text_buffer.moveUp();
  if(this.text_buffer.cx > this.text_buffer.buffer[this.text_buffer.cy].length - 1) {
    this.text_buffer.moveToEndOfLine();
  }

  this.drawCursor();

  if(this.screen_buffer.y - this.text_buffer.y - 1 > this.text_buffer.cy) {
    base_commands.cmd_scroll_up_by_one.bind(this)();
  }
}

base_commands.cmd_move_cursor_down = function() {
  if(this.text_buffer.getContentSize().height - 1 > this.text_buffer.cy) {
    this.text_buffer.moveDown();

    if(this.text_buffer.cx > this.text_buffer.buffer[this.text_buffer.cy].length - 1) {
      this.text_buffer.moveToEndOfLine();
    }
    this.drawCursor();
  }

  if(this.screen_buffer.height - this.text_buffer.y - 1 < this.text_buffer.cy) {
    base_commands.cmd_scroll_down_by_one.bind(this)();
  }
}

base_commands.cmd_set_keymap = function(keymap) {
  this.current_keymap = keymap;
}

base_commands.cmd_set_editable = function(param) {
  this.is_editable = param;
}

base_commands.cmd_load_and_open_file = function(file) {
  let content = "";
  try {
    if(fs.existsSync(file)) {
      content = fs.readFileSync(file, "utf8");
    }
  }
  catch (e) {}

  this.text_buffer.moveTo(0, 0);
  this.text_buffer.setText("");
  this.text_buffer.insert(content);
  this.text_buffer.moveTo(0, 0);
  this.file_is_modified = false;
  this.current_file = file;
  this.draw();
}

base_commands.get_text = function() {
  return this.text_buffer.getText();
}

base_commands.save = function(file) {
  this.disable_user_interaction = true;
  try {
    fs.writeFileSync(file, base_commands.get_text.bind(this)());
    this.file_is_modified = false;
    this.current_file = file;
    this.disable_user_interaction = false;
  }
  catch (e) {
    console.log(e)
    this.disable_user_interaction = false;
  }
}

base_commands.save_file = function() {
  if(!this.file_is_modified) {
    return;
  }
  if(base_commands.get_text.bind(this)() == "") {
    return;
  }
  if(this.current_file) {
    base_commands.save.bind(this)(this.current_file);
  }
}

module.exports = base_commands;