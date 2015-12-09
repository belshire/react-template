class SectionIconsStore {
  constructor() {
    this.bindActions(this.alt.getActions('section-icons'));
    this.icons = {};
  }

  onFetchSuccess(data) {
    let icons = [];

    data.forEach((section) => {
      icons = icons.concat(section.menuItems);
    });

    this.icons = icons;
  }
}

export default SectionIconsStore;
