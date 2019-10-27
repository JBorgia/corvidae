export class ArcgisSvgSymbolSettings {
    setPath: string; // must be an SVG path
    setStyle: 'circle' | 'square' | 'cross' | 'x' | 'kite';
    setColor: { r: number, g: number, b: number, a: number, }; // must be a css rgb/rgba value
    setSize?: number; // must be a number (will be calculated in 'px' by ArcGIS). 16px is default.
}
