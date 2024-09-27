import {
    Dropdown,
    makeStyles,
    Option,
    useId,
    DropdownProps,
    OptionOnSelectData,
  } from "@fluentui/react-components";
  import * as React from "react";
  import { TemplateCategory, TemplateDictionary } from "./TemplateConstants";
import { insertText } from "../taskpane";
import { outputToJson } from "../outputToJson";
import { Shape, ShapeArray } from "../Shape";
  
const useStyles = makeStyles({
  root: {
    // Stack the label above the field with a gap
    display: "grid",
    gridTemplateRows: "repeat(1fr)",
    //justifyItems: "center", 
    alignItems: "center",
    paddingTop: "20px",
    paddingLeft: "20px",
    paddingRight: "20px",
    maxWidth: "400px",
  },
});

export const TemplateDropdown = (props: Partial<DropdownProps>) => {
  const dropdownId = useId("dropdown-default");
  const options = [
    TemplateCategory.Executive,
    TemplateCategory.Assessment,
    TemplateCategory.Competitor,
    TemplateCategory.Trends,
    TemplateCategory.Roadmap,
    TemplateCategory.DetailedImplementation,
    TemplateCategory.Findings,
    TemplateCategory.Frameworks,
    TemplateCategory.Column,
    TemplateCategory.Line,
    TemplateCategory.Bubble,
    TemplateCategory.Pie,
  ];

  const styles = useStyles();
  
  // Function that handles the option selection
  const handleOptionSelect = (_event: React.SyntheticEvent, data: OptionOnSelectData) => {
    console.log("Selected option:", data.optionValue); // The selected value
    console.log(TemplateDictionary[data.optionValue]);

    const titleNameArray = data.optionValue.split(" ");
    const firstWord = titleNameArray[0].toLowerCase();

    // show corresponding hero list when option is selected

    // when button is clicked, show the slide info from the json

    // fetch(`/json/${firstWord}/execsumm1.json`)
    //     .then((response) => response.text())  // Load as string
    //     .then((data) => {
    //         console.log("Loading as string was fine");
    //         console.log(data);
    //     })
    //    .catch((error) => {
    //      console.error('Error loading the JSON file:', error);
    //    });
    
    let shapeArray: ShapeArray;

    fetch(`/json/${firstWord}/execsumm1.json`)
        .then((response) => response.json())  // Load as array
        .then((data) => {
          // Map JSON to class instances
          const userObjects = data.map((user: any) => new ShapeArray(user));
          //shapeArray = data;
          console.log("Loading as Shape was fine");
          console.log(userObjects);
        })
    .catch((error) => {
        console.error('Error loading the JSON file:', error);
    });


    //insertText();
    outputToJson();
  };

  return (
    <div className={styles.root}>
      <Dropdown
        aria-labelledby={dropdownId}
        placeholder="Templates"
        onOptionSelect={handleOptionSelect}
        {...props}
      >
        {options.map((option) => (
          <Option key={option}>
            {option}
          </Option>
        ))}
      </Dropdown>
    </div>
  );
};