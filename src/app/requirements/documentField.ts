import { Http, Response, RequestOptionsArgs, Headers } from '@angular/http';
import { WorkItemField } from './field';
export class DocumentField {
  public File: FormData;
  public Field: WorkItemField;

  constructor(_field: WorkItemField,_file: FormData) {
      this.File = _file;
      this.Field = _field;
  }
}
