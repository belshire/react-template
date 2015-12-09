class DepartmentsStore {
  constructor() {
    this.bindActions(this.alt.getActions('departments'));
    this.departments = [];
  }

  onFetchSuccess(departments) {
    this.departments = departments;
  }
}

export default DepartmentsStore;
