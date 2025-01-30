class App {
  constructor(presentContainer, titleContainer) {
    this.presentContainer = presentContainer;
    this.titleContainer = titleContainer;
    
    this._onPresentOpened = this._onPresentOpened.bind(this);
    
    this.presents = [];
    this._fillPresentContainer();
    this.openedCount = 0;
  } 
  
  _fillPresentContainer() {
    for (const source of PRESENT_SOURCES) {
      const present = new Present(this.presentContainer, source, this._onPresentOpened);
      this.presents.push(present);
    }
  }
  
  _onPresentOpened() {
    this.openedCount++;
    if (this.openedCount === this.presents.length) {
      this.titleContainer[0].innerText = 'Enjoy your presents!';
    }
  } 
}


