import {
    Dropdown,
    makeStyles,
    Option,
    shorthands,
    useId,
    DropdownProps,
    OptionOnSelectData,
  } from "@fluentui/react-components";
  import * as React from "react";
  import { TemplateCategory, TemplateDictionary } from "./TemplateConstants";
import { insertText } from "../taskpane";
  
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
    TemplateCategory.Title,
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
    insertText();
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