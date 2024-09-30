import * as React from "react";
import { tokens, makeStyles, Button } from "@fluentui/react-components";
import { showSlideContent } from "../showSlideContent";

export interface HeroListItem {
  icon: React.JSX.Element;
  primaryText: string;
}

export interface HeroListProps {
  message: string;
  items: HeroListItem[];
  category: string;
}

export interface SlideRange {
  slides: Slide[];
}

export interface Slide {
  id: number;
  title: string; 
  index: number;
}


const useStyles = makeStyles({
  list: {
    marginTop: "20px",
  },
  listItem: {
    paddingBottom: "20px",
    display: "flex",
  },
  icon: {
    marginRight: "10px",
  },
  itemText: {
    fontSize: tokens.fontSizeBase300,
    fontColor: tokens.colorNeutralBackgroundStatic,
  },
  welcome__main: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  message: {
    fontSize: tokens.fontSizeBase500,
    fontColor: tokens.colorNeutralBackgroundStatic,
    fontWeight: tokens.fontWeightRegular,
    paddingLeft: "10px",
    paddingRight: "10px",
  },
});

const function2 = async () => {

  let lastIndex = -1;

  // Get the selected slide
  Office.context.document.getSelectedDataAsync(Office.CoercionType.SlideRange, function (result) {
    if (result.status === Office.AsyncResultStatus.Succeeded) {
      const slideRange = result.value as SlideRange;

      slideRange.slides.forEach((slide) => {
        if (slide.index > lastIndex)
        {
          lastIndex = slide.index;
        }
      });
    } else {
      console.error("Error getting selected slide: ", result.error.message);
      lastIndex = 1;
    }
  });

  console.log(lastIndex);

  await PowerPoint.run(async (context) => {
    // Add a new slide to the end of the presentation
    context.presentation.slides.add();

    console.log("this was executed");
    // // this code below has issues
    // const totalPresentationLength = context.presentation.slides.getCount().value;

    // console.log(lastIndex);
    // console.log(totalPresentationLength);
    // if (lastIndex == totalPresentationLength)
    // {
    //   // Add a new slide to the end of the presentation
    //   context.presentation.slides.add();
    // }
    // else
    // {
    //   let currIndex = 0;

    //   // duplicate current slide
    //   // delete all content on current slide

    //   context.presentation.slides.getItemAt(currIndex);
    //}    
  });

  // If it is the last slide in the deck, add to last position in deck

  // If it is not the last slide in the deck, change the indices of the other slides

  // Office.context.document.addSlideAsync({ slideIndex: index }, function (result) {
  //   if (result.status === Office.AsyncResultStatus.Succeeded) {
  //     console.log(`New slide added at index ${index}!`);
  //   } else {
  //     console.error("Error adding slide:", result.error.message);
  //   }
  // });
   // Add a new blank slide at the end of the presentation
  //  Office.context.document.addSlideAsync(function (result) {
  //   if (result.status === Office.AsyncResultStatus.Succeeded) {
  //     console.log("New slide added successfully!");
  //   } else {
  //     console.error("Error adding new slide:", result.error.message);
  //   }
  // });
};

const displaySelectedSlide = (category: string, index: number) => {
  // add slide
  // get presentation length
  // get item at end of presentation
  // add info to that slide

  showSlideContent(category, index);

};

const HeroList: React.FC<HeroListProps> = (props: HeroListProps) => {
  const { items, message, category } = props;
  const styles = useStyles();
  
  const listItems = items.map((item, index) => (
      <li className={styles.listItem} key={index}>
        <Button onClick={() => displaySelectedSlide(category, index)}>
          <i className={styles.icon}>{item.icon}</i>
          <span className={styles.itemText}>{item.primaryText}</span>
        </Button>
      </li>    
  ));

  return (
    <div className={styles.welcome__main}>
      <h2 className={styles.message}>{message}</h2>
      <ul className={styles.list}>{listItems}</ul>
    </div>
  );
};

export default HeroList;
