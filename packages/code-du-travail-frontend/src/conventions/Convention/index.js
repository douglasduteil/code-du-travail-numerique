import React, { useEffect } from "react";

import { useLocalStorage } from "../../lib/useLocalStorage";
import { Articles } from "./Articles";
import { TextSearch } from "./TextSearch";
import { Contributions } from "./Contributions";

const Convention = ({ convention }) => {
  const [, setCcInfo] = useLocalStorage("convention", {});

  useEffect(() => {
    const { slug, id, num, title, shortTitle } = convention;
    setCcInfo({ convention: { id, slug, title, shortTitle, num } });
  }, [convention, setCcInfo]);

  return (
    <>
      {convention.answers.length > 0 && (
        <Contributions contributions={convention.answers} />
      )}
      {convention.articlesByTheme.length > 0 && (
        <Articles
          blocs={convention.articlesByTheme}
          containerId={convention.id}
        />
      )}
      <TextSearch containerId={convention.id} />
    </>
  );
};

export default Convention;
