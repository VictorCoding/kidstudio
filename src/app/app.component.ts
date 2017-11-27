import { Component, OnInit, ViewChild } from '@angular/core';

declare const MediaRecorder: any;

@Component({
  selector: 'app-root',
  styles: [`
    button {
      width: 300px;
      height: 300px;
      font-size: 30pt;
    }
  `],
  template: `
    <audio #player controls></audio>
    <button (click)="stopRecording()">Stop</button>
    <button (click)="startRecording()">Start</button>
  `,
})
export class AppComponent implements OnInit {
  @ViewChild('player')
  player;
  mediaRecorder;

  ngOnInit() {
    const playerEl = this.player.nativeElement;
    const handleSuccess = (stream) => {
      this.mediaRecorder = new MediaRecorder(stream);
      this.mediaRecorder.ondataavailable = function(e) {
        const blob = new Blob([e.data], { 'type' : 'audio/wav' });
        const audioUrl = window.URL.createObjectURL(blob);
        playerEl.src = audioUrl;
      };
    };

    navigator.mediaDevices
      .getUserMedia({ audio: true, video: false })
      .then(handleSuccess);
  }

  startRecording() {
    this.mediaRecorder.start();
  }

  stopRecording() {
    this.mediaRecorder.stop();
  }
}
