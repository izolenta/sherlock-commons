import {BoardState} from "../model/boardState";
import {GenericClue} from "../model/clues/genericClue";
import {TwoInSameColumnClue} from "../model/clues/twoInSameColumnClue";
import {TwoAdjacentClue} from "../model/clues/twoAdjacentClue";
import {OneShouldBeBeforeOtherClue} from "../model/clues/oneShouldBeBeforeOtherClue";
import {ThreeAdjacentClue} from "../model/clues/threeAdjacentClue";
import {TwoNotAdjacentClue} from "../model/clues/twoNotAdjacentClue";
import {TwoNotInSameColumnClue} from "../model/clues/twoNotInSameColumnClue";

export function generateClueSet(board: BoardState, difficulty: number) {

  let clues = new Array<GenericClue>();
  for (let i = 0; i < 10 + difficulty * 4; i++) {
    let clue;
    do {
      clue = TwoInSameColumnClue.generateClue(board);
    } while (containsClue(clues, clue));
    clues.push(clue);
  }
  for (let i=0; i<10;i++) {
    let clue;
    do {
      clue = TwoAdjacentClue.generateClue(board);
    } while (containsClue(clues, clue));
    clues.push(clue);
  }
  for (let i=0; i<10; i++) {
    let clue;
    do {
      clue = OneShouldBeBeforeOtherClue.generateClue(board);
    } while (containsClue(clues, clue));
    clues.push(clue);
  }
  for (let i=0; i<10; i++) {
    let clue;
    do {
      clue = ThreeAdjacentClue.generateClue(board);
    } while (containsClue(clues, clue));
    clues.push(clue);
  }

  for (let i=0; i<10; i++) {
    let clue;
    do {
      clue = TwoNotAdjacentClue.generateClue(board);
    } while (containsClue(clues, clue));
    clues.push(clue);
  }

  for (let i=0; i<10; i++) {
    let clue;
    do {
      clue = TwoNotInSameColumnClue.generateClue(board);
    } while (containsClue(clues, clue));
    clues.push(clue);
  }

  return clues;
}

function containsClue(clues: GenericClue[], clue: GenericClue) {
  for (let next of clues) {
    if (clue.isEqual(next)) {
      return true;
    }
  }
  return false;
}
