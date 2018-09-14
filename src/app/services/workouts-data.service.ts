import { Observable } from 'rxjs/Observable';
import { Exercise } from './../models/exercise';
import { Routine } from './../models/routine';
import { Workout } from './../models/workout';
import { WorkoutInterface } from './../interfaces/workout';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Category } from '../enums/workoutCategories';
import 'rxjs/add/operator/map';

@Injectable()
export class WorkoutData {
    private db: AngularFireDatabase;
    private firebaseCollection: FirebaseListObservable<any[]>;
    public items;

    constructor(db: AngularFireDatabase) {
        this.db = db;
        this.firebaseCollection = this.db.list('/workouts');
    }

    getAvailablePrograms() {
        return this.db.list('/programs');
    }
    getProgramByTitle(title: string) {
        return this.db.list(`/programs`).map(programs => {
            return programs.filter(pr => pr.title === title);
        });
    }

    add(program: any) {
        return Promise.resolve(
            this.db.list('/programs')
                .push(program)
                .then(_ => {
                    return _.key;
                }));
                //.catch((error) => this.notificationService.popToast('error', 'Ooops!', error.message)));
    }

    getAvailableWorkouts() {
    const items = this.db.list('/workouts');

    return items;
    }

    // need to add some notifications, not console outputs
    addWorkout(workout: WorkoutInterface) {
        return this.firebaseCollection.push(workout)
            .then(_ => console.log('workout added'))
            .catch(err => console.log(err, 'err when adding workout'));
    }

    getWorkoutById(id: string) {
        return this.db.object(`workouts/${id}`);
    }

    getWorkoutByTitle(title: string) {
        const items = this.db.list('/workouts').map(workouts => {
            return workouts.filter(w => w.title === title);
        });

        return items;
    }

    addRoutine(routine: Routine): void {
        this.db.list('/routines').push(routine)
            .then(_ => console.log('routine added'))
            .catch(err => console.log(err, 'err when adding routine'));
    }

    getAvailableRoutines() {
        return this.db.list('/routines');
    }

    addExercise(exercise: Exercise): void {
        this.db.list('/exercises').push(exercise)
            .then(_ => console.log('exercise added'))
            .catch(err => console.log(err, 'err when adding exercise'));
    }

    getExerciseSnapshot(name: string) {
        const exercises = this.db.list('/exercises', {
            preserveSnapshot: true,
        });

        let item: any;
        exercises.subscribe(snapshots => {
            snapshots.forEach(snapshot => {
                if (snapshot.val().name === name) {
                    item = snapshot;
                }
            });
        });
        return item;
    }

    getExerciseByName(name: string) {
        const exercises = this.db.list('/exercises', {
            preserveSnapshot: true,
        });

        let item: any;
        exercises.subscribe(snapshots => {
            snapshots.forEach(snapshot => {
                if (snapshot.val().name === name) {
                    item = snapshot.val();
                }
            });
        });
        return item;
    }

    getAvailableExercises() {
        return this.db.list('/exercises');
    }
}
