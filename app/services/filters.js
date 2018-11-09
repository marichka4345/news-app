class Filters {
  constructor(){
    if (!Filters.instance){
      this.data = [];
      Filters.instance = this;
    }

    return Filters.instance;
  }

  get filters () {
    return this.data;
  }

  add(item){
    this.data.push(item);
  }

  getFilterById(id){
    return this.data.find(d => d.id === id);
  }
}

const instance = new Filters();
Object.freeze(instance);

export { instance };