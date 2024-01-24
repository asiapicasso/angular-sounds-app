import { Component, OnInit } from '@angular/core';
import { Icon, IconOptions, icon } from "leaflet";


@Component({
  selector: 'app-map-marker',
  templateUrl: './map-marker.component.html',
  styleUrls: ['./map-marker.component.scss'],
})
export class MapMarkerComponent {

  constructor() { }

}

export const mapMarkerIcon: Icon<IconOptions> = icon({
  iconSize: [30, 30], //in pixel  
  iconUrl: "assets/icon/pin.png",
});
