import { Validators } from '@angular/forms';
import { dateReleaseValidator } from '../validators/date-release.validator';

export const VALIDATORS = {
  id: [Validators.required, Validators.minLength(3), Validators.maxLength(10)],
  name: [
    Validators.required,
    Validators.minLength(6),
    Validators.maxLength(100),
  ],
  description: [
    Validators.required,
    Validators.minLength(10),
    Validators.maxLength(200),
  ],
  logo: [Validators.required],
  dateRelease: [Validators.required, dateReleaseValidator()],
  dateRevision: [Validators.required],
};
