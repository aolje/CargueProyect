import { ComponentFixture } from '@angular/core/testing';
import { Component } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  archivo: any;
  cosas: any;

  fileData: File = null;
  constructor(private http: HttpClient) { }

  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
  }

  onSubmit() {

    const formData = new FormData();
    formData.append('file', this.fileData);
    this.cosas = "Ingreso un texto";
    this.archivo = formData.append;
    this.http.post('url/to/your/api', formData, {
      reportProgress: true,
      observe: 'events'
    }).subscribe(events => {
      if (events.type == HttpEventType.UploadProgress) {
        console.log('Upload progress: ', Math.round(events.loaded / events.total * 100) + '%');
      } else if (events.type === HttpEventType.Response) {
        console.log(events);
      }
    })
  }
  otro(archivo:any) { 
    const formData = new FormData();
    formData.append('file', this.fileData);
    this.cosas = "Ingreso un texto";

  }
/*https://www.tutsmake.com/new-angular-7-upload-file-image-example/*/
}


