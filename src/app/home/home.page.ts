
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  archivo: any = "Ninguno";
  taskList = [];
  taskName: string;
  urlLocal = "http://localhost:8080/ConfigMasivo/ServicioConfig";
  urlPublico = "http://192.168.129.136:8080/ConfigMasivo/ServicioConfig";
  metodoPOST = "POST";
  xmlCargos = '<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/"><Body><inserGrupo xmlns="http://ws.qa.desarrollos.macroproyectos.com/"/></Body></Envelope>';
  xmlMedioEnvio = '<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/"><Body><inserMedioEnvio xmlns="http://ws.qa.desarrollos.macroproyectos.com/"/></Body></Envelope>'
  //fileData: File = null;

  constructor(private http: HttpClient) {

  }
  onChangeFile(data): void {
    let task = data;
    let filenameWithExtension = task.replace(/^.*[\\\/]/, '');
    this.taskList.push(filenameWithExtension);
    this.taskName = "";
    this.archivo = filenameWithExtension;
  }

  porcentaje = 0.05;
  cambioRango(event) {
    console.log(event)
    this.porcentaje = event.detail.value / 100;
  }
  onSubmit() {
    var serviceCargue = new XMLHttpRequest();
    serviceCargue.open(this.metodoPOST, this.urlPublico);
    serviceCargue.send(this.xmlCargos);




    // fileProgress(fileInput: any) {
    //   this.fileData = <File>fileInput.target.files[0];
    // }

    // cargarDocumento() {
    //   const formData = new FormData();
    //   formData.append('file', this.fileData);
    //   this.http.post('url/to/your/api', formData, {
    //     reportProgress: true,
    //     observe: 'events'
    //   }).subscribe(events => {
    //     if (events.type == HttpEventType.UploadProgress) {
    //       console.log('Upload progress: ', Math.round(events.loaded / events.total * 100) + '%');
    //     } else if (events.type === HttpEventType.Response) {
    //       console.log(events);
    //     }
    //   })
    // }

  }
}




