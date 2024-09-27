import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  @Input() message: string = '';
  @Input() alertType: string = 'alert-info';
  @Input() duration: number = 0;
  show: boolean = false;

  showAlert(message: string, alertType: string = 'alert-info', duration: number = 0) {
    this.message = message;
    this.alertType = alertType; // Asigna el tipo de alerta
    this.show = true;

    // Si se proporciona un duration mayor a 0, configura el temporizador
    if (duration > 0) {
      setTimeout(() => {
        this.close();
      }, duration);
    }
  }

  close() {
    this.show = false;
  }
}
