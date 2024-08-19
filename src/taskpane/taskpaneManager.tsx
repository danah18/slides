/* global PowerPoint console */
import * as React from "react";
import { Font, TextRange, TextFrame, Shape, ShapeArray } from './Shape';
import HeroList, { HeroListItem } from "./components/HeroList";

const width = 150;
const height = 100;

// reading of the elements needs to happen in either capacity, it's just a matter of do we want to realtime edit the shapes (i think?) tbh i think element
// reading for both helps
export async function search(text: string) {
  try {
    await PowerPoint.run(async (context) => {
      const slide = context.presentation.getSelectedSlides().getItemAt(0);
      const shapes = slide.shapes;
      let x = text;

      // let listItems: HeroListItem[];

      // // Load all the shapes in the collection with loading their properties.
      // shapes.load("items/");
      // await context.sync();

      // if (text == "drug pricing table")
      // {
      //   listItems = [
      //     {
      //       icon: <img src={"../../../assets/drugpricing1.png"} alt="" style={{ width: `${width}px`, height: `${height}px`}}/>,
      //       primaryText: "",
      //     },
      //     {
      //       icon: <img src={"../../../assets/drugpricing2.png"} alt="" style={{ width: `${width}px`, height: `${height}px`}}/>,
      //       primaryText: "",
      //     },
      //     {
      //       icon: <img src={"../../../assets/drugpricing3.png"} alt="" style={{ width: `${width}px`, height: `${height}px`}}/>,
      //       primaryText: "",
      //     },
      //     {
      //       icon: <img src={"../../../assets/drugpricing4.png"} alt="" style={{ width: `${width}px`, height: `${height}px`}}/>,
      //       primaryText: "",
      //     },
      //   ];
      // }
      // else if (text == "row comparison")
      // {
      //   listItems = [
      //     {
      //       icon: <img src={"../../../assets/rowcomparison1.png"} alt="" style={{ width: `${width}px`, height: `${height}px`}}/>,
      //       primaryText: "",
      //     },
      //     {
      //       icon: <img src={"../../../assets/rowcomparison2.png"} alt="" style={{ width: `${width}px`, height: `${height}px`}}/>,
      //       primaryText: "",
      //     },
      //     {
      //       icon: <img src={"../../../assets/rowcomparison3.png"} alt="" style={{ width: `${width}px`, height: `${height}px`}}/>,
      //       primaryText: "",
      //     },
      //     {
      //       icon: <img src={"../../../assets/rowcomparison4.png"} alt="" style={{ width: `${width}px`, height: `${height}px`}}/>,
      //       primaryText: "",
      //     },
      //   ];
      // }
      // else if (text == "two chart comparison")
      // {
      //   listItems = [
      //     {
      //       icon: <img src={"../../../assets/twochart1.png"} alt="" style={{ width: `${width}px`, height: `${height}px`}}/>,
      //       primaryText: "",
      //     },
      //     {
      //       icon: <img src={"../../../assets/twochart2.png"} alt="" style={{ width: `${width}px`, height: `${height}px`}}/>,
      //       primaryText: "",
      //     },
      //   ];
      // }
      // else if (text == "column comparison")
      // {
      //   listItems = [
      //     {
      //       icon: <img src={"../../../assets/columncomparison1.png"} alt="" style={{ width: `${width}px`, height: `${height}px`}}/>,
      //       primaryText: "",
      //     },
      //     {
      //       icon: <img src={"../../../assets/columncomparison2.png"} alt="" style={{ width: `${width}px`, height: `${height}px`}}/>,
      //       primaryText: "",
      //     },
      //   ];
      // }

      // // If image is clicked add it to the slide

      // return listItems;
    });
  } catch (error) {
    console.log("Error: " + error);
  }
}
