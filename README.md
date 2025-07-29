# Multi-SelectBox JS

A lightweight, vanilla JavaScript library for creating interactive multi-select dropdowns with tag-based UI.

## Features

- **Search & Filter:** Filter options dynamically as you type
- **Keyboard Navigation:** Use arrow keys to navigate and Enter to select
- **Tag Display Control:** Limit visible tags with interactive "+ X more" indicator
- **Automatic Sync:** All changes sync with the hidden `<select>` element
- **Public API:** Helper methods `selectAll()`, `clearAll()`, and `getSelectedTags()`
- **Multiple Instances:** Each instance is independent and encapsulated
- **No Dependencies:** Pure vanilla JavaScript with no external dependencies

## Installation

### NPM
```bash
npm install multi-selectbox-js
```

### CDN
```html
<script src="https://unpkg.com/multi-selectbox-js@1.0.0/dist/multi-selectbox-js.js"></script>
```

## Quick Start

### 1. Create HTML
```html
<select id="countries" multiple>
    <option value="us">United States</option>
    <option value="uk">United Kingdom</option>
    <option value="ca">Canada</option>
    <option value="au">Australia</option>
</select>
```

### 2. Initialize
```javascript
const multiSelect = new MultiSelectBox('countries', {
    placeholder: 'Select countries...',
    maxDisplayTags: 2
});
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `placeholder` | string | 'Search' | Placeholder text for the input field |
| `maxSelection` | number | Infinity | Maximum number of items that can be selected |
| `maxDisplayTags` | number | Infinity | Maximum number of visible tags (shows "+ X more" for overflow) |
| `required` | boolean | false | Whether the field is required |
| `onChange` | function | null | Callback function when selection changes |

## Examples

### Basic Usage
```javascript
const multiSelect = new MultiSelectBox('mySelect', {
    placeholder: 'Choose options...'
});
```

### With Display Limit
```javascript
const multiSelect = new MultiSelectBox('mySelect', {
    maxDisplayTags: 1,  // Show only 1 tag + "+ X more"
    placeholder: 'Select items...'
});
```

### With Selection Limit
```javascript
const multiSelect = new MultiSelectBox('mySelect', {
    maxSelection: 5,    // Allow only 5 selections
    maxDisplayTags: 3,  // Show 3 tags + "+ X more"
    onChange: (tags) => console.log('Selected:', tags)
});
```

## Public API

### Methods

#### `selectAll()`
Selects all available options (respects `maxSelection` limit).

```javascript
multiSelect.selectAll();
```

#### `clearAll()`
Clears all selections.

```javascript
multiSelect.clearAll();
```

#### `getSelectedTags()`
Returns an array of currently selected tags.

```javascript
const selected = multiSelect.getSelectedTags();
console.log(selected); // [{id: 'us', label: 'United States'}, ...]
```

## Interactive Features

### Tag Display Management
- **Clickable "+ X more" indicator:** Click to view all selected tags
- **Individual tag removal:** Click the × button next to any tag to remove it
- **Automatic dropdown hiding:** The dropdown closes when all tags are removed
- **Consistent styling:** Follows the same design patterns as the main dropdown

### Keyboard Navigation
- **Arrow Up/Down:** Navigate through dropdown options
- **Enter:** Select highlighted option
- **Backspace:** Remove last selected tag (when input is empty)

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Changelog

### v1.0.0
- Initial release
- Multi-select functionality with search
- Tag display management with "+ X more" indicator
- Keyboard navigation support
- Public API methods 