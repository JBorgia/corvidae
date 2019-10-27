import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { cloneDeep } from 'lodash';

import { MapComponent } from '../../common/map/map.component';

interface IConfig {
  columns: Array<{
    visible: boolean,
    size: number,
    rows: Array<{
      visible: boolean,
      size: number,
      type: string
    }>
  }>;
  disabled: boolean;
}


const defaultConfig: IConfig = {
  columns: [
    {
      visible: true,
      size: 25,
      rows: [
        { visible: true, size: 25, type: 'map' },
        { visible: true, size: 75, type: 'B' }
      ]
    },
    {
      visible: true,
      size: 50,
      rows: [
        { visible: true, size: 60, type: 'doc' },
        { visible: true, size: 40, type: 'C' }
      ]
    },
    {
      visible: true,
      size: 25,
      rows: [
        { visible: true, size: 20, type: 'D' },
        { visible: true, size: 30, type: 'E' },
        { visible: true, size: 50, type: 'F' }
      ]
    }
  ],
  disabled: false
};


@Component({
  selector: 'app-main',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: [`./main.component.scss`],
  templateUrl: `./main.component.html`
})
export class MainComponent implements OnInit {
  @ViewChild('map', { static: false }) map: MapComponent;
  localStorageName = 'angular-split-ws';
  config: IConfig = null;
  isSatelliteEnabled = true;

  geoLocations = [
    {
      lat: 39.75014056785246,
      lon: -105.00341771507102,
      symbol: {
        setSize: 18,
        setPath: 'M7.73,15.45C3.46,15.45,0,11.99,0,7.73S3.46,0,7.73,0s7.73,3.46,7.73,7.73S11.99,15.45,7.73,15.45z',
        setColor: {
          r: 223,
          g: 31,
          b: 31,
          a: 1
        }
      }
    },
    {
      lat: 39.750140604849726,
      lon: -105.00341763725261,
      symbol: {
        setSize: 18,
        setPath: 'M7.73,15.45C3.46,15.45,0,11.99,0,7.73S3.46,0,7.73,0s7.73,3.46,7.73,7.73S11.99,15.45,7.73,15.45z',
        setColor: {
          r: 223,
          g: 159,
          b: 31,
          a: 1
        }
      }
    },
    {
      lat: 39.75014062043745,
      lon: -105.00341760446608,
      symbol: {
        setSize: 18,
        setPath: 'M7.73,15.45C3.46,15.45,0,11.99,0,7.73S3.46,0,7.73,0s7.73,3.46,7.73,7.73S11.99,15.45,7.73,15.45z',
        setColor: {
          r: 159,
          g: 223,
          b: 31,
          a: 1
        }
      }
    },
    {
      lat: 39.75014062700487,
      lon: -105.00341759065246,
      symbol: {
        setSize: 18,
        setPath: 'M7.73,15.45C3.46,15.45,0,11.99,0,7.73S3.46,0,7.73,0s7.73,3.46,7.73,7.73S11.99,15.45,7.73,15.45z',
        setColor: {
          r: 31,
          g: 223,
          b: 31,
          a: 1
        }
      }
    },
    {
      lat: 39.75014062977183,
      lon: -105.00341758483253,
      symbol: {
        setSize: 18,
        setPath: 'M7.73,15.45C3.46,15.45,0,11.99,0,7.73S3.46,0,7.73,0s7.73,3.46,7.73,7.73S11.99,15.45,7.73,15.45z',
        setColor: {
          r: 31,
          g: 223,
          b: 159,
          a: 1
        }
      }
    },
    {
      lat: 39.75014063093758,
      lon: -105.00341758238055,
      symbol: {
        setSize: 18,
        setPath: 'M7.73,15.45C3.46,15.45,0,11.99,0,7.73S3.46,0,7.73,0s7.73,3.46,7.73,7.73S11.99,15.45,7.73,15.45z',
        setColor: {
          r: 31,
          g: 159,
          b: 223,
          a: 1
        }
      }
    },
    {
      lat: 39.7501406314287,
      lon: -105.00341758134755,
      symbol: {
        setSize: 18,
        setPath: 'M7.73,15.45C3.46,15.45,0,11.99,0,7.73S3.46,0,7.73,0s7.73,3.46,7.73,7.73S11.99,15.45,7.73,15.45z',
        setColor: {
          r: 31,
          g: 31,
          b: 223,
          a: 1
        }
      }
    },
    {
      lat: 39.75014063163559,
      lon: -105.0034175809124,
      symbol: {
        setSize: 18,
        setPath: 'M7.73,15.45C3.46,15.45,0,11.99,0,7.73S3.46,0,7.73,0s7.73,3.46,7.73,7.73S11.99,15.45,7.73,15.45z',
        setColor: {
          r: 159,
          g: 31,
          b: 223,
          a: 1
        }
      }
    },
    {
      lat: 39.75014063172272,
      lon: -105.00341758072912,
      symbol: {
        setSize: 18,
        setPath: 'M7.73,15.45C3.46,15.45,0,11.99,0,7.73S3.46,0,7.73,0s7.73,3.46,7.73,7.73S11.99,15.45,7.73,15.45z',
        setColor: {
          r: 223,
          g: 31,
          b: 159,
          a: 1
        }
      }
    }
  ];

  ngOnInit() {
    if (localStorage.getItem(this.localStorageName)) {
      this.config = JSON.parse(localStorage.getItem(this.localStorageName));
    } else {
      this.resetConfig();
    }
  }

  resetConfig() {
    this.config = cloneDeep(defaultConfig);

    localStorage.removeItem(this.localStorageName);
  }

  onDragEnd(columnIndex: number, e: { gutterNum: number, sizes: Array<number> }) {
    // Column dragged
    if (columnIndex === -1) {
      // Set size for all visible columns
      this.config.columns.filter(c => c.visible === true).forEach((column, index) => column.size = e.sizes[index]);
    } else {
      // Set size for all visible rows from specified column
      this.config.columns[columnIndex].rows.filter(r => r.visible === true).forEach((row, index) => row.size = e.sizes[index]);
    }

    this.saveLocalStorage();
  }

  toggleDisabled() {
    this.config.disabled = !this.config.disabled;

    this.saveLocalStorage();
  }

  refreshColumnVisibility() {
    // Refresh columns visibility based on inside rows visibilities (If no row > hide column)
    this.config.columns.forEach((column, index) => {
      column.visible = column.rows.some(row => row.visible === true);
    });

    this.saveLocalStorage();
  }

  saveLocalStorage() {
    localStorage.setItem(this.localStorageName, JSON.stringify(this.config));
  }

  onResize() {
  }
}
