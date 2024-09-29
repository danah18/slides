/* global PowerPoint console */
import { Font, TextRange, TextFrame, Shape, ShapeArray } from './Shape';

const loadJson = async (index: number) => {
    try {
        let firstWord = "executive";

        // Await the fetch call and JSON response
        const response = await fetch(`/json/${firstWord}/execsumm${index}.json`);
        const data = await response.json();
    
        // Create the ShapeArray object after data is available
        const shapeArrayParent = new ShapeArray(data);
    
        // Now you can safely access shapeArray
        const shapeArray = shapeArrayParent.shapes;
    
        // Do something with shapeArray (e.g., log it, update state, etc.)
        console.log(shapeArray);

        return shapeArray;
    
      } catch (error) {
        console.error('Error loading the JSON file:', error);
        return [];
      }
}

const isNotEmpty = (obj : Object) => {
    return (obj && Object.keys(obj).length > 0 )
}

export async function showSlideContent(index: number) {
    await PowerPoint.run(async (context) => {
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

        let shapeArray = await loadJson(index);

        for (let i = 0; i < shapeArray.length; i++) {
        // A more effective way to fill in this data is definitely needed
            if (shapeArray[i].type == "GeometricShape")
            {
                let currentShape = shapeArray[i];
                let text = shapeArray[i].textFrame.textRange.text;
                const textBox = newSlide.shapes.addTextBox(text);

                await context.sync();

                // PowerPoint.GeometricShapeType
                textBox.height = shapeArray[i].height;
                textBox.width = shapeArray[i].width;
                textBox.left = shapeArray[i].left;
                textBox.top = shapeArray[i].top;
                textBox.name = shapeArray[i].name;

                await context.sync();

                // TODO there may be an asynchronous error
                if (isNotEmpty(shapeArray[i].fill))
                {
                    let foregroundColor = shapeArray[i].fill.foregroundColor;
                    if (foregroundColor !== "")
                    {
                        textBox.fill.setSolidColor(shapeArray[i].fill.foregroundColor);
                    }
                }

                if (isNotEmpty(shapeArray[i].lineFormat))
                {
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
                }

                textBox.textFrame.textRange.font.name = shapeArray[i].textFrame.textRange.font.name;
                textBox.textFrame.textRange.font.size = shapeArray[i].textFrame.textRange.font.size;
                textBox.textFrame.textRange.font.color = shapeArray[i].textFrame.textRange.font.color;
                textBox.textFrame.textRange.font.bold = shapeArray[i].textFrame.textRange.font.bold;
                //shape.textFrame.textRange.font.underline = shapeArray[i].textFrame.textRange.font.underline;
                textBox.textFrame.textRange.font.italic = shapeArray[i].textFrame.textRange.font.italic;
                textBox.textFrame.verticalAlignment = shapeArray[i].textFrame.verticalAlignment as PowerPoint.TextVerticalAlignment;            

                //textBox.textFrame.autoSizeSetting = "AutoSizeTextToFitShape";

                // TODO can probably move the context syncs into the if check
                await context.sync();

                if (isNotEmpty(shapeArray[i].textFrame.textRange.paragraphFormat))
                {
                    textBox.textFrame.textRange.paragraphFormat.horizontalAlignment = shapeArray[i].textFrame.textRange.paragraphFormat.horizontalAlignment;
                    textBox.textFrame.textRange.paragraphFormat.bulletFormat.visible = shapeArray[i].textFrame.textRange.paragraphFormat.bulletFormat.visible;
                }
                
                newSlide.shapes.items.push();
                console.log("new shape items pushed #####");

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

                await context.sync();

                if (isNotEmpty(line.lineFormat))
                {
                    line.lineFormat.color = shapeArray[i].lineFormat.color;
                    line.lineFormat.weight = shapeArray[i].lineFormat.weight;
                    line.lineFormat.dashStyle = shapeArray[i].lineFormat.dashStyle;
                }
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
}
