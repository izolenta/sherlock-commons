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
  readonly undoAvailable?: boolean;

  constructor({
    state= new BoardState(),
    clueset = new Array<GenericClue>(),
    difficulty=diff.DIFFICULTY_EASY,
    prevStates = new Array<BoardState>(),
    partyStage = partyStages.IN_PROGRESS,
    undoAvailable = false})
  {
    this.boardState = state;
    this.clueSet = clueset;
    this.difficulty = difficulty;
    this.prevStates = prevStates;
    this.partyStage = partyStage;
    this.undoAvailable = undoAvailable;
  }

  public update({
                  state = undefined,
                  clueset = undefined,
                  difficulty = undefined,
                  prevStates = undefined,
                  undoAvailable = false,
                  partyStage = undefined,
  }): GameState {
    return new GameState({
      state: state?? this.boardState,
      clueset: clueset?? this.clueSet,
      difficulty: difficulty?? this.difficulty,
      prevStates: prevStates?? this.prevStates,
      undoAvailable: undoAvailable?? this.undoAvailable,
      partyStage: partyStage?? this.partyStage,
    })
  }

  public toJSON() {
    const {prevStates, difficulty, undoAvailable, ...otherProps} = this;
    return {...otherProps, undoAvailable: prevStates && prevStates.length > 0};
  }
}