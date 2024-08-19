/* global PowerPoint console */
import { Font, TextRange, TextFrame, Shape, ShapeArray } from './Shape';

// reading of the elements needs to happen in either capacity, it's just a matter of do we want to realtime edit the shapes (i think?) tbh i think element
// reading for both helps
export async function search(text: string) {
  try {
    await PowerPoint.run(async (context) => {
      const slide = context.presentation.getSelectedSlides().getItemAt(0);
      const shapes = slide.shapes;

      // Load all the shapes in the collection with loading their properties.
      shapes.load("items/");
      await context.sync();

      if (text == "drug pricing table")
      {
        const textBox = slide.shapes.addTextBox("ay macarena");
        textBox.fill.setSolidColor("white");
        textBox.lineFormat.color = "black";
        textBox.lineFormat.weight = 1;
        textBox.lineFormat.dashStyle = PowerPoint.ShapeLineDashStyle.solid;
        await context.sync();

        // Add a new slide to the presentation
        context.presentation.slides.add();
        await context.sync();


        const newSlide = context.presentation.slides.getItemAt(1);
        
        // Load the new slide and sync the context
        newSlide.load("shapes");
        await context.sync();

        newSlide.shapes.addTextBox("ay macarena");
      }
      else
      {
        const textBox = slide.shapes.addTextBox("rigatoni");
        textBox.fill.setSolidColor("white");
        textBox.lineFormat.color = "black";
        textBox.lineFormat.weight = 1;
        textBox.lineFormat.dashStyle = PowerPoint.ShapeLineDashStyle.solid;
        await context.sync();

        // Add a new slide to the presentation
        context.presentation.slides.add();
        await context.sync();
      }

      // this is the more correct way to do it but is throwing an annoying bug rn
      // const numSlides = context.presentation.slides.getCount().value;
      // const newSlide = context.presentation.slides.getItemAt(numSlides - 1);

    });
  } catch (error) {
    console.log("Error: " + error);
  }
}
