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
  setCategory: React.Dispatch<React.SetStateAction<string>>; 
}

// Merge DropdownProps with the custom props using an intersection
type CombinedProps = Partial<DropdownProps> & TemplateDropdownProps;

export const TemplateDropdown = (props: CombinedProps) => {
  const dropdownId = useId("dropdown-default");
  const options = [
    TemplateCategory.Executive,
    TemplateCategory.Assessment,
    TemplateCategory.Competitor,
    TemplateCategory.Process,
    TemplateCategory.Trends,
    // TemplateCategory.DetailedImplementation,
    // TemplateCategory.Frameworks,
    TemplateCategory.Column,
    TemplateCategory.Line,
    TemplateCategory.Bubble,
  ];

  const { heroList, setHeroList, setCategory, ...dropdownProps } = props;
  const styles = useStyles();
  
  // Function that handles the option selection
  const handleOptionSelect = (_event: React.SyntheticEvent, data: OptionOnSelectData) => {
    // The selected value is data.optionValue
    const titleNameArray = data.optionValue.split(" ");
    const category = titleNameArray[0].toLowerCase();
    setCategory(category);

    //insertText();    
    outputToJson();

    let width = 150;
    let height = 100;

    let listItems: HeroListItem[] = [];

    console.log(category);

    // TODO swap to the first word being the search title
    if (category == "executive")
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
    else if (category == "assessment")
    {
      listItems = [
        {
          icon: <img src={"../../../assets/assessment3.png"} alt="" style={{ width: `${width}px`, height: `${height}px`, paddingBottom: 5}}/>,
          primaryText: "",
        },
        {
          icon: <img src={"../../../assets/assessment1.png"} alt="" style={{ width: `${width}px`, height: `${height}px`, paddingBottom: 5}}/>,
          primaryText: "",
        },
        {
          icon: <img src={"../../../assets/assessment2.png"} alt="" style={{ width: `${width}px`, height: `${height}px`, paddingBottom: 5}}/>,
          primaryText: "",
        },
        {
          icon: <img src={"../../../assets/assessment0.png"} alt="" style={{ width: `${width}px`, height: `${height}px`, paddingBottom: 5}}/>,
          primaryText: "",
        },
      ];

      setHeroList(listItems);
    }
    else if (category == "competitor")
    {
      listItems = [
        {
          icon: <img src={"../../../assets/competitor0.png"} alt="" style={{ width: `${width}px`, height: `${height}px`, paddingBottom: 5}}/>,
          primaryText: "",
        },
        {
          icon: <img src={"../../../assets/competitor1.png"} alt="" style={{ width: `${width}px`, height: `${height}px`, paddingBottom: 5}}/>,
          primaryText: "",
        },
        {
          icon: <img src={"../../../assets/competitor2.png"} alt="" style={{ width: `${width}px`, height: `${height}px`, paddingBottom: 5}}/>,
          primaryText: "",
        },
        {
          icon: <img src={"../../../assets/competitor3.png"} alt="" style={{ width: `${width}px`, height: `${height}px`, paddingBottom: 5}}/>,
          primaryText: "",
        },
        {
          icon: <img src={"../../../assets/competitor4.png"} alt="" style={{ width: `${width}px`, height: `${height}px`, paddingBottom: 5}}/>,
          primaryText: "",
        },
        {
          icon: <img src={"../../../assets/competitor5.png"} alt="" style={{ width: `${width}px`, height: `${height}px`, paddingBottom: 5}}/>,
          primaryText: "",
        },
      ];

      setHeroList(listItems);
    }
    else if (category == "process")
    {
      listItems = [
        {
          icon: <img src={"../../../assets/process5.png"} alt="" style={{ width: `${width}px`, height: `${height}px`, paddingBottom: 5}}/>,
          primaryText: "",
        },
        {
          icon: <img src={"../../../assets/process1.png"} alt="" style={{ width: `${width}px`, height: `${height}px`, paddingBottom: 5}}/>,
          primaryText: "",
        },
        {
          icon: <img src={"../../../assets/process2.png"} alt="" style={{ width: `${width}px`, height: `${height}px`, paddingBottom: 5}}/>,
          primaryText: "",
        },
        {
          icon: <img src={"../../../assets/process0.png"} alt="" style={{ width: `${width}px`, height: `${height}px`, paddingBottom: 5}}/>,
          primaryText: "",
        },
        {
          icon: <img src={"../../../assets/process4.png"} alt="" style={{ width: `${width}px`, height: `${height}px`, paddingBottom: 5}}/>,
          primaryText: "",
        },
        {
          icon: <img src={"../../../assets/process3.png"} alt="" style={{ width: `${width}px`, height: `${height}px`, paddingBottom: 5}}/>,
          primaryText: "",
        },
      ];

      setHeroList(listItems);
    }
    else if (category == "main")
    {
      listItems = [
        {
          icon: <img src={"../../../assets/main0.png"} alt="" style={{ width: `${width}px`, height: `${height}px`, paddingBottom: 5}}/>,
          primaryText: "",
        },
        {
          icon: <img src={"../../../assets/main1.png"} alt="" style={{ width: `${width}px`, height: `${height}px`, paddingBottom: 5}}/>,
          primaryText: "",
        },
        {
          icon: <img src={"../../../assets/main2.png"} alt="" style={{ width: `${width}px`, height: `${height}px`, paddingBottom: 5}}/>,
          primaryText: "",
        },
        {
          icon: <img src={"../../../assets/main3.png"} alt="" style={{ width: `${width}px`, height: `${height}px`, paddingBottom: 5}}/>,
          primaryText: "",
        },
        {
          icon: <img src={"../../../assets/main4.png"} alt="" style={{ width: `${width}px`, height: `${height}px`, paddingBottom: 5}}/>,
          primaryText: "",
        },
        {
          icon: <img src={"../../../assets/main5.png"} alt="" style={{ width: `${width}px`, height: `${height}px`, paddingBottom: 5}}/>,
          primaryText: "",
        },
        {
          icon: <img src={"../../../assets/main6.png"} alt="" style={{ width: `${width}px`, height: `${height}px`, paddingBottom: 5}}/>,
          primaryText: "",
        },
      ];

      setHeroList(listItems);
    }
    else if (category == "column" || category == "line" || category == "bubble")
    {
      if (category == "bubble")
      {
        width = 160;
        height = 100;
      }

      for (let i = 0; i < 5; i++) {
        listItems.push({
          icon: <img src={`../../../assets/${category}${i}.png`} alt="" style={{ width: `${width}px`, height: `${height}px`, paddingBottom: 5}}/>,
          primaryText: "",
        },);
      }

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