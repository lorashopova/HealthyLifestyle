import { WorkoutData } from './../../../services/workouts-data.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-workout',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.css']
})
export class WorkoutsComponent implements OnInit {
  public workout: any;

  constructor(
  private workoutData: WorkoutData,
  private router: ActivatedRoute) { }
  ngOnInit() {
    this.router.params.subscribe((params: Params) => {
      const title = params['title'];

      this.workoutData.getAvailableWorkouts().map(workouts => {
        return workouts.filter(w => w.title === title);
      }).subscribe(workouts => {
            this.workout = workouts[0];
      });
    });
  }
}
