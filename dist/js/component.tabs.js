
class Tab {

  constructor(element) {
      this.tabDOM = element;
      this._init();
  }

  _tabClicked(e, _self) {
    console.log(`all the tabs is ${this.tabs}`);

    e.preventDefault();

    if(!this.classList.contains('is-active')) {
      let currentTab = null; // to be completed
      _self._switchTab(currentTab, e.currentTarget);
    }
  }


  _init() {
    this.tabs = this.tabDOM.querySelectorAll('.tab__header-item');
    var _self = this;
    for (var i = 0; i < this.tabs.length; i++) {
      this.tabs[i].addEventListener('click', function(e) {_self.tabClicked(e, this);}, false);
    }
  }

  _switchTab(oldTab, newTab) {
    newTab.focus();
    //oldTab.classList.toggle('is-active');
    newTab.classList.toggle('is-active');
  }

}

const myTab = document.querySelector('.tab');
const tabObj = new Tab(myTab);
