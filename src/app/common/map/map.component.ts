import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as Basemap from 'esri/Basemap';
import * as MapImageLayer from 'esri/layers/MapImageLayer';
import * as Map from 'esri/Map';
import * as MapView from 'esri/views/MapView';
import * as BasemapToggle from 'esri/widgets/BasemapToggle';

// import * as MapView from 'esri/views/MapView';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {
  // The <div> where we will place the map
  @ViewChild('mapDiv', { static: true }) private mapViewEl: ElementRef;
  view: any;

  constructor() {
    // console.log('esri', __esri);
  }

  async initializeMap() {
    const basemap = new Basemap({
      portalItem: {
        id: '7e2b9be8a9c94e45b7f87857d8d168d6'  // WGS84 Streets Vector webmap
      }
    });

    try {
      // Configure the Map
      const mapProperties = {
        basemap: 'topo',
        // basemap
        // logo: false,
        // fadeOnZoom: true,
        // force3DTransforms: true,
        // navigationMode: 'css-transforms',
        // optimizePanAnimation: true, {
        // basemap: 'topo', // dark-gray
      };

      const map = new Map(mapProperties);

      // Initialize the MapView
      const mapViewProperties = {
        container: this.mapViewEl.nativeElement,
        center: [-105.0030071, 39.7505076],
        // camera: {
        //   position: {  // observation point
        //     x: -105.0000071,
        //     y: 39.7405076,
        //     z: 1000 // altitude in meters
        //   },
        //   tilt: 45  // perspective in degrees
        // },
        zoom: 15,
        // ground: 'world-elevation',
        map,
        // ui: {
        //   position: 'top-left',
        //   components: ['attribution', 'zoom']
        // }
      };

      const layers = this.createLayers();
      map.addMany(layers);
      const view = new MapView(mapViewProperties);
      const bmToggleWidget = new BasemapToggle({
        view,
        nextBasemap: 'hybrid'
      });
      view.ui.add(bmToggleWidget, 'top-right');
      // Use the `search-start` event of the SearchViewModel
      return view;
    } catch (error) {
      console.log('Esri: ', error);
    }
  }

  ngOnInit() {
    this.view = this.initializeMap();
  }

  ngOnDestroy() {
    if (this.view) {
      // destroy the map view
      this.view.container = null;
    }
  }

  setBasemap(layerName) { }

  createLayers() {
    /**
           * These are the various layers that will be displayed on the map. They cannot be easly moved into another file
           * or location, because the depend on MapImageLayer, which is only available upon the resolution
           * of a promise by the ESRI loader.
           */


    const activeLayer = new MapImageLayer({
      // url: 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer',
      url: 'https://gis-b2-3.cable.comcast.com/arcgis/rest/services/CC_SNET_HFCNetwork/CC_SNET_RF_ACTIVE/MapServer',
      imageFormat: 'png32',
      maxScale: 0,
      minScale: 20000
    });

    activeLayer.on('layerview-create-error', (event) => {
      console.error('LayerView failed to create for layer with the id: ', activeLayer.id, ' in this view: ', event.view);
    });

    const tombstoneLayer = new MapImageLayer({
      url: 'https://gis-b2-3.cable.comcast.com/arcgis/rest/services/CC_SNET_HFCNetwork/CC_SNET_HFC_DATABLOCK/MapServer',
      imageFormat: 'png32',
      maxScale: 0,
      minScale: 10000
    });

    const cableLayer = new MapImageLayer({
      url: 'https://gis-b2-3.cable.comcast.com/arcgis/rest/services/CC_SNET_HFCNetwork/CC_SNET_RF_CABLE/MapServer',
      imageFormat: 'png32',
      maxScale: 0,
      minScale: 20000
    });

    const tapLayer = new MapImageLayer({
      url: 'https://gis-b2-3.cable.comcast.com/arcgis/rest/services/CC_SNET_HFCNetwork/CC_SNET_RF_TAP/MapServer',
      imageFormat: 'png32',
      maxScale: 0,
      minScale: 20000
    });

    const passiveLayer = new MapImageLayer({
      url: 'https://gis-b2-3.cable.comcast.com/arcgis/rest/services/CC_SNET_HFCNetwork/CC_SNET_RF_PASSIVE/MapServer',
      imageFormat: 'png32',
      maxScale: 0,
      minScale: 20000
    });

    const strandLayer = new MapImageLayer({
      url: 'https://gis-b2-3.cable.comcast.com/arcgis/rest/services/CC_SNET_HFCNetwork/CC_SNET_STRAND/MapServer',
      imageFormat: 'png32',
      maxScale: 0,
      minScale: 50000
    });

    const supportLayer = new MapImageLayer({
      url: 'https://gis-b2-3.cable.comcast.com/arcgis/rest/services/CC_SNET_HFCNetwork/CC_SNET_SUPPORT_STRUCTURE/MapServer',
      imageFormat: 'png32',
      maxScale: 0,
      minScale: 50000
    });

    const powersupplyLayer = new MapImageLayer({
      url: 'https://gis-b2.cable.comcast.com/arcgis/rest/services/CC_SNET_HFCNetwork/CC_SNET_RF_POWERSUPPLY/MapServer',
      imageFormat: 'png32',
      maxScale: 0,
      minScale: 50000
    });

    const nodeSiteLayer = new MapImageLayer({
      url: 'https://gis-b2-3.cable.comcast.com/arcgis/rest/services/CC_SNET_HFCNetwork/CC_SNET_NODE_SITE/MapServer',
      imageFormat: 'png32',
      maxScale: 0,
      minScale: 20000
    });

    const nodeBLayer = new MapImageLayer({
      url: 'https://gis-b2-3.cable.comcast.com/arcgis/rest/services/CC_SNET_Boundary/CC_SNET_NODE_BNDY/MapServer',
      imageFormat: 'png32',
      maxScale: 0,
      minScale: 2500000
    });

    const fiberLayer = new MapImageLayer({
      url: 'https://gis-b2-3.cable.comcast.com/arcgis/rest/services/CC_SNET_HFCNetwork/CC_SNET_FIBER_CABLE/MapServer',
      imageFormat: 'png32',
      maxScale: 0,
      minScale: 2500000
    });

    const fiberSpliceLayer = new MapImageLayer({
      url: 'https://gis-b2-3.cable.comcast.com/arcgis/rest/services/CC_SNET_HFCNetwork/CC_SNET_FIBER_SPLICE/MapServer',
      imageFormat: 'png32',
      maxScale: 0,
      minScale: 2500000
    });

    return [
      activeLayer,
      cableLayer,
      fiberLayer,
      fiberSpliceLayer,
      nodeBLayer,
      nodeSiteLayer,
      passiveLayer,
      powersupplyLayer,
      strandLayer,
      supportLayer,
      tapLayer,
      tombstoneLayer
    ];
  }
}


