// Author: Sanju
// Multi-SelectBox JS - A lightweight multi-select dropdown library

class MultiSelectBox {
  constructor(selectElOrId, config) {
      // Private variables
      this.selectElement = null;
      this.optionsData = [];
      this.container = null;
      this.onChange = (config && config.onChange) || function() {};
      this.required = (config && config.required) || false;
      this.maxSelection = (config && typeof config.maxSelection === 'number') ? config.maxSelection : Infinity;
      this.maxDisplayTags = (config && typeof config.maxDisplayTags === 'number') ? config.maxDisplayTags : Infinity;
      this.placeholder = (config && config.placeholder) || 'Search';
      this.selectedTags = [];
      this.filteredOptions = [];
      this.highlightedIndex = -1;
      this.selectedTagsContainer = null;
      this.tagInput = null;
      this.dropdown = null;
      this.selectedTagsDropdown = null;

      this.init(selectElOrId);
  }

  init(selectElOrId) {
      // Resolve the select element from a string id.
      this.selectElement = document.getElementById(selectElOrId);
      if (!this.selectElement) {
          throw new Error("Select element not found.");
      }
      if (this.selectElement.tagName !== 'SELECT') {
          throw new Error("Element is not a select element.");
      }

      // Hide the original select element.
      this.selectElement.style.display = 'none';

      // Read options from the select element.
      for (var i = 0; i < this.selectElement.options.length; i++) {
          var option = this.selectElement.options[i];
          this.optionsData.push({
              id: option.value,
              label: option.text,
              preselected: option.selected
          });
      }

      // Create a container for the widget and insert it after the select.
      this.container = document.createElement('div');
      this.container.className = 'multi-selectbox-js';
      this.selectElement.parentNode.insertBefore(this.container, this.selectElement.nextSibling);

      // Preselect any options marked as selected.
      for (var j = 0; j < this.optionsData.length; j++) {
          if (this.optionsData[j].preselected) {
              this.selectedTags.push({ id: this.optionsData[j].id, label: this.optionsData[j].label });
          }
      }
      this.filteredOptions = this.optionsData.slice();

      this.buildHTML();
      this.bindEvents();
      this.renderSelectedTags();
      this.syncToSelect();
  }

  buildHTML() {
      this.container.innerHTML = `
          <div class="wrapper">
              <div id="selected-tags" class="tag-container">
                  <input type="text" id="tag-input" placeholder="${this.placeholder}" class="tag-input" autocomplete="off">
              </div>
              <ul id="dropdown" class="dropdown hidden"></ul>
              <ul id="selected-tags-dropdown" class="selected-tags-dropdown hidden"></ul>
          </div>`;
      this.selectedTagsContainer = this.container.querySelector('#selected-tags');
      this.tagInput = this.container.querySelector('#tag-input');
      this.dropdown = this.container.querySelector('#dropdown');
      this.selectedTagsDropdown = this.container.querySelector('#selected-tags-dropdown');
  }

  bindEvents() {
      this.tagInput.addEventListener('input', (e) => {
          var searchTerm = e.target.value.toLowerCase();
          this.filteredOptions = this.optionsData.filter(function(opt) {
              return opt.label.toLowerCase().includes(searchTerm);
          });
          this.highlightedIndex = -1;
          this.renderDropdown();
      });

      this.tagInput.addEventListener('keydown', (e) => {
          var visibleOptions = this.dropdown.querySelectorAll('li');
          if (e.key === 'Backspace' && this.tagInput.value === '') {
              if (this.selectedTags.length > 0) {
                  this.selectedTags.pop();
                  this.renderSelectedTags();
                  this.renderDropdown();
                  this.syncToSelect();
                  this.onChange(this.selectedTags);
                  e.preventDefault();
                  return;
              }
          }
          if (e.key === 'ArrowDown') {
              e.preventDefault();
              if (visibleOptions.length === 0) return;
              this.highlightedIndex = (this.highlightedIndex + 1) % visibleOptions.length;
              this.renderDropdown();
          } else if (e.key === 'ArrowUp') {
              e.preventDefault();
              if (visibleOptions.length === 0) return;
              this.highlightedIndex = (this.highlightedIndex - 1 + visibleOptions.length) % visibleOptions.length;
              this.renderDropdown();
          } else if (e.key === 'Enter') {
              e.preventDefault();
              if (this.highlightedIndex > -1 && visibleOptions[this.highlightedIndex]) {
                  var selectedLabel = visibleOptions[this.highlightedIndex].textContent;
                  var option = this.optionsData.find(function(opt) {
                      return opt.label === selectedLabel;
                  });
                  if (option) {
                      this.selectTag(option);
                  }
              }
          }
      });

      document.addEventListener('click', (e) => {
          if (!this.container.contains(e.target)) {
              this.highlightedIndex = -1;
              this.dropdown.classList.add('hidden');
              this.selectedTagsDropdown.classList.add('hidden');
          }
      });

      this.tagInput.addEventListener('focus', () => {
          this.renderDropdown();
      });
  }

  renderDropdown() {
      this.dropdown.innerHTML = '';
      var visibleOptions = this.filteredOptions.filter((opt) => {
          return !this.selectedTags.find((tag) => {
              return tag.id === opt.id;
          });
      });
      if (visibleOptions.length === 0) {
          this.dropdown.classList.add('hidden');
          return;
      }
      visibleOptions.forEach((option, index) => {
          var li = document.createElement('li');
          li.textContent = option.label;
          li.className = 'li';
          if (index === this.highlightedIndex) {
              li.classList.add('li-arrow');
          }
          li.addEventListener('click', () => {
              this.selectTag(option);
          });
          this.dropdown.appendChild(li);
      });
      this.dropdown.classList.remove('hidden');
      if (this.highlightedIndex > -1) {
          var highlightedItem = this.dropdown.children[this.highlightedIndex];
          if (highlightedItem) {
              highlightedItem.scrollIntoView({ block: 'nearest' });
          }
      }
  }

