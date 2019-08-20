import { Component, OnInit } from '@angular/core';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture/ngx';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  constructor(
    private mediaCapture: MediaCapture
  ) { }

  ngOnInit() {
  }

  addPhoto() {
    this.mediaCapture.captureImage().then(res => {
      console.log(res);
      console.log('captured');
    });
  }

}
