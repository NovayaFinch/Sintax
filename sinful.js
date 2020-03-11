require("./base_commands");

sinful = {}

sinful.init = function() {
  sinful.sinful_enter_normal_mode.bind(this)();
}

sinful.sinful_enter_normal_mode = function() {
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
}

sinful.append_line = function() {
  this.text_buffer.moveToEndOfLine();
  sinful.insert.bind(this)();
  this.drawCursor();
}

sinful.sinful_normal_map = {
  h: base_commands.cmd_move_cursor_left,
  j: base_commands.cmd_move_cursor_down,
  k: base_commands.cmd_move_cursor_up,
  l: base_commands.cmd_move_cursor_right,
  i: sinful.insert,
  a: sinful.append,
  o: sinful.insert_below,
  A: sinful.append_line
}

sinful.sinful_insert_map = {
  BACKSPACE: base_commands.cmd_delete_last_character,
  ENTER: base_commands.cmd_new_line,
  LEFT: base_commands.cmd_move_cursor_left,
  RIGHT: base_commands.cmd_move_cursor_right,
  UP: base_commands.cmd_move_cursor_up,
  DOWN: base_commands.cmd_move_cursor_down,
  PAGE_DOWN: base_commands.cmd_scroll_down_by_one,
  ESCAPE: sinful.sinful_enter_normal_mode
}

module.exports = sinful;