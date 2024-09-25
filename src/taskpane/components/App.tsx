import * as React from "react";
import Header from "./Header";
import HeroList, { HeroListItem } from "./HeroList";
import TextInsertion from "./TextInsertion";
import { makeStyles } from "@fluentui/react-components";
import { Ribbon24Regular, LockOpen24Regular, DesignIdeas24Regular } from "@fluentui/react-icons";
import { insertText } from "../taskpane";
import { search } from "../taskpaneManager";
import { TemplateDropdown } from "./TemplateDropdown";

interface AppProps {
  title: string;
}

const useStyles = makeStyles({
  root: {
    minHeight: "100vh",
  },
});


const width = 150;
const height = 100;

const App: React.FC<AppProps> = () => {

  const styles = useStyles();
  // The list items are static and won't change at runtime,
  // so this should be an ordinary const, not a part of state.
  const listItems: HeroListItem[] = [
    {
      icon: <img src={"../../../assets/1.png"} alt="" style={{ width: `${width}px`, height: `${height}px`}}/>,
      primaryText: "",
    },
    {
      icon: <LockOpen24Regular />, //<img src={"../../../assets/logo-filled.png"} alt="" />,
      primaryText: "",
    },
    {
      icon: <DesignIdeas24Regular />,
      primaryText: "",
    },
  ];

  return (
    <div className={styles.root}>
      <TemplateDropdown/>
      <TextInsertion insertText={search} />
    </div>
  );
};

export default App;
