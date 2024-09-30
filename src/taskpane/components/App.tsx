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
  
  const [heroList, setHeroList] = React.useState<HeroListItem[]>([]);
  const [category, setCategory] = React.useState<string>();

  // TODO: remove HeroList.props.message as it's unused
  return (
    <div className={styles.root}>
      <TemplateDropdown heroList={heroList} setHeroList={setHeroList} setCategory={setCategory}/>
      <TextInsertion insertText={search} heroList={heroList} setHeroList={setHeroList}/>
      <HeroList category={category} message="" items={heroList} />
    </div>
  );
};

export default App;
