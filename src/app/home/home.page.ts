import { Platform, NavController } from '@ionic/angular';
import { Component, ViewChild, AfterViewInit } from '@angular/core';

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  LatLng,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements AfterViewInit {
  @ViewChild('map') element;

  constructor(
    public googleMaps: GoogleMaps,
    public plt: Platform,
    public nav: NavController
  ) {}

  ngAfterViewInit() {
    this.plt.ready().then(() => {
      this.initMap();
    });
  }

  initMap() {
    let map: GoogleMap = this.googleMaps.create(this.element.nativeElement);

    map.one(GoogleMapsEvent.MAP_READY).then((data: any) => {
      let coordinates: LatLng = new LatLng(33.6396965, -84.4304574);

      let position = {
        target: coordinates,
        zoom: 17
      };

      map.animateCamera(position);

      let markerOptions: MarkerOptions = {
        position: coordinates,
        icon: 'assets/images/icons8-Marker-64.png',
        title: 'Our first POI'
      };

      const marker = map.addMarker(markerOptions).then((marker: Marker) => {
        marker.showInfoWindow();
      });
    });
  }
}
