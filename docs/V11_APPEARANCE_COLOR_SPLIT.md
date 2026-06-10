# V11 Appearance / Color Split

## Change
The previous UI mixed visual mode and palette into one selector. That was wrong: `Graphite`, `Midnight`, `Rose`, and `Ocean` were treated as if they were the same type of setting.

V11 separates them:

- **Appearance**: System, Light, Dark
- **Accent color**: Teal, Forest, Ocean, Sunset, Lavender, Rose, Sand, Graphite, Midnight, High contrast

The two settings are independent. Example combinations now work:

- Light + Ocean
- Dark + Ocean
- Light + Rose
- Dark + Rose
- System + High contrast

## Storage
Saved in browser localStorage:

- `dw_appearance`
- `dw_color`

Legacy `dw_theme` is migrated automatically where possible.

## Export/import
Progress backup now includes:

- `appearance`
- `color`

The legacy `theme` key is kept only for backward compatibility.
