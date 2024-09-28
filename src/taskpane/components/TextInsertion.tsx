import * as React from "react";
import { useState } from "react";
import { Button, Field, Textarea, tokens, makeStyles } from "@fluentui/react-components";
import HeroList, { HeroListItem } from "./HeroList";

const width = 150;
const height = 100;

interface TextInsertionProps {
  insertText: (text: string) => void;
  heroList: HeroListItem[];
  setHeroList: React.Dispatch<React.SetStateAction<HeroListItem[]>>; 
}

const useStyles = makeStyles({
  instructions: {
    fontWeight: tokens.fontWeightSemibold,
    marginTop: "20px",
    marginBottom: "10px",
  },
  textPromptAndInsertion: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  textAreaField: {
    marginLeft: "20px",
    marginTop: "30px",
    marginBottom: "20px",
    marginRight: "20px",
    maxWidth: "50%",
  },
});

const TextInsertion: React.FC<TextInsertionProps> = (props: TextInsertionProps) => {
  const [text, setText] = useState<string>("");
  //const [heroList, setHeroList] = useState<HeroListItem[]>([]);

  const handleTextInsertion = async () => {
    showSlides();
    await props.insertText(text);
  };

  const handleTextChange = async (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const showSlides = () => {
    let listItems: HeroListItem[];

    if (text.includes("cancer") || text.includes("Cancer") || text == "cancer drug" || text == "cancer drug pricing" || text == "cancer drug pricing presentations" || text == "cancer drug presentations")
    {
      console.log("$$$ text is ", text)
      listItems = [
        {
          icon: <img src={"../../../assets/drugpricing1.png"} alt="" style={{ width: `${width}px`, height: `${height}px`, paddingBottom: 5}}/>,
          primaryText: "",
        },
        {
          icon: <img src={"../../../assets/drugpricing2.png"} alt="" style={{ width: `${width}px`, height: `${height}px`}}/>,
          primaryText: "",
        },
        {
          icon: <img src={"../../../assets/drugpricing3.png"} alt="" style={{ width: `${width}px`, height: `${height}px`}}/>,
          primaryText: "",
        },
        {
          icon: <img src={"../../../assets/drugpricing4.png"} alt="" style={{ width: `${width}px`, height: `${height}px`}}/>,
          primaryText: "",
        },
      ];
    }
    else if (text.includes("Policy") || text.includes("policy") || text == "policy comparison" || text == "green rows")
    {
      console.log("$$$ text is ", text)
      listItems = [
        {
          icon: <img src={"../../../assets/rowcomparison1.png"} alt="" style={{ width: `${width}px`, height: `${height}px`}}/>,
          primaryText: "",
        },
        {
          icon: <img src={"../../../assets/rowcomparison2.png"} alt="" style={{ width: `${width}px`, height: `${height}px`}}/>,
          primaryText: "",
        },
        {
          icon: <img src={"../../../assets/rowcomparison3.png"} alt="" style={{ width: `${width}px`, height: `${height}px`}}/>,
          primaryText: "",
        },
        {
          icon: <img src={"../../../assets/rowcomparison4.png"} alt="" style={{ width: `${width}px`, height: `${height}px`}}/>,
          primaryText: "",
        },
      ];
    }
    else if (text == "insulin price comparison" || text == "insulin price" || text.includes("insulin") || text.includes("Insulin")) 
    {
      console.log("$$$ text is ", text)
      listItems = [
        {
          icon: <img src={"../../../assets/twochart1.png"} alt="" style={{ width: `${width}px`, height: `${height}px`}}/>,
          primaryText: "",
        },
        {
          icon: <img src={"../../../assets/twochart2.png"} alt="" style={{ width: `${width}px`, height: `${height}px`}}/>,
          primaryText: "",
        },
      ];
    }
    else if (text == "drug pricing table" || text.includes("drug pricing") || text.includes("Drug pricing"))    {
      console.log("$$$ text is ", text)
      listItems = [
        {
          icon: <img src={"../../../assets/policy1.png"} alt="" style={{ width: `${width}px`, height: `${height}px`}}/>,
          primaryText: "",
        },
        {
          icon: <img src={"../../../assets/policy2.png"} alt="" style={{ width: `${width}px`, height: `${height}px`}}/>,
          primaryText: "",
        },
        {
          icon: <img src={"../../../assets/policy3.png"} alt="" style={{ width: `${width}px`, height: `${height}px`}}/>,
          primaryText: "",
        },
      ];
    }
    else if (text == "column comparison" || text.includes("column") || text.includes("Column") || text.includes("columns") || text.includes("Columns"))
    {
      console.log("$$$ text is ", text)
      listItems = [
        {
          icon: <img src={"../../../assets/columncomparison1.png"} alt="" style={{ width: `${width}px`, height: `${height}px`}}/>,
          primaryText: "",
        },
        {
          icon: <img src={"../../../assets/columncomparison2.png"} alt="" style={{ width: `${width}px`, height: `${height}px`}}/>,
          primaryText: "",
        },
      ];
    }
    else
    {
      listItems = [];
    }
    
    props.setHeroList(listItems);
    console.log("$$$ hero list is ", props.heroList)
  }
  
  // function convertImageToBase64(file: File): Promise<string> {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  
  //     // Event listener for successful reading
  //     reader.onload = () => {
  //       resolve(reader.result as string);
  //     };
  
  //     // Event listener for errors
  //     reader.onerror = (error) => {
  //       reject(error);
  //     };
  
  //     // Start reading the file as a data URL (Base64)
  //     reader.readAsDataURL(file);
  //   });
  // }
  async function loadFileFromPath(url: string): Promise<string> {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to load file: ${response.statusText}`);
    }
    return await response.text();
  }

  // I bet we will want to move this elsewhere
  const handleApply = async () => {
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

      // Add the image to the slide
      //const image = newSlide.shapes.addImage(imageBase64);

      // Usage example
      // loadFileFromPath('../../../assets/columncomparison2.png')
      // .then((content) => {

      //   Office.context.document.setSelectedDataAsync(content);
      //   console.log(content)
      // })
      // .catch((error) => console.error('Error:', error));

      // Office.context.document.setSelectedDataAsync("../../../assets/columncomparison2.png");

      // Usage example
      //const base64String = convertImageToBase64("../../../assets/columncomparison2.png");

      //const base64String = await convertImageToBase64(fileInput.files[0]);
      //console.log(base64String);
      // Base64 encoded image string
      const base64String = ""; // Your base64 image data

      // Complete data URL with MIME type
      // const imageSrc = `data:image/png;base64,${base64String}`;

      // // Insert the image into the selected area
      // Office.context.document.setSelectedDataAsync(imageSrc, {
      //   coercionType: Office.CoercionType.Image
      // }, (asyncResult) => {
      //   if (asyncResult.status === Office.AsyncResultStatus.Succeeded) {
      //     console.log('Image inserted successfully');
      //   } else {
      //     console.error('Failed to insert image:', asyncResult.error.message);
      //   }
      // });

      // Set the position and size of the image
      // image.left = 50;
      // image.top = 50;
      // image.width = 400;
      // image.height = 300;

      // newSlide.shapes.addGeometricShape();

      // const slide = context.presentation.getSelectedSlides().getItemAt(0);
      // const shapes = slide.shapes;
      // let x = text;
    });
  };

  /* <Button appearance="primary" disabled={false} size="large" onClick={handleApply}>
        Apply
      </Button> */

  const styles = useStyles();

  return (
    <div className={styles.textPromptAndInsertion}>
      <Field className={styles.textAreaField} size="large">
        <Textarea size="large" value={text} onChange={handleTextChange} />
      </Field>
      <Field className={styles.instructions}></Field>
      <Button appearance="primary" disabled={false} size="large" onClick={handleTextInsertion}>
        Search
      </Button>
    </div>
  );
};

export default TextInsertion;
