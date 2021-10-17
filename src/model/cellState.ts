export class CellState {
  readonly possibleTurns: number;
  readonly properSolution: number;
  readonly index: number;

  constructor(index: number, {turns = 63, proper = 0}) {
    this.possibleTurns = turns;
    this.properSolution = proper;
    this.index = index;
  }

  public toJSON() {
    const {properSolution, ...otherProps} = this;
    return otherProps;
  }

  isSolved(): boolean {
    return (this.possibleTurns & (this.possibleTurns-1)) === 0;
  }

  hasPossibleItem(item: number) {
    return (this.possibleTurns & Math.pow(2, item)) !== 0;
  }

  isResolvedTo(item: number): boolean {
    return this.isSolved() && this.getCurrentSolution() === item;
  }

  isProperlySolved(): boolean {
    return this.getCurrentSolution() === this.properSolution;
  } 

  getCurrentSolution(): number {
    if (this.isSolved()) {
      for (let i=0; i<6; i++) {
        if ((this.possibleTurns & Math.pow(2, i)) !== 0) {
          return i;
        }
      }
    }
    console.log('ERR: Cell is not resolved!');
  }

  removePossibleTurn(item: number): CellState {
    if (this.checkItem(item)) {
      let newState = this.possibleTurns - Math.pow(2, item);
      return new CellState(this.index, {turns: newState, proper: this.properSolution});
    }
    else {
      return this;
    }
  }

  resolveTo(item: number): CellState {
    if (this.hasPossibleItem(item)) {
      return new CellState(this.index, {turns: Math.pow(2, item), proper: this.properSolution})
    }
    console.log('ERR: Cannot resolve to this item - not possible move!');
    return this;
  }

  private checkItem(item: number): boolean {
    if (item < 0 || item > 5) {
      console.log('ERR: Wrong item to resolve!');
      return false;
    }
    if (!this.hasPossibleItem(item)) {
      console.log('ERR: this cell does not contain the item!');
      return false;
    }
    return true;
  }
}