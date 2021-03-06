const path = require("path");
const mount = require("koa-mount");
const send = require("koa-send");
const API_BASE_URL = require("./v1.prefix");

// HACK(douglasduteil): force use of native node require.resolve function
// As the API code pass by ncc (webpack), require is replaced by
// __webpack_modules__, to avoid this I eval the expression.
// see https://github.com/webpack/webpack/issues/1554#issuecomment-336462319
const courrierTypeModulePath = eval(
  "require.resolve('@cdt/data...courrier-type')"
);
const DOCS_DIR = path.join(path.dirname(courrierTypeModulePath), "docx");

//

module.exports = mount(`${API_BASE_URL}/docs`, async ctx => {
  const [filename, extension] = ctx.path.slice(1).split(/\.([a-z]{2,4})$/);
  const date = new Date();
  const dod = `${`0${date.getDate()}`.slice(
    -2
  )}-${date.getMonth() + 1}-${date.getFullYear()}`;
  ctx.attachment(`${filename}-${dod}.${extension}`);
  await send(ctx, ctx.path, { root: DOCS_DIR });
});
