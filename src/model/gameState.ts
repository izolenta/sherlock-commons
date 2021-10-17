import { BoardState } from "./boardState";
import { GenericClue } from "./clues/genericClue";
import * as diff from './gameDifficulties';
import {partyStages} from "./party.stage";

export class GameState {
  readonly boardState: BoardState;
  readonly clueSet: GenericClue[];
  readonly difficulty?: number;
  readonly prevStates?: BoardState[];
  readonly partyStage: string;

  constructor({
    state= new BoardState(),
    clueset = new Array<GenericClue>(),
    difficulty=diff.DIFFICULTY_EASY,
    prevStates = new Array<BoardState>(),
    partyStage = partyStages.IN_PROGRESS})
  {
    this.boardState = state;
    this.clueSet = clueset;
    this.difficulty = difficulty;
    this.prevStates = prevStates;
    this.partyStage = partyStage;
  }

  public update({state = undefined, clueset = undefined, difficulty = undefined, prevStates = undefined}): GameState {
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