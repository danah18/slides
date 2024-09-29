/* global PowerPoint console */
import { Font, TextRange, TextFrame, Shape, ShapeArray } from './Shape';

async function createAndSaveFile(json:string) {
    const options = {
      types: [
        {
          description: "Text Files",
          accept: {
            'text/plain': ['.txt'],
          },
        },
      ],
    };
    console.log("here 1");
    const fileHandle = await (window as any).showSaveFilePicker(options);
    console.log("here 2");
    const writable = await fileHandle.createWritable();
    console.log("here 3");
    await writable.write(json);
    console.log("here 4");
    await writable.close();
  }

// NOTE: using indexeddb is a strong backup option

export async function outputToJson() {
  try {
    await PowerPoint.run(async (context) => {
      const slide = context.presentation.getSelectedSlides().getItemAt(0);
      const shapes = slide.shapes;

      // Load all the shapes in the collection with loading their properties.
      shapes.load("items/");
      await context.sync();

      let shapeArray: Shape[] = [];
      console.log("shapeArray = " + shapeArray);
      let shapeInterface: Shape;

      // k so there's a type to be distinguished here
      try
      {
        for (let i = 0; i < shapes.items.length; i++) {
          const shape = shapes.items[i];
          const type = shape.type;
  
          if (type == "GeometricShape")
          {
            console.log("Geometric shape found");
            shape.load("textFrame");
            await context.sync();
      
            shape.textFrame.textRange.load("text");
            shape.textFrame.textRange.load("font");
            await context.sync();
      
            const fontObj = shape.textFrame.textRange.font;

            if (fontObj.size == 0)
            {
              fontObj.size = 11;
            }

            shape.textFrame.textRange.load("paragraphFormat");
            await context.sync();

            shape.textFrame.textRange.paragraphFormat.bulletFormat.load("visible");
            await context.sync();

            // seems like we can use the Powerpoint classes themselves, since it's just an array we are storing them in
            const font: Font = {
              name: fontObj.name,
              size: fontObj.size,
              color: fontObj.color,
              bold: fontObj.bold,
              underline: fontObj.underline,
              italic: fontObj.italic,
            };

            const textRange: TextRange = {
              text: shape.textFrame.textRange.text, 
              font: font,
              paragraphFormat: {
                bulletFormat: {
                    visible: shape.textFrame.textRange.paragraphFormat.bulletFormat.visible,
                    load: null,
                    toJSON: null,
                    isNullObject: null,
                    context: null,
                },
                horizontalAlignment: shape.textFrame.textRange.paragraphFormat.horizontalAlignment,
                load: null,
                toJSON: null,
                isNullObject: null,
                context: null,
              },
            };
      
            const textFrame: TextFrame = {
              textRange: textRange,
              verticalAlignment: shape.textFrame.verticalAlignment,
            };

          shape.fill.load("foregroundColor");
          shape.lineFormat.load("color");
          shape.lineFormat.load("weight");
          shape.lineFormat.load("dashStyle");

          await context.sync();

          // add in shapeFill accordingly
          // fill in lineFormat accordingly

          console.log(
            {
                color: shape.lineFormat.color,
                weight: shape.lineFormat.weight,
                dashStyle: shape.lineFormat.dashStyle,
                context: null,
                style: null,
                transparency: null,
                visible: null,
                load: null,
                toJSON: null,
                isNullObject: null,
              }
          );

          shapeInterface = {
              height: shape.height,
              width: shape.width,
              left: shape.left,
              top: shape.top,
              id: shape.id,
              name: shape.name,
              textFrame: textFrame,
              type: type,
              fill: {
                foregroundColor: shape.fill.foregroundColor,
                transparency: null,
                type: null,
                load: null,
                toJSON: null,
                isNullObject: null,
                setSolidColor: null,
                context: null,
                clear: null,
              },
              lineFormat: {
                color: shape.lineFormat.color,
                weight: shape.lineFormat.weight,
                dashStyle: shape.lineFormat.dashStyle,
                context: null,
                style: null,
                transparency: null,
                visible: null,
                load: null,
                toJSON: null,
                isNullObject: null,
              }
            };

        //    fill: shape.fill.foregroundColor,  // Use foregroundColor after sync
 
            shapeArray.push(shapeInterface); 
          }

          else if (type == "Line")
          {
            console.log("Line found");

            shape.fill.load("foregroundColor");
            shape.lineFormat.load("color");
            shape.lineFormat.load("weight");
            shape.lineFormat.load("dashStyle");

            await context.sync();

            shapeInterface = {
              height: shape.height,
              width: shape.width,
              left: shape.left,
              top: shape.top,
              id: shape.id,
              name: shape.name,
              textFrame: null,
              type: type,
              fill: shape.fill,
              lineFormat: {
                color: shape.lineFormat.color,
                weight: shape.lineFormat.weight,
                dashStyle: shape.lineFormat.dashStyle,
                context: null,
                style: null,
                transparency: null,
                visible: null,
                load: null,
                toJSON: null,
                isNullObject: null,
              }
            };
            shapeArray.push(shapeInterface);
          }
          else if (type == "Table")
          {
            console.log("Table found");
          }
          else if (type == "Image")
          {
            console.log("Image found");
          }
          else if (type == "Group")
          {
            console.log("Group found");
          }
          else if (type == "Unsupported")
          {
            console.log("Unsupported found");
          }
          else
          {
            console.log("Other found");
          }
        }

        let json = JSON.stringify(shapeArray);
        console.log(json);
      }
      catch (e)
      {
        console.log(e);
      }
    });
  } catch (error) {
    console.log("Error: " + error);
  }
}
