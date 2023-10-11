import { Component } from '@angular/core';

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.css'],
})
export class StopwatchComponent {
  title = 'stopwatch';

  constructor() {
    this.obtener_localstorage();
  }
  
  ms: any = '0' + 0;
  sec: any = '0' + 0;
  min: any = '0' + 0;
  cron: any;

  startTimer: any;
  running = false;

  start(): void {
    if (!this.running) {
      this.running = true;
      this.startTimer = setInterval(() => {
        this.ms++;
        this.ms = this.ms < 10 ? '0' + this.ms : this.ms;

        if (this.ms === 100) {
          this.sec++;
          this.sec = this.sec < 10 ? '0' + this.sec : this.sec;
          this.ms = '0' + 0;
        }

        if (this.sec === 60) {
          this.min++;
          this.min = this.min < 10 ? '0' + this.min : this.min;
          this.sec = '0' + 0;
        }
      }, 10);
    } else {
      this.stop();
    }
  }

  stop(): void {
    clearInterval(this.startTimer);
    this.running = false;
    this.cron = `${this.min}:${this.sec}:${this.ms}`;
    console.log(this.cron);
    this.guardar_localstorage();
  }

  reset(): void {
    clearInterval(this.startTimer);
    this.running = false;
    this.sec = this.ms = '0' + 0;
    this.min = '0' + 0;
    this.cron = `${this.min}:${this.sec}:${this.ms}`;
    this.guardar_localstorage();
  }

  guardar_localstorage() {
    const tostring = this.cron.toString();
    localStorage.setItem('Cronometro', tostring);
  }

  obtener_localstorage() {
    const guardar = localStorage.getItem('Cronometro');
    if (guardar) {
      const tiempo = guardar.split(':');
      this.min = tiempo[0];
      this.sec = tiempo[1];
      this.ms = tiempo[2];
      this.cron = `${this.min}:${this.sec}:${this.ms}`;
    } else {
    }
  }
}
