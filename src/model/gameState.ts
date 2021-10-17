import { BoardState } from "./boardState";
import { GenericClue } from "./clues/genericClue";
import * as diff from './gameDifficulties';

export class GameState {
  readonly boardState: BoardState;
  readonly clueSet: GenericClue[];
  readonly difficulty?: number;
  readonly prevStates?: BoardState[];

  constructor({
    state= new BoardState(),
    clueset = new Array<GenericClue>(),
    difficulty=diff.DIFFICULTY_EASY,
    prevStates = new Array<BoardState>()})
  {
    this.boardState = state;
    this.clueSet = clueset;
    this.difficulty = difficulty;
    this.prevStates = prevStates;
  }

  public update({state, clueset, difficulty, prevStates}): GameState {
    return new GameState({
      state: state?? this.boardState,
      clueset: clueset?? this.clueSet,
      difficulty: difficulty?? this.difficulty,
      prevStates: prevStates?? this.prevStates
    })
  }

  public toJSON() {
    const {prevStates, difficulty, ...otherProps} = this;
    return otherProps;
  }
}