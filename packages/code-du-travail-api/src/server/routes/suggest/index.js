const Router = require("koa-router");
const { SUGGESTIONS } = require("@cdt/data/indexing/esIndexName");

const API_BASE_URL = require("../v1.prefix");
const elasticsearchClient = require("../../conf/elasticsearch.js");
const { getSuggestQuery } = require("./suggest.elastic.js");

const ES_INDEX_PREFIX = process.env.ES_INDEX_PREFIX || "cdtn";
const index = `${ES_INDEX_PREFIX}_${SUGGESTIONS}`;

const router = new Router({ prefix: API_BASE_URL });

const minQueryLength = 2;
const suggestionsSize = 5;

/**
 * Return the search suggestion
 *
 * @example
 * http://localhost:1337/api/v1/suggest?q=aba
 *
 * @returns {Object} List of matching suggestions.
 */
router.get("/suggest", async ctx => {
  const { q = "", size = suggestionsSize } = ctx.request.query;

  if (q.length >= minQueryLength) {
    const body = getSuggestQuery(q, size);
    const response = await elasticsearchClient.search({
      index,
      body
    });
    ctx.body = response.body.hits.hits.map(t => t._source.title);
  } else {
    ctx.body = [];
  }
});

module.exports = router;
