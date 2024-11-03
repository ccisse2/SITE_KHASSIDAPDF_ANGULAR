import {Component, OnInit} from '@angular/core';
import {Khassida} from '../../models/khassida';
import {TraductionKhassida} from '../../models/TraductionKhassida';
import {ApiServiceKhassida} from '../../services/api-service.khassida';
import {TraducKhassidaService} from '../../services/traduc-khassida.service';
import {QuranService} from '../../services/quran.service';
import {catchError, of, tap} from 'rxjs';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';
import {CarouselComponent} from '../carousel/carousel.component';
import {NabBarComponent} from '../nab-bar/nab-bar.component';



@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    CarouselComponent,
    NabBarComponent
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  adminForm: FormGroup;
  selectedType: 'khassida' | 'traduction' | 'quran' = 'khassida';
  isSubmitting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private khassidaService: ApiServiceKhassida,
    private traductionService: TraducKhassidaService,
    private quranService: QuranService
  ) {
    this.adminForm = this.fb.group({
      type: ['khassida', Validators.required],
      name: ['', Validators.required],
      lienImg: [null, Validators.required],
      lienPdf: [null, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.adminForm.invalid) {
      return;
    }

    const formData = new FormData();
    formData.append('name', this.adminForm.value.name);
    formData.append('lienImg', this.adminForm.value.lienImg);
    formData.append('lienPdf', this.adminForm.value.lienPdf);

    // Ajoutez des champs spécifiques au type si nécessaire
    const content: Khassida = {
      name: this.adminForm.value.name,
      lienImg: this.adminForm.value.lienImg.name,
      lienPdf: this.adminForm.value.lienPdf.name
    };

    this.isSubmitting = true;
    let serviceCall;

    if (this.selectedType === 'khassida') {
      serviceCall = this.khassidaService;
    } else if (this.selectedType === 'traduction') {
      serviceCall = this.traductionService;
    } else if (this.selectedType === 'quran') {
      serviceCall = this.quranService;
    }

    serviceCall?.uploadFile(formData).subscribe({
      next: (response) => {
        console.log('Ajout réussi:', response);
        this.isSubmitting = false;
        this.adminForm.reset();
      },
      error: (error) => {
        console.error('Erreur lors de l\'ajout:', error);
        this.isSubmitting = false;
      }
    });
  }

  onFileSelected(event: Event, fileType: 'lienImg' | 'lienPdf'): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.adminForm.patchValue({ [fileType]: file });
      this.adminForm.get(fileType)?.updateValueAndValidity();
    }
  }
}
