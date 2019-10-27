import { ArcgisSvgSymbolSettings } from '@optek/xm-bootstrap';

export class MapPoint {
    id: string | number;
    name: string;
    lat: number;
    lon: number;
    owner: string;
    symbol: ArcgisSvgSymbolSettings;
    attributes?: Object;

    constructor() { }
}
