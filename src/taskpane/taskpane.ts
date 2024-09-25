/* global PowerPoint console */
import { Font, TextRange, TextFrame, Shape, ShapeArray } from './Shape';

// reading of the elements needs to happen in either capacity, it's just a matter of do we want to realtime edit the shapes (i think?) tbh i think element
// reading for both helps
export async function insertText() {
  try {
    await PowerPoint.run(async (context) => {
      const slide = context.presentation.getSelectedSlides().getItemAt(0);
      const shapes = slide.shapes;

      // // Load all the shapes in the collection without loading their properties.
      // shapes.load("items/$none");

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
              paragraphFormat: shape.textFrame.textRange.paragraphFormat,
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

          shapeInterface = {
              height: shape.height,
              width: shape.width,
              left: shape.left,
              top: shape.top,
              id: shape.id,
              name: shape.name,
              textFrame: textFrame,
              type: type,
              fill: shape.fill,
              lineFormat: shape.lineFormat,
            };

            if (shape.textFrame.textRange.text.includes("Fit"))
            {
              let vert = shape;
            }

            if (shape.textFrame.textRange.text.includes("Eco"))
            {
              let filll = shape.fill;
              let formatt = shape.lineFormat;
            }

            console.log(`font size for {${shapeInterface.textFrame.textRange.text}} is " + ${shapeInterface.textFrame.textRange.font.size}`);

            shapeArray.push(shapeInterface); 
          }
          else if (type == "Line")
          {
            console.log("Line found");

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
              lineFormat: shape.lineFormat,
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
    
          // const shapeInterface: Shape = {
          //   height: shape.height,
          //   width: shape.width,
          //   left: shape.left,
          //   top: shape.top,
          //   id: shape.id,
          //   name: shape.name,
          //   textFrame: textFrame,
          //   // fill: shape.fill,
          //   // lineFormat: shape.lineFormat;
          // };
    
          // missing and needs to be added in
          //        shapeArray.push(shapeInterface); 
  
          // -- these are the important lines of code for adding in new content 
          // shape.textFrame.textRange.text = "overwrote the text properly";
          // shape.textFrame.autoSizeSetting = "AutoSizeTextToFitShape";
        }
      }
      catch (e)
      {
        console.log(e);
      }
     
      // Add a new slide to the presentation
      context.presentation.slides.add();
      await context.sync();

      // this is the more correct way to do it but is throwing an annoying bug rn
      // const numSlides = context.presentation.slides.getCount().value;
      // const newSlide = context.presentation.slides.getItemAt(numSlides - 1);

      const newSlide = context.presentation.slides.getItemAt(1);
      
      // Load the new slide and sync the context
      newSlide.load("shapes");
      await context.sync();

      const newSlideDefaultShapes = newSlide.shapes;

      // Load all the shapes in the collection without loading their properties.
      newSlideDefaultShapes.load("items/$none");

      // Load all the shapes in the collection with loading their properties.
      // shapes.load("items/");
      await context.sync();

      try
      {
        // Remove default shapes
        for (let i = 0; i < newSlideDefaultShapes.items.length; i++) {
          let currentShape = newSlideDefaultShapes.items[i];
          currentShape.delete();
        }
      }
      catch
      {

      }

      for (let i = 0; i < shapeArray.length; i++) {
        // A more effective way to fill in this data is definitely needed
        if (shapeArray[i].type == "GeometricShape")
        {
          let currentShape = shapeArray[i];
          let text = shapeArray[i].textFrame.textRange.text;
          const textBox = newSlide.shapes.addTextBox(text);

          // textBox.textFrame.textRange.font.load("size");

          // if (textBox.textFrame.textRange.font.size == 0)
          // {
          //   textBox.textFrame.textRange.font.size = 14;
          // }

          // this should be read in, not auto assigned
          //textBox.fill.setSolidColor("white");
          //textBox.lineFormat.color = "black";
          //textBox.lineFormat.weight = 1;
          //textBox.lineFormat.dashStyle = PowerPoint.ShapeLineDashStyle.solid;

          await context.sync();

          // PowerPoint.GeometricShapeType
          textBox.height = shapeArray[i].height;
          textBox.width = shapeArray[i].width;
          textBox.left = shapeArray[i].left;
          textBox.top = shapeArray[i].top;
          textBox.name = shapeArray[i].name;

          // since rotation on textbox is not accessible, will just have to have easily accessible rotate buttons (or assume ppl know how to use the autoformatting tools)

          // I wish there was a load all...
          // property names field array should be useful for this
          shapeArray[i].fill.load("foregroundColor");
          shapeArray[i].lineFormat.load("color");
          shapeArray[i].lineFormat.load("weight");
          shapeArray[i].lineFormat.load("dashStyle");

          await context.sync();

          let foregroundColor = shapeArray[i].fill.foregroundColor;

          if (foregroundColor !== "")
          {
            textBox.fill.setSolidColor(shapeArray[i].fill.foregroundColor);
          }

          if (shapeArray[i].textFrame.textRange.text.includes("Eco"))
          {
            let fill = shapeArray[i].fill.foregroundColor;
            let line = shapeArray[i].lineFormat.color;
          }

          if (shapeArray[i].lineFormat.color !== "")
          {
            textBox.lineFormat.color = shapeArray[i].lineFormat.color;
          }

          if (shapeArray[i].lineFormat.weight !== -1)
          {
            textBox.lineFormat.weight = shapeArray[i].lineFormat.weight;
          }

          // // There's a bug with dash style happening
          // console.log(shapeArray[i].lineFormat.dashStyle);
          //textBox.lineFormat.dashStyle = shapeArray[i].lineFormat.dashStyle;

          let value = textBox.textFrame.textRange.paragraphFormat;

          textBox.textFrame.textRange.font.name = shapeArray[i].textFrame.textRange.font.name;
          textBox.textFrame.textRange.font.size = shapeArray[i].textFrame.textRange.font.size;
          textBox.textFrame.textRange.font.color = shapeArray[i].textFrame.textRange.font.color;
          textBox.textFrame.textRange.font.bold = shapeArray[i].textFrame.textRange.font.bold;
          //shape.textFrame.textRange.font.underline = shapeArray[i].textFrame.textRange.font.underline;
          textBox.textFrame.textRange.font.italic = shapeArray[i].textFrame.textRange.font.italic;
          textBox.textFrame.verticalAlignment = shapeArray[i].textFrame.verticalAlignment as PowerPoint.TextVerticalAlignment;
          
          //textBox.textFrame.autoSizeSetting = "AutoSizeTextToFitShape";

          shapeArray[i].textFrame.textRange.paragraphFormat.bulletFormat.load("visible");
          await context.sync();

          textBox.textFrame.textRange.paragraphFormat.horizontalAlignment = shapeArray[i].textFrame.textRange.paragraphFormat.horizontalAlignment;
          textBox.textFrame.textRange.paragraphFormat.bulletFormat.visible = shapeArray[i].textFrame.textRange.paragraphFormat.bulletFormat.visible;
        }
        else if (shapeArray[i].type == "Line")
        {
          console.log("Line found");

          let currentShape = shapeArray[i];
          const line = newSlide.shapes.addLine();

          await context.sync();

          // PowerPoint.GeometricShapeType
          line.width = shapeArray[i].width;
          line.height = shapeArray[i].height;
          line.left = shapeArray[i].left;
          line.top = shapeArray[i].top;
          line.name = shapeArray[i].name;

          shapeArray[i].lineFormat.load("color");
          shapeArray[i].lineFormat.load("weight");
          shapeArray[i].lineFormat.load("dashStyle");

          await context.sync();

          line.lineFormat.color = shapeArray[i].lineFormat.color;
          line.lineFormat.weight = shapeArray[i].lineFormat.weight;
          line.lineFormat.dashStyle = shapeArray[i].lineFormat.dashStyle;
        }
        else if (shapeArray[i].type == "Table")
        {
          console.log("Table found");
        }
        else if (shapeArray[i].type == "Image")
        {
          console.log("Image found");
        }
        else if (shapeArray[i].type == "Group")
        {
          console.log("Group found");
        }
        else if (shapeArray[i].type == "Unsupported")
        {
          console.log("Unsupported found");
        }
        else
        {
          console.log("Other found");
        }
      
        newSlide.shapes.items.push();
      }

    });
  } catch (error) {
    console.log("Error: " + error);
  }
}
