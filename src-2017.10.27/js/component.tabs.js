
class Tab {

  constructor(element) {

    // check that element contains all the required element to defined a tab
    if (this._isValidTabStructure(element)) {
      this.tabbedElement = element;
      this._init(element);
    } else {
      element.innerHTML = 'BAAAAAD HTML';
    }
  }

  _isValidTabStructure(element) {
    return true;
  }

  _init(tabbed) {
    this.tablist = tabbed.querySelector('ul');
    this.tabs = this.tablist.querySelectorAll('a');
    this.panels = tabbed.querySelectorAll('[id^="section"]');

    // Add the tablist role to the first <ul> in the .tabbed container
    this.tablist.setAttribute('role', 'tablist');

    for (var i = 0; i < this.tabs.length; i++) {
      this._initTab(this.tabs[i], i);
    }

    for (i = 0; i < this.panels.length; i++) {
      this._initPanel(this.panels[i], i, this.tabs);
    }

    // Initially activate the first tab and reveal the first tab panel
    this.tabs[0].removeAttribute('tabindex');
    this.tabs[0].setAttribute('aria-selected', 'true');
    this.panels[0].hidden = false;
  }

  _initPanel(panel, i, tabs) {

    // Add tab panel semantics and hide them all
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('tabindex', '-1');
    let id = panel.getAttribute('id');
    panel.setAttribute('aria-labelledby', tabs[i].id);
    panel.hidden = true;
  }

  _initTab(tab, i) {
    tab.setAttribute('role', 'tab');
    tab.setAttribute('id', 'tab' + (i + 1));
    tab.setAttribute('tabindex', '-1');
    tab.parentNode.setAttribute('role', 'presentation');

    // Handle clicking of tabs for mouse users
    tab.addEventListener('click', e => {
      e.preventDefault();
      let currentTab = this.tablist.querySelector('[aria-selected]');
      if (e.currentTarget !== currentTab) {
        this._switchTab(currentTab, e.currentTarget);
      }
    });

    // Handle keydown events for keyboard users
    tab.addEventListener('keydown', e => {
      // Get the index of the current tab in the tabs node list
      let index = Array.prototype.indexOf.call(this.tabs, e.currentTarget);
      // Work out which key the user is pressing and
      // Calculate the new tab's index where appropriate
      let dir = e.which === 37 ? index - 1 : e.which === 39 ? index + 1 : e.which === 40 ? 'down' : null;
      if (dir !== null) {
        e.preventDefault();
        // If the down key is pressed, move focus to the open panel,
        // otherwise switch to the adjacent tab
        dir === 'down' ? this.panels[i].focus() : this.tabs[dir] ? this._switchTab(e.currentTarget, this.tabs[dir]) : void 0;
      }
    });
  }

  _switchTab(oldTab, newTab) {
    newTab.focus();
    // Make the active tab focusable by the user (Tab key)
    newTab.removeAttribute('tabindex');
    // Set the selected state
    newTab.setAttribute('aria-selected', 'true');
    oldTab.removeAttribute('aria-selected');
    oldTab.setAttribute('tabindex', '-1');

    // Get the indices of the new and old tabs to find the correct
    // tab panels to show and hide
    let index = Array.prototype.indexOf.call(this.tabs, newTab);
    let oldIndex = Array.prototype.indexOf.call(this.tabs, oldTab);
    this.panels[oldIndex].hidden = true;
    this.panels[index].hidden = false;
  }

  addTab(headerId = 'defaultHeaderID', headerTitle = 'default title', contentHeader = 'default content title', content = 'de fault content') {

    // create the tab header
    console.log('headerTitle = ' + headerTitle);
    const newTabLink = document.createElement('a');
    newTabLink.setAttribute('role', 'tab');
    newTabLink.setAttribute('id', 'tab' + (this.tabs.length + 1));
    newTabLink.setAttribute('tabindex', '-1');
    newTabLink.innerHTML = headerTitle;
    const newTab = document.createElement('li');
    newTab.setAttribute('role', 'presentation');
    newTab.appendChild(newTabLink);
    this.tablist.appendChild(newTab);

    // create the tab panel
    const newPanelHeader = document.createElement('h2');
    newPanelHeader.innerHTML = contentHeader;
    const newContent = document.createElement('p');
    newContent.innerHTML = content;
    const newPanel = document.createElement('section');
    newPanel.appendChild(newPanelHeader);
    newPanel.appendChild(newContent);

    this.tabbedElement.appendChild(newPanel);
  }
}

const tabs = document.querySelectorAll('.tabbed');
const tabObj1 = new Tab(tabs[0]);
const tabObj2 = new Tab(tabs[1]);
tabObj1.addTab(null, 'mouhahaha');

//const myTab =
/*
(function() {
    // Get relevant elements and collections
    const tabbed = document.querySelector('.tabbed');
    const tablist = tabbed.querySelector('ul');
    const tabs = tablist.querySelectorAll('a');
    const panels = tabbed.querySelectorAll('[id^="section"]');

    // The tab switching function
    const switchTab = (oldTab, newTab) => {
      newTab.focus();
      // Make the active tab focusable by the user (Tab key)
      newTab.removeAttribute('tabindex');
      // Set the selected state
      newTab.setAttribute('aria-selected', 'true');
      oldTab.removeAttribute('aria-selected');
      oldTab.setAttribute('tabindex', '-1');
      // Get the indices of the new and old tabs to find the correct
      // tab panels to show and hide
      let index = Array.prototype.indexOf.call(tabs, newTab);
      let oldIndex = Array.prototype.indexOf.call(tabs, oldTab);
      panels[oldIndex].hidden = true;
      panels[index].hidden = false;
    }

    // Add the tablist role to the first <ul> in the .tabbed container
    tablist.setAttribute('role', 'tablist');

    // Add semantics are remove user focusability for each tab
    Array.prototype.forEach.call(tabs, (tab, i) => {
      tab.setAttribute('role', 'tab');
      tab.setAttribute('id', 'tab' + (i + 1));
      tab.setAttribute('tabindex', '-1');
      tab.parentNode.setAttribute('role', 'presentation');

      // Handle clicking of tabs for mouse users
      tab.addEventListener('click', e => {
        e.preventDefault();
        let currentTab = tablist.querySelector('[aria-selected]');
        if (e.currentTarget !== currentTab) {
          switchTab(currentTab, e.currentTarget);
        }
      });

      // Handle keydown events for keyboard users
      tab.addEventListener('keydown', e => {
        // Get the index of the current tab in the tabs node list
        let index = Array.prototype.indexOf.call(tabs, e.currentTarget);
        // Work out which key the user is pressing and
        // Calculate the new tab's index where appropriate
        let dir = e.which === 37 ? index - 1 : e.which === 39 ? index + 1 : e.which === 40 ? 'down' : null;
        if (dir !== null) {
          e.preventDefault();
          // If the down key is pressed, move focus to the open panel,
          // otherwise switch to the adjacent tab
          dir === 'down' ? panels[i].focus() : tabs[dir] ? switchTab(e.currentTarget, tabs[dir]) : void 0;
        }
      });
    });

    // Add tab panel semantics and hide them all
    Array.prototype.forEach.call(panels, (panel, i) => {
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('tabindex', '-1');
      let id = panel.getAttribute('id');
      panel.setAttribute('aria-labelledby', tabs[i].id);
      panel.hidden = true;
    });

    // Initially activate the first tab and reveal the first tab panel
    tabs[0].removeAttribute('tabindex');
    tabs[0].setAttribute('aria-selected', 'true');
    panels[0].hidden = false;
  })();

*/
