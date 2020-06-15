import { Component, OnInit } from '@angular/core';
import {BuildingModel} from '../../../model/building.model';
import {BuildingService} from '../../../service/building.service';
import {EquipmentModel} from '../../../model/equipment.model';
import {GroundModel} from '../../../model/ground.model';
import {TypeEquipmentModel} from '../../../model/typeEquipment.model';
import {EquipmentService} from '../../../service/equipment.service';
import {GroundService} from '../../../service/ground.service';
import {TypeEquipmentService} from '../../../service/type-equipment.service';
import {FloorModel} from '../../../model/floor.model';
import {FloorService} from '../../../service/floor.service';

@Component({
  selector: 'app-equipment-building',
  templateUrl: './equipment-building.component.html',
  styleUrls: ['./equipment-building.component.css']
})
export class EquipmentBuildingComponent implements OnInit {

  public equipmentModel: EquipmentModel[];
  public grounds: GroundModel[] = [];
  public typeEquipment: TypeEquipmentModel[];
  public floors: FloorModel[] = [];
  public buildings: BuildingModel[] = [];
  public totalRec: number;
  public page = 1;
  public searchText;

  constructor(
    public buildingService: BuildingService,
    public equipmentService: EquipmentService,
    public floorService: FloorService,
    public groundService: GroundService,
    public typeElementService: TypeEquipmentService,
  ) { }

  ngOnInit() {
    this.typeElementService.findAll().subscribe((data: TypeEquipmentModel[]) => {
      this.typeEquipment = data;
    });
    this.groundService.findAll().subscribe((data: GroundModel[]) => {
      this.grounds = data;
    });
    this.equipmentService.findAll().subscribe((data: EquipmentModel[]) => {
      this.equipmentModel = data;
    });
    this.floorService.findAll().subscribe((data: FloorModel[]) => {
      this.floors= data;
    });
    this.buildingService.findAll().subscribe((data: BuildingModel[]) => {
      this.buildings = data;
    });
  }


  searchType(codeGround: string) {
    this.searchText = codeGround;
  }
}
