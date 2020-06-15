import {Component, Inject, OnInit} from '@angular/core';
import {ImageModel} from "../../../../model/image.model";
import {ImageService} from "../../../../service/image.service";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';


@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.css']
})
export class ImageGalleryComponent implements OnInit {

  galleryImage: ImageModel[];
  urlImage: string;

  constructor(
    public dialogRef: MatDialogRef<ImageGalleryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public imageService: ImageService
  ) {

  }

  ngOnInit() {
    this.imageService.findAll().subscribe(data => this.galleryImage = data);
    // this.imageService.findByTypeContaining("LogoBuilding").subscribe(data => this.galleryImage = data);
  }

  pickImage(value: any) {
    this.urlImage=value;
    console.log(this.urlImage);
    this.dialogRef.close();

  }
}
