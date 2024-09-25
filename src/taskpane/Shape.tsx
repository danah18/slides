// Define interfaces for nested properties
// if it's at all possible to convert the original JS object directly to JSON that would probably be the best
export interface Font {
    name: string; // name of the font
    size: number;
    color: string; // Hex value
    bold: boolean;
    underline: string;
    italic: boolean;
}

export interface TextRange {
    text: string;
    font: Font;
    paragraphFormat: PowerPoint.ParagraphFormat;
}

export interface TextFrame {
    textRange: TextRange;
    verticalAlignment: string;
    // there's a scalar properties array on the original JS object that could be interesting
}

export interface Shape {
    // propertyB: number, the heights and widths might be number property instead;
    height: number;
    width: number;
    left: number;
    top: number;
    id: string;
    name: string;
    textFrame: TextFrame;
    type: string;
    fill: PowerPoint.ShapeFill,
    lineFormat: PowerPoint.ShapeLineFormat,
}

// textBox.fill.setSolidColor("white");
// textBox.lineFormat.color = "black";
// textBox.lineFormat.weight = 1;
// textBox.lineFormat.dashStyle = PowerPoint.ShapeLineDashStyle.solid;

// -- TBH i don't think i need this class
// Define the main class
export class ShapeArray {
    shapes: Shape[];

    // Should see if there are alternative/better ways to construct this array
    constructor(shapes: Shape[]) {
        this.shapes = shapes;
    }
}
