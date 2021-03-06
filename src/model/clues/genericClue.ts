import {ClueItem} from "./clueItem";
import {BoardState} from "../boardState";

export interface AppliedResult {
  state: BoardState,
  isApplied: boolean,
}

export abstract class GenericClue {
  readonly description: string;
  readonly isUsed: boolean;
  readonly items: Array<ClueItem>;
  readonly type: string;

  protected constructor({descr = '', items = new Array<ClueItem>(), isUsed = false, type}) {
    this.description = descr;
    this.items = items;
    this.isUsed = isUsed;
    this.type = type;
  }

  isEqual(clue: GenericClue): boolean {
    if (this.type !== clue.type || this.items.length !== clue.items.length) {
      return false;
    }
    for (let index = 0; index < this.items.length; index++) {
      if (this.items[index] !== clue.items[index]) {
        return false;
      }
    }
    return true;
  }

  abstract applyToBoard(state: BoardState): AppliedResult;

  abstract setUsed(isUsed: boolean): GenericClue;

  public toJSON() {
    const {description, ...otherProps} = this;
    return otherProps;
  }

}
