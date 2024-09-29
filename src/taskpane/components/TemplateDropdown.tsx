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
import { HeroListItem } from "./HeroList";
  
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

// Define custom props you want to add
interface TemplateDropdownProps {
  heroList: HeroListItem[];
  setHeroList: React.Dispatch<React.SetStateAction<HeroListItem[]>>; 
}

// Merge DropdownProps with the custom props using an intersection
type CombinedProps = Partial<DropdownProps> & TemplateDropdownProps;

export const TemplateDropdown = (props: CombinedProps) => {
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

  const { heroList, setHeroList, ...dropdownProps } = props;

  const styles = useStyles();
  
  // Function that handles the option selection
  const handleOptionSelect = (_event: React.SyntheticEvent, data: OptionOnSelectData) => {
    console.log("Selected option:", data.optionValue); // The selected value
    console.log(TemplateDictionary[data.optionValue]);

    const titleNameArray = data.optionValue.split(" ");
    const firstWord = titleNameArray[0].toLowerCase();

    //insertText();    
    outputToJson();

    const width = 150;
    const height = 100;

    let listItems;

    console.log(firstWord);

    // TODO swap to the first word being the search title
    if (firstWord == "executive")
    {
      listItems = [
        {
          icon: <img src={"../../../assets/executive0.png"} alt="" style={{ width: `${width}px`, height: `${height}px`, paddingBottom: 5}}/>,
          primaryText: "",
        },
        {
          icon: <img src={"../../../assets/executive1.png"} alt="" style={{ width: `${width}px`, height: `${height}px`, paddingBottom: 5}}/>,
          primaryText: "",
        },
        {
          icon: <img src={"../../../assets/executive2.png"} alt="" style={{ width: `${width}px`, height: `${height}px`, paddingBottom: 5}}/>,
          primaryText: "",
        },
        {
          icon: <img src={"../../../assets/executive3.png"} alt="" style={{ width: `${width}px`, height: `${height}px`, paddingBottom: 5}}/>,
          primaryText: "",
        },
      ];

      setHeroList(listItems);
    }
    else
    {
      const emptyList: HeroListItem[] = [];
      setHeroList(emptyList);
    }
  };

  return (
    <div className={styles.root}>
      <Dropdown
        aria-labelledby={dropdownId}
        placeholder="Templates"
        onOptionSelect={handleOptionSelect}
        {...dropdownProps}
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