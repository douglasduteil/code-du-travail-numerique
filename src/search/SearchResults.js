import React from "react";
import { withRouter } from "next/router";

import { Section, Alert } from "@socialgouv/code-du-travail-ui";

import FeedbackForm from "../common/FeedbackForm.js";
import SeeAlso from "../common/SeeAlso";
import { Link } from "../../routes";
import DecisionTree from "../lib/decision/DecisionTree";

import { getLabelBySource, getRouteBySource } from "../sources";

const ContentBody = ({ _source, excerpt, footer = null }) => (
  <article className={_source.source}>
    <header>
      <h3>{_source.title}</h3>
    </header>
    <blockquote
      className="text-quote"
      dangerouslySetInnerHTML={{ __html: excerpt }}
    />
    <footer>
      <span className="external-link__before">{footer}</span>
    </footer>
  </article>
);

const makeExcerpt = highlight => {
  if (highlight && Object.keys(highlight).length) {
    let firstHighlightObjectKeyName = Object.keys(highlight)[0];
    // Use the first `n` available highlights as excerpt.
    const numExcerpts = 3;
    return highlight[firstHighlightObjectKeyName]
      .slice(0, numExcerpts)
      .join(" … ");
  }
  return "";
};

const ResultItem = withRouter(({ _id, _source, highlight, router }) => {
  const excerpt = makeExcerpt(highlight);

  const route = getRouteBySource(_source.source);

  // internal links
  if (route) {
    return (
      <li className="search-results__item">
        <Link
          route={route}
          params={{ slug: _source.slug, q: router.query.q, search: 0 }}
        >
          <a className="search-results-link">
            <ContentBody
              _source={_source}
              excerpt={excerpt}
              footer={getLabelBySource(_source.source)}
            />
          </a>
        </Link>
      </li>
    );
  }

  // external urls
  return (
    <li className="search-results__item">
      <a
        href={_source.url}
        target="_blank"
        rel="noopener noreferrer"
        className="search-results-link"
      >
        <ContentBody
          _source={_source}
          excerpt={excerpt}
          footer={getLabelBySource(_source.source)}
        />
      </a>
    </li>
  );
});

const Results = ({ results }) => (
  <div className="search-results">
    <ul className="search-results__list">
      {results.map(result => (
        <ResultItem key={result._source.slug} {...result} />
      ))}
    </ul>
  </div>
);

class SearchResults extends React.Component {
  render() {
    let data = this.props.data;
    let query = this.props.query;
    // No results.
    if (!data || !data.hits || !data.hits.total) {
      return (
        <React.Fragment>
          <Section light>
            <Alert category="primary">
              Nous n’avons pas trouvé de résultat pour votre recherche.
            </Alert>
          </Section>
          <FeedbackForm query={query} />
        </React.Fragment>
      );
    }

    // hardcode which result can be filterable.
    const filterableResults = data.hits.hits.filter(
      hit => ["idcc", "faq"].indexOf(hit._source.source) > -1
    );

    if (filterableResults.length > 1) {
      return (
        <DecisionTree
          data={filterableResults}
          filters={{}}
          render={({ results }) => {
            return (
              <Section light>
                <Results results={results.map(r => ({ _source: r }))} />
              </Section>
            );
          }}
        />
      );
    }

    return (
      <React.Fragment>
        <Section light>
          <Results results={data.hits.hits} />
        </Section>
        <SeeAlso />
        <FeedbackForm query={query} />
      </React.Fragment>
    );
  }
}

export default SearchResults;
