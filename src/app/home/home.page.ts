
import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { CodeNode } from 'source-list-map';
import { start } from 'repl';


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

  selectedFile: File = null;
  onFileSelected(event) {
    console.log(event)
    this.selectedFile = <File>event.target.files;
    console.log(this.selectedFile);
  }

  onUpload(){
    const fb = new FormData();
    fb.append('file' , this.selectedFile);
    this.http.post('http://192.168.129.143:8080/ConfigMasivoRest/subirArchivoGrupos', fb).subscribe( data =>{
      console.log("ESto me dice: "+data);
    });
  }
  onChangeFile(data): void {
    if (this.fileValidation() == false) {
      console.log("Yuca!! no se puede  subir el archivo");
    } else {
      let task = data;
      let filenameWithExtension = task.replace(/^.*[\\\/]/, '');
      this.taskList.push(filenameWithExtension);
      this.taskName = "";
      this.archivo = filenameWithExtension;
      this.oculto = false;
      localStorage.setItem(filenameWithExtension, data);
      this.leerArchivo(data);
      console.log(data);
    }

  }
  deleteItem(item: any) {

    for (let i = 0; i < this.taskList.length; i++) {
      if (item == this.taskList[i]) {
        this.taskList.splice(i, 1);
        if (this.taskList.length == 0) {
          console.log("la lista quedo vacia vacia");
          this.oculto = !this.oculto;
        } else {
          console.log("Quedo con " + this.taskList.length + "registros")
        }
      }
    }
  }
  fileValidation() {
    var fileInput = document.getElementById('btn-dcr2');
    var filePath = fileInput.value;
    // var filePath = fileInput.value;
    var allowedExtensions = /(.csv)$/i;
    if (!allowedExtensions.exec(filePath)) {
      alert('Por favor ingresar un archivo .CSV.');
      filePath = '';
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
  leerArchivo(file) {
    const input = document.querySelector('input[type="file"]')
    input.addEventListener('change', function (e) {
      const reader = new FileReader();
      reader.onload = function () {
        console.log(reader.result);
      }

      reader.readAsText(null, input.files[0])
    }, false)
  }
}




