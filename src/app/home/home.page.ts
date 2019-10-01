
import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  cont: any = "aqui";
  archivo: any = "Ninguno";
  taskList = [];
  taskName: string;
  itemL: string;
  oculto = true;
  porcentaje = 0.05;
  urlLocal = "http://localhost:8080/ConfigMasivo/ServicioConfig";
  urlPublico = "http://192.168.129.136:8080/ConfigMasivo/ServicioConfig";
  metodoPOST = "POST";
  xmlCargos = '<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/"><Body><inserGrupo xmlns="http://ws.qa.desarrollos.macroproyectos.com/"/></Body></Envelope>';
  xmlMedioEnvio = '<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/"><Body><inserMedioEnvio xmlns="http://ws.qa.desarrollos.macroproyectos.com/"/></Body></Envelope>'
  //fileData: File = null;

  constructor(private http: HttpClient) {
    localStorage.clear();
  }
  onChangeFile(data): void {
    if (this.fileValidation() == false) {
      console.log("Yuca");
    } else {
      let task = data;
      let filenameWithExtension = task.replace(/^.*[\\\/]/, '');
      this.taskList.push(filenameWithExtension);
      this.taskName = "";
      this.archivo = filenameWithExtension;
      this.oculto = false;
      localStorage.setItem(filenameWithExtension, JSON.stringify(data));
    }


  }
  deleteItem(item: any) {

    for (let i = 0; i < this.taskList.length; i++) {
      if (item == this.taskList[i]) {
        this.taskList.splice(i, 1);
        if (this.taskList.length == 0) {
          console.log("la lista quedo vacia vacia");
          this.oculto= !this.oculto;
        } else {
          console.log("Quedo con " +this.taskList.length + "registros")
        }
      }
    }
  }

  fileValidation() {
    var fileInput = document.getElementById('btn-dcr2');
    var filePath = fileInput.value;
    var allowedExtensions = /(.csv)$/i;
    if (!allowedExtensions.exec(filePath)) {
      alert('Por favor ingresar un archivo .CSV.');
      fileInput.value = '';
      return false;
    } else {
      var reader = new FileReader();
      reader.onload = function () {
        console.log(reader.result);
        localStorage.setItem("fileInput.tagName", JSON.stringify(reader.result));
        var textoObtenido = reader.result;
        return textoObtenido;
      };
      // reader.readAsText(textObtenido);
    }
  }

  //En construcción el evento leer
  // leer() {
  //   const inpout = document.querySelector('input[type="file"]');
  //   console.log("este esl inpout: "+inpout);
  //   inpout.addEventListener('change', function (e) {
  //     {
  //       console.log("Entro al addeventLinester"+inpout.files);
  //       const reader = new FileReader();
  //       reader.onload = function () {
  //         console.log("Text: " + reader.result);
  //       }
  //       console.log("Text2: " + reader);
  //       reader.readAsText(inpout.files[0]);
  //     }
  //   }, false
  //   )
  //   console.log("Retorno falso");
  // }

  cambioRango(event) {
    console.log(event)
    this.porcentaje = event.detail.value / 100;
  }

  onSubmit() {
    var serviceCargue = new XMLHttpRequest();
    serviceCargue.open(this.metodoPOST, this.urlPublico);
    serviceCargue.send(this.xmlCargos);
  }



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





