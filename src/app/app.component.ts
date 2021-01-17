import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/observable';
import { CustomValidators } from './custom-validators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  projectStatus: string[] = ['Stable', 'Critical', 'Finished'];
  signupForm: FormGroup;
  forbiddenNames = ['Test', 'Test2'];

  ngOnInit() {
    this.signupForm = new FormGroup({
      'projectName': new FormControl(null, [Validators.required, CustomValidators.forbiddenProjectNames], CustomValidators.forbiddenProjectNamesAsync),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'projectStatus': new FormControl('Stable')
    });


  }

  onSubit() {
    console.log(this.signupForm);
  }

  forbiddenProjectNames(control: FormControl): {[ s: string]: boolean} {
    if(this.forbiddenNames.indexOf(control.value) !== -1) {
      return {'projectNameIsForbidden': true};
    }
    return null;
  }

  forbiddenProjectNamesAsync(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        for(let i = 0; i < this.forbiddenNames.length; i++) {
          console.log(this.forbiddenNames[i]);
          if(control.value === this.forbiddenNames[i]) {
            resolve({'projectNameISForbidden': true})
          } else {
            resolve(null);
          }
        }
      }, 1500);
    })

    return promise;
  }
}
