import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { A11yModule } from '@angular/cdk/a11y';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTreeModule } from '@angular/material/tree';
import { OverlayModule } from '@angular/cdk/overlay';;
// Material Navigation
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
// Material Layout
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
// Material Buttons & Indicators
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';;
// Material Popups & Modals
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
// Material Data tables
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { LayoutModule } from '@angular/cdk/layout';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

@NgModule({
  imports: [A11yModule,
    CdkAccordionModule,
    ClipboardModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatBadgeModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDividerModule,
    MatMenuModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatTreeModule,
    OverlayModule,
    PortalModule,
    ScrollingModule,
    MatButtonModule, 
    MatSelectModule, 
    MatGridListModule, 
    MatCardModule, 
    MatTooltipModule,
    MatExpansionModule, 
    MatToolbarModule, 
    MatTableModule, 
    MatPaginatorModule, 
    MatSortModule, 
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatIconModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    NgxMatSelectSearchModule,
  ],

  exports: [
            A11yModule,
            CdkAccordionModule,
            ClipboardModule,
            CdkStepperModule,
            CdkTableModule,
            CdkTreeModule,
            DragDropModule,
            MatBadgeModule,
            MatButtonToggleModule,
            MatCheckboxModule,
            MatChipsModule,
            MatStepperModule,
            MatDatepickerModule,
            MatDividerModule,
            MatMenuModule,
            MatNativeDateModule,
            MatProgressSpinnerModule,
            MatRadioModule,
            MatRippleModule,
            MatSliderModule,
            MatSlideToggleModule,
            MatSnackBarModule,
            MatTreeModule,
            OverlayModule,
            PortalModule,
            ScrollingModule,
            MatButtonModule, 
            MatSelectModule, 
            MatGridListModule, 
            MatCardModule, 
            MatTooltipModule,
            MatExpansionModule, 
            MatToolbarModule, 
            MatTableModule, 
            MatPaginatorModule, 
            MatSortModule, 
            MatSidenavModule,
            MatListModule,
            MatIconModule,
            MatButtonModule,
            LayoutModule,
            MatIconModule,
            MatAutocompleteModule,
            MatInputModule,
            MatFormFieldModule,
            MatDialogModule,
            MatProgressBarModule,
            MatProgressSpinnerModule,
            NgxMatSelectSearchModule  
          ],
})
export class MaterialModule { }
