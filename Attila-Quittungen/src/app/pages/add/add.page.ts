import { Component, OnInit } from '@angular/core';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { format } from 'path';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  photo: SafeResourceUrl;
  photoTaken = false;
  reasons = ['Büro', 'Zvieri', 'Material'];
  events = ['Sola', 'Ufla', ]

  constructor(
    private sanitizer: DomSanitizer,
   ) { }

  ngOnInit() {

  }

  async addPhoto() {
    console.log('Taking photo');
    const image = await Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });

    //this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
    this.photo = image.dataUrl;

    this.photoTaken = true;
  }

  retake() {
    this.photoTaken = false;
  }

  send(form: NgForm) {
    console.log(form.value.amount);
  }

}
