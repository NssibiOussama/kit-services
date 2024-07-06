import { Component } from '@angular/core';
import { CvService } from '../../../service/cv.service';
@Component({
  selector: 'app-othert-skills',
  templateUrl: './othert-skills.component.html',
  styleUrl: './othert-skills.component.scss'
})
export class OthertSkillsComponent {
  cvData: any[] = []; // Initialize with an empty array
  cvKeys : any = []
  keywords: string = ""

  constructor(private cvService: CvService) { }

  searchCvData() {
    this.cvService.getCvData(this.keywords).subscribe(
      {
        next: (data) => {
          // Store the CV data
          this.cvData = Object.values(data);
          this.cvKeys = Object.keys(data);

        },
        error: (error) => {
          // Handle error
          console.error('Error fetching CV data:', error);
        }
      }
    );
  }

}
