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
- **Auto CSS Injection:** CSS is automatically loaded - no manual CSS import needed

## Installation

### NPM
```bash
npm install multi-selectbox-js
```

### CDN
```html
<script src="https://unpkg.com/multi-selectbox-js@1.0.0/dist/multi-selectbox-js.js"></script>
```

### Direct File Usage (after npm install)
If you've installed the package via npm, you can also use it directly in HTML files:
```html
<script src="node_modules/multi-selectbox-js/dist/multi-selectbox-js.js"></script>
```

## Quick Start

### Method 1: NPM Installation
```bash
npm install multi-selectbox-js
```

```html
<!DOCTYPE html>
<html>
<head>
    <!-- CSS is automatically injected by the JS file -->
    <script src="node_modules/multi-selectbox-js/dist/multi-selectbox-js.js"></script>
</head>
<body>
    <select id="countries" multiple>
        <option value="us">United States</option>
        <option value="uk">United Kingdom</option>
        <option value="ca">Canada</option>
        <option value="au">Australia</option>
    </select>

    <script>
        const multiSelect = new MultiSelectBox('countries', {
            placeholder: 'Select countries...',
            maxDisplayTags: 2
        });
    </script>
</body>
</html>
```

### Method 2: CDN Usage
```html
<!DOCTYPE html>
<html>
<head>
    <!-- CSS is automatically injected by the JS file -->
    <script src="https://unpkg.com/multi-selectbox-js@1.0.0/dist/multi-selectbox-js.js"></script>
</head>
<body>
    <select id="countries" multiple>
        <option value="us">United States</option>
        <option value="uk">United Kingdom</option>
        <option value="ca">Canada</option>
        <option value="au">Australia</option>
    </select>

    <script>
        const multiSelect = new MultiSelectBox('countries', {
            placeholder: 'Select countries...',
            maxDisplayTags: 2
        });
    </script>
</body>
</html>
```

### Method 3: Module Import
```javascript
// ES6 Modules
import MultiSelectBox from 'multi-selectbox-js';

// CommonJS
const MultiSelectBox = require('multi-selectbox-js');

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

## CSS Handling

The library automatically injects the required CSS when loaded. You don't need to manually import any CSS files.

### Automatic CSS Injection
- **NPM Package**: CSS is automatically loaded from CDN
- **CDN Usage**: CSS is automatically loaded from the same CDN
- **Direct File Usage**: CSS is automatically loaded from CDN

### Manual CSS Import (Optional)
If you prefer to import CSS manually, you can do so:

```javascript
// Import CSS manually (optional)
import 'multi-selectbox-js/dist/multi-selectbox-js.css';
```

```html
<!-- Manual CSS import (optional) -->
<link rel="stylesheet" href="node_modules/multi-selectbox-js/dist/multi-selectbox-js.css">
```

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