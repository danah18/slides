import * as React from "react";
import Header from "./Header";
import HeroList, { HeroListItem } from "./HeroList";
import TextInsertion from "./TextInsertion";
import { makeStyles } from "@fluentui/react-components";
import { Ribbon24Regular, LockOpen24Regular, DesignIdeas24Regular } from "@fluentui/react-icons";
import { insertText } from "../taskpane";
import { search } from "../taskpaneManager";

interface AppProps {
  title: string;
}

const useStyles = makeStyles({
  root: {
    minHeight: "100vh",
  },
});

const App: React.FC<AppProps> = () => {

  const styles = useStyles();
  // The list items are static and won't change at runtime,
  // so this should be an ordinary const, not a part of state.
  const listItems: HeroListItem[] = [
    {
      // ../../../assets/templates/columncomparison/1.png
      icon: <img src={"../../../assets/1.png"} alt="" />, //<Ribbon24Regular />,
      primaryText: "",
    },
    {
      icon: <LockOpen24Regular />, //<img src={"../../../assets/logo-filled.png"} alt="" />, //<LockOpen24Regular />,
      primaryText: "",
    },
    {
      icon: <DesignIdeas24Regular />,
      primaryText: "",
    },
  ];

  return (
    <div className={styles.root}>
      <TextInsertion insertText={search} />
      <HeroList message="" items={listItems} />
    </div>
  );
};

export default App;
