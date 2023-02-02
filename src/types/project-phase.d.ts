import { ISteps } from './steps.d';
export interface IPhase {
  id: number;
  name: string;
  isDone: boolean;
  steps: ISteps[];
}
