import { Component, OnInit, ViewChild } from '@angular/core';

declare const MediaRecorder: any;

@Component({
  selector: 'app-root',
  template: `
    <audio #player controls></audio>
    <button (click)="stopRecording()">Stop</button>
    <button (click)="startRecording()">Start</button>
  `,
})
export class AppComponent implements OnInit {
  @ViewChild('player')
  player;
  mediaRecorder = MediaRecorder;
  chunks = [];

  ngOnInit() {
    const playerEl = this.player.nativeElement;
    const handleSuccess = (stream) => {
      this.mediaRecorder = new MediaRecorder(stream);
      this.mediaRecorder.ondataavailable = function(e) {
        console.log('data availaable', e.data);
        playerEl.controls = true;
        const blob = new Blob([e.data], { 'type' : 'audio/ogg; codecs=opus' });
        const audioURL = window.URL.createObjectURL(blob);
        playerEl.src = audioURL;
      };
      this.mediaRecorder.start();

      this.mediaRecorder.onstop = () => {
        console.log('stopped mediarecorder');
      };
    };

    navigator.mediaDevices.getUserMedia({ audio: true, video: false })
      .then(handleSuccess);
  }

  startRecording() {
    console.log('start recording');
    this.mediaRecorder.start();
  }

  stopRecording() {
    console.log('stop recording');
    this.mediaRecorder.stop();
  }
}
