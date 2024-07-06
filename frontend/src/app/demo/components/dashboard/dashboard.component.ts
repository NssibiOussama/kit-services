import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';


interface UploadEvent {
    originalEvent: Event;
    files: File[];
}

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    providers: [MessageService]
})

export class DashboardComponent {
    uploadedFiles: any[] = [];
    products: any[] = []; // Define products property
    items: any[] = []; // Define items property
    chartData: any; // Define chartData property
    chartOptions: any; // Define chartOptions property
    

    constructor(private messageService: MessageService) {}

    onUpload(event: UploadEvent) {
        for (let file of event.files) {
            this.uploadedFiles.push(file);
        }

        this.messageService.add({ severity: 'info', summary: 'File Uploaded', detail: '' });
    }
}
