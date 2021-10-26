import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-upload-page',
  templateUrl: './upload-page.component.html',
  styleUrls: ['./upload-page.component.scss']
})
export class UploadPageComponent {
  validExtensions: string[] = [
    ".csv",
    "application/vnd.ms-excel",
    ".xlt",
    "application/vnd.ms-excel",
    ".xla",
    "application/vnd.ms-excel",
    ".xlsx",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ".xltx",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.template",
    ".xlsm",
    "application/vnd.ms-excel.sheet.macroEnabled.12",
    ".xltm",
    "application/vnd.ms-excel.template.macroEnabled.12",
    ".xlam",
    "application/vnd.ms-excel.addin.macroEnabled.12",
    ".xlsb",
    "application/vnd.ms-excel.sheet.binary.macroEnabled.12"
  ]

  @ViewChild("fileInput", { static: true })

  fileInputRef!: ElementRef;
  fileInput!: HTMLInputElement;
  droppedFile: File | undefined
  @Output() upload = new EventEmitter()
  @Output() delete = new EventEmitter()

  isActive: boolean = false;

  constructor (private router: Router){

  }

  get styleClasses() {    
    return {
      'active': this.isActive
    }
  }

  onDragOver(e: DragEvent) {
    e.preventDefault()
    this.isActive = true
  }
  onDragLeave() {
    this.isActive = false
  }
  onDeleteClick() {
    delete this.droppedFile
    this.delete.emit()
  }
  onNextClick(){
    this.router.navigate(["/view"])
  }
  onDragDrop(e: DragEvent) {
    e.preventDefault()
    this.isActive = false
    if (e.dataTransfer == null) { return }
    this.readUpload(e.dataTransfer.files[0])
  }
  onDragAreaClick() {
    this.fileInput.addEventListener("change", (e: Event) => {
      if (this.fileInput.files) {
        this.readUpload(this.fileInput.files[0])
      }
    })
    this.fileInput.click()
  }
  readUpload(file: File) {
    if (!this.validExtensions.includes(file.type)) {
      alert("Unrecognized file type")
      return
    }
    this.droppedFile = file
    this.upload.emit()
  }

  public async getJSON(): Promise<any> {
    //converts the uploaded file to JSON
    return new Promise<any>((resolve, reject) => {
      if (this.droppedFile == undefined || this.droppedFile == null) {
        return resolve([])
      }
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        const binarystr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];
        const data: any = XLSX.utils.sheet_to_json(ws);        
        resolve(data)
      }
      reader.readAsBinaryString(this.droppedFile)
    })
  }

}