  renderSelectedTags() {
      var tagItems = this.selectedTagsContainer.querySelectorAll('.tag-item');
      for (var k = 0; k < tagItems.length; k++) {
          tagItems[k].remove();
      }

      // Remove any existing "more" indicator
      var moreIndicator = this.selectedTagsContainer.querySelector('.more-indicator');
      if (moreIndicator) {
          moreIndicator.remove();
      }

      var tagsToDisplay = this.selectedTags.slice(0, this.maxDisplayTags);
      var remainingCount = this.selectedTags.length - this.maxDisplayTags;

      tagsToDisplay.forEach((tag) => {
          var span = document.createElement('span');
          span.className = 'tag-item';
          span.textContent = tag.label;
          var closeBtn = document.createElement('span');
          closeBtn.className = 'cross';
          closeBtn.innerHTML = '&times;';
          closeBtn.addEventListener('click', () => {
              this.deselectTag(tag);
          });
          span.appendChild(closeBtn);
          this.selectedTagsContainer.insertBefore(span, this.tagInput);
      });

      // Add "+ X more" indicator if there are more tags than maxDisplayTags
      if (remainingCount > 0) {
          var moreSpan = document.createElement('span');
          moreSpan.className = 'more-indicator';
          moreSpan.textContent = '+ ' + remainingCount + ' more';
          moreSpan.style.cursor = 'pointer';
          moreSpan.addEventListener('click', (e) => {
              e.stopPropagation();
              this.showSelectedTagsDropdown();
          });
          this.selectedTagsContainer.insertBefore(moreSpan, this.tagInput);
      }
  }

  showSelectedTagsDropdown() {
      this.selectedTagsDropdown.innerHTML = '';

      if (this.selectedTags.length === 0) {
          this.selectedTagsDropdown.classList.add('hidden');
          return;
      }

      this.selectedTags.forEach((tag) => {
          var li = document.createElement('li');
          li.className = 'selected-tag-item';

          var tagLabel = document.createElement('span');
          tagLabel.className = 'selected-tag-label';
          tagLabel.textContent = tag.label;

          var removeBtn = document.createElement('span');
          removeBtn.className = 'selected-tag-remove';
          removeBtn.innerHTML = '&times;';
          removeBtn.addEventListener('click', (e) => {
              e.stopPropagation();
              this.deselectTag(tag);
              this.selectedTagsDropdown.classList.add('hidden');
          });

          li.appendChild(tagLabel);
          li.appendChild(removeBtn);
          this.selectedTagsDropdown.appendChild(li);
      });

      this.selectedTagsDropdown.classList.remove('hidden');
  }

  selectTag(option) {
      if (this.selectedTags.length >= this.maxSelection) return;
      if (!this.selectedTags.find((tag) => { return tag.id === option.id; })) {
          this.selectedTags.push({ id: option.id, label: option.label });
      }
      this.tagInput.value = '';
      this.filteredOptions = this.optionsData.filter((opt) => {
          return opt.label.toLowerCase().includes(this.tagInput.value.toLowerCase());
      });
      this.highlightedIndex = -1;
      this.renderSelectedTags();
      this.renderDropdown();
      this.syncToSelect();
      this.onChange(this.selectedTags);
  }

  deselectTag(tag) {
      this.selectedTags = this.selectedTags.filter((t) => {
          return t.id !== tag.id;
      });
      this.renderSelectedTags();
      this.renderDropdown();
      this.syncToSelect();
      this.onChange(this.selectedTags);

      // Hide selected tags dropdown if no more tags
      if (this.selectedTags.length === 0) {
          this.selectedTagsDropdown.classList.add('hidden');
      }
  }

  syncToSelect() {
      for (var i = 0; i < this.selectElement.options.length; i++) {
          var optionElem = this.selectElement.options[i];
          var found = this.selectedTags.find((tag) => {
              return tag.id === optionElem.value;
          });
          optionElem.selected = !!found;
      }
      if (this.required) {
          this.tagInput.required = this.selectedTags.length ? false : true;
      } else {
          this.tagInput.required = false;
      }
  }

  // Public API methods
  selectAll() {
      for (var i = 0; i < this.optionsData.length; i++) {
          if (this.selectedTags.length >= this.maxSelection) break;
          var opt = this.optionsData[i];
          if (!this.selectedTags.find((tag) => { return tag.id === opt.id; })) {
              this.selectedTags.push({ id: opt.id, label: opt.label });
          }
      }
      this.tagInput.value = '';
      this.filteredOptions = this.optionsData.slice();
      this.highlightedIndex = -1;
      this.renderSelectedTags();
      this.renderDropdown();
      this.syncToSelect();
      this.onChange(this.selectedTags);
  }

  clearAll() {
      this.selectedTags = [];
      this.renderSelectedTags();
      this.renderDropdown();
      this.syncToSelect();
      this.onChange(this.selectedTags);
  }

  getSelectedTags() {
      return this.selectedTags;
  }
}

// Auto-inject CSS if not already present
(function() {
  if (!document.querySelector('#multi-selectbox-js-styles')) {
      var link = document.createElement('link');
      link.id = 'multi-selectbox-js-styles';
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/multi-selectbox-js@1.0.0/dist/multi-selectbox-js.css';
      document.head.appendChild(link);
  }
})();

// Export for different module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MultiSelectBox;
} else if (typeof define === 'function' && define.amd) {
  define(function() { return MultiSelectBox; });
} else {
  window.MultiSelectBox = MultiSelectBox;
} 