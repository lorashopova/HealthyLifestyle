import { Exercise } from './exercise';
export class Routine {
    public exercise: Exercise;
    public repeatTimes: number;
    public seriesCount: number;
    public restingTime: number;

    constructor(exercise: Exercise = null,
            repeatTimes: number = 0,
            seriesCount: number = 0,
            restingTime: number = 0) {
        this.exercise = exercise;
        this.repeatTimes = repeatTimes;
        this.seriesCount = seriesCount;
        this.restingTime = restingTime;
    }
}
