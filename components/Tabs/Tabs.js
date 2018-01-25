class TabItem {
  constructor(element) {
    this.element = element; // attach dom element to object. Example in Tabs class
  }

  select() {
    this.element.classList.add('Tabs__item-selected') // should use classList
  }

  deselect() {
    this.element.classList.remove('Tabs__item-selected'); // should use classList
  }
}

class TabLink {
  constructor(element, parent) {
    this.element = element; // attach dom element to object
    this.tabs = parent; // attach parent to object
    /* Ivan, "This is an example of self-documenting code".  You should do THIS more.  Instead of commenting, you just make the code super easy to read */
    this.data = this.element.dataset.tab;
    this.tabItem = this.tabs.getTab(this.data); // assign this to the associated tab using the parent's "getTab" method by passing it the correct data
    /* What is 'this'??? */
    this.tabItem = new TabItem(this.tabItem, this); // reassign this.tabItem to be a new instance of TabItem, passing it this.tabItem
    /* Remember to pass 'event' in as a parameter */
    this.element.addEventListener('click', (Event) => {
      event.stopPropagation();
      this.tabs.updateActive(this);
      this.select();
    });
  };

  select() {
    /* 'this link' refers to this.tabItem NOT this.tabs */
    this.element.classList.add("Tabs__link-selected") // select this link
    this.tabItem.select(); // select the associated tab
  }

  deselect() {
    this.element.classList.remove("Tabs__link-selected"); // deselect this link
    this.tabItem.deselect(); // deselect the associated tab
  }
}

class Tabs {
  constructor(element) {
    this.element = element; // attaches the dom node to the object as "this.element"
    this.links = element.querySelectorAll(".Tabs__link");
    this.links = Array.from(this.links).map((link) => {
      return new TabLink(link, this);
    });
    this.activeLink = this.links[0];
    this.init();
  }

  init() {
    this.activeLink = this.links[0]; // select the first link
    this.activeLink.select(); // and tab upon intialization
  }

  updateActive(newActive) {
    /* 'the old active link is this.tabItem */
    this.activeLink.deselect(); // deselect the old active link
    this.activeLink = newActive; // assign the new active link
  }

  getTab(data) {
    return this.element.querySelector(`.Tabs__item[data-tab="${data}"]`); // use the tab item classname and the data attribute to select the proper tab
  }

}

let tabs = document.querySelectorAll(".Tabs");
tabs = Array.from(tabs).map(tabs => new Tabs(tabs));