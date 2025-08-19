# Multi-SelectBox JS

A lightweight, vanilla JavaScript library for creating interactive multi-select dropdowns with tag-based UI.

**[🎮 View Live Demo](https://sanju9645.github.io/multi-selectbox-js/index.html)**

## Credits

This library is inspired by and built upon the excellent work of [Habib Mhamadi's multi-select-tag](https://github.com/habibmhamadi/multi-select-tag) repository. We've enhanced the original implementation with additional features and customizations:

### Original Features (from multi-select-tag):
- Multi-select functionality with search and filter
- Tag-based UI with remove functionality
- Keyboard navigation support
- Automatic synchronization with hidden select elements

### Additional Features & Enhancements:
- **Color Customization**: Full control over colors for all UI elements
- **Tag Display Management**: Interactive "+ X more" indicator with dropdown
- **Class-based Architecture**: Refactored to modern JavaScript class structure
- **Auto CSS Injection**: No manual CSS imports required
- **NPM Package**: Published as a reusable npm package
- **Enhanced Documentation**: Comprehensive examples and API documentation
- **Instance-Specific Styling**: Each dropdown can have unique color schemes

Thank you to [Habib Mhamadi](https://github.com/habibmhamadi) for the original inspiration and foundation!


## Features

- **Search & Filter:** Filter options dynamically as you type
- **Keyboard Navigation:** Use arrow keys to navigate and Enter to select
- **Tag Display Control:** Limit visible tags with interactive "+ X more" indicator
- **Automatic Sync:** All changes sync with the hidden `<select>` element
- **Public API:** Helper methods `selectAll()`, `clearAll()`, and `getSelectedTags()`
- **Multiple Instances:** Each instance is independent and encapsulated with unique IDs
- **No Dependencies:** Pure vanilla JavaScript with no external dependencies
- **Auto CSS Injection:** CSS is automatically loaded - no manual CSS import needed
- **Form-Ready:** Multiple select boxes can be used in a single form without conflicts

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

## Multiple Instances in Forms

You can use multiple MultiSelectBox instances in a single form without any conflicts. Each instance gets unique IDs automatically:

```html
<form>
    <select id="countries" multiple>
        <option value="us">United States</option>
        <option value="uk">United Kingdom</option>
        <option value="ca">Canada</option>
    </select>
    
    <select id="languages" multiple>
        <option value="js">JavaScript</option>
        <option value="py">Python</option>
        <option value="java">Java</option>
    </select>
    
    <select id="colors" multiple>
        <option value="red">Red</option>
        <option value="blue">Blue</option>
        <option value="green">Green</option>
    </select>
</form>

<script>
    // Each instance works independently with unique IDs
    const countriesSelect = new MultiSelectBox('countries', {
        maxSelection: 3,
        placeholder: 'Select countries...'
    });
    
    const languagesSelect = new MultiSelectBox('languages', {
        maxDisplayTags: 1,
        placeholder: 'Select languages...'
    });
    
    const colorsSelect = new MultiSelectBox('colors', {
        colors: {
            tagBackground: '#ff6b6b',
            tagText: '#ffffff'
        },
        placeholder: 'Select colors...'
    });
</script>
```

### Key Benefits:
- **No ID Conflicts:** Each instance gets unique internal IDs
- **Independent Functionality:** Each dropdown works completely independently
- **Individual Styling:** Each instance can have its own color scheme
- **Form Submission:** All selected values are properly synced to the original `<select>` elements

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

## Color Customization

You can customize the colors of various elements using the `colors` configuration option:

```javascript
const multiSelect = new MultiSelectBox('mySelect', {
    colors: {
        // Container colors
        containerBorder: '#e5e7eb',
        containerBackground: '#ffffff',
        
        // Tag colors
        tagBackground: '#DBEAFE',
        tagText: '#1E40AF',
        tagBorder: '#3B82F6',
        
        // Dropdown colors
        dropdownBorder: '#e5e7eb',
        dropdownBackground: '#ffffff',
        dropdownItemBackground: '#E5E7EB',
        dropdownItemText: '#374151',
        
        // More indicator colors
        moreIndicatorBackground: '#F3F4F6',
        moreIndicatorText: '#6B7280',
        
        // Selected tag dropdown colors
        selectedTagDropdownBackground: '#ffffff',
        selectedTagDropdownText: '#1E40AF',
        selectedTagDropdownHover: '#f9fafb'
    }
});
```

### Available Color Options

| Color Option | Description | Default |
|--------------|-------------|---------|
| `containerBorder` | Border color of the main container | `#e5e7eb` |
| `containerBackground` | Background color of the main container | `#ffffff` |
| `tagBackground` | Background color of selected tags | `#DBEAFE` |
| `tagText` | Text color of selected tags | `#1E40AF` |
| `tagBorder` | Border color of selected tags | `#3B82F6` |
| `dropdownBorder` | Border color of the dropdown | `#e5e7eb` |
| `dropdownBackground` | Background color of the dropdown | `#ffffff` |
| `dropdownItemBackground` | Background color of dropdown items on hover | `#E5E7EB` |
| `dropdownItemText` | Text color of dropdown items | `#374151` |
| `moreIndicatorBackground` | Background color of "+ X more" indicator | `#F3F4F6` |
| `moreIndicatorText` | Text color of "+ X more" indicator | `#6B7280` |
| `selectedTagDropdownBackground` | Background color of selected tags dropdown | `#ffffff` |
| `selectedTagDropdownText` | Text color of selected tags in dropdown | `#1E40AF` |
| `selectedTagDropdownHover` | Background color of selected tags on hover in dropdown | `#f9fafb` |

### Color Customization Examples

**Dark Theme:**
```javascript
const multiSelect = new MultiSelectBox('mySelect', {
    colors: {
        containerBorder: '#374151',
        containerBackground: '#1F2937',
        tagBackground: '#3B82F6',
        tagText: '#ffffff',
        dropdownBackground: '#1F2937',
        dropdownItemBackground: '#374151',
        dropdownItemText: '#ffffff'
    }
});
```

**Custom Brand Colors:**
```javascript
const multiSelect = new MultiSelectBox('mySelect', {
    colors: {
        tagBackground: '#FF6B6B',
        tagText: '#ffffff',
        moreIndicatorBackground: '#4ECDC4',
        moreIndicatorText: '#ffffff'
    }
});
```

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