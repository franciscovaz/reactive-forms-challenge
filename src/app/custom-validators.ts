import { FormControl } from "@angular/forms";
import { Observable } from "rxjs/observable";

export class CustomValidators {
  forbiddenNames = ['Test', 'Test2'];

  static forbiddenProjectNames(control: FormControl): {[ s: string]: boolean} {
    if(control.value === 'Test') {
      return {'projectNameIsForbidden': true};
    }
    return null;
  }


  static forbiddenProjectNamesAsync(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
          if(control.value === 'Test2') {
            resolve({'projectNameISForbidden': true})
          } else {
            resolve(null);
          }
      }, 1500);
    })

    return promise;
  }

}



