base_keymaps = {}

base_keymaps.classic_map = {
  BACKSPACE: base_commands.cmd_delete_last_character,
  ENTER: base_commands.cmd_new_line,
  LEFT: base_commands.cmd_move_cursor_left,
  RIGHT: base_commands.cmd_move_cursor_right,
  UP: base_commands.cmd_move_cursor_up,
  DOWN: base_commands.cmd_move_cursor_down,
  PAGE_DOWN: base_commands.cmd_scroll_down_by_one
}

module.exports = base_keymaps;