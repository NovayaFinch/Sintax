require("./base_commands");
require("./highlite");

sinful = {}

sinful.init = function() {
  sinful.normal.bind(this)();
}

sinful.normal = function() {
  base_commands.cmd_set_editable.bind(this)(false);
  base_commands.cmd_set_keymap.bind(this)(sinful.sinful_normal_map);
}

sinful.insert = function() {
  base_commands.cmd_set_editable.bind(this)(true);
  base_commands.cmd_set_keymap.bind(this)(sinful.sinful_insert_map);
}

sinful.append = function() {
  sinful.insert.bind(this)();
  base_commands.cmd_move_cursor_right.bind(this)();
}

sinful.insert_below = function() {
  sinful.append_line.bind(this)();
  base_commands.cmd_new_line.bind(this)();
  this.file_is_modified = true;
}

sinful.append_line = function() {
  this.text_buffer.moveToEndOfLine();
  sinful.insert.bind(this)();
  this.drawCursor();
}

sinful.delete_char = function() {
  this.text_buffer.delete();
  this.draw();
}

sinful.delete = function() {
  base_commands.cmd_set_keymap.bind(this)(sinful.sinful_delete_map);
}

// Needs to get expanded ASAP
sinful.move_forward_word_end = function() {
  base_commands.cmd_move_cursor_right.bind(this)();
  this.text_buffer.moveToEndOfWord();
  base_commands.cmd_move_cursor_left.bind(this)();
}

// Needs to get expanded ASAP as well
sinful.move_backward_word_start = function() {
  base_commands.cmd_move_cursor_left.bind(this)();
  this.text_buffer.moveToStartOfWord();}

// Please fix my dudey
sinful.goto_bottom = function() {
  this.text_buffer.moveTo(0, this.text_buffer.height);
  this.text_buffer.y = this.screen_buffer.height - this.text_buffer.cy;
  this.draw();
}

sinful.delete_line = function() {
  let content = this.text_buffer.getText();
  let content_list = content.split("\n");
  sinful.clipboard = "\n" + content_list[this.text_buffer.cy];

  this.text_buffer.moveTo(0, this.text_buffer.cy);
  this.text_buffer.delete(this.text_buffer.buffer[this.text_buffer.cy].length);
  this.text_buffer.backDelete(1);
  this.draw();  sinful.normal.bind(this)();
  this.file_is_modified = true;
}

sinful.paste_after = function() {
 this.text_buffer.insert(sinful.clipboard);
 this.file_is_modified = true;
}

sinful.clipboard = "penis";
sinful.sinful_normal_map = {
  h: base_commands.cmd_move_cursor_left,
  j: base_commands.cmd_move_cursor_down,
  k: base_commands.cmd_move_cursor_up,
  l: base_commands.cmd_move_cursor_right,
  i: sinful.insert,
  a: sinful.append,
  d: sinful.delete,
  o: sinful.insert_below,
  A: sinful.append_line,
  x: sinful.delete_char,
  p: sinful.paste_after,
  G: sinful.goto_bottom,
  e: sinful.move_forward_word_end,
  b: sinful.move_backward_word_start
}

sinful.sinful_insert_map = {
  BACKSPACE: base_commands.cmd_delete_last_character,
  ENTER: base_commands.cmd_new_line,
  LEFT: base_commands.cmd_move_cursor_left,
  RIGHT: base_commands.cmd_move_cursor_right,
  UP: base_commands.cmd_move_cursor_up,
  DOWN: base_commands.cmd_move_cursor_down,
  PAGE_DOWN: base_commands.cmd_scroll_down_by_one,
  ESCAPE: sinful.normal
}

sinful.sinful_delete_map = {
  ESCAPE: sinful.normal,
  d: sinful.delete_line
}

module.exports = sinful;
