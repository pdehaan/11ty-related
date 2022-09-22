const { EleventyRenderPlugin } = require("@11ty/eleventy");

/**
 * @typedef {import('@11ty/eleventy/src/UserConfig')} EleventyConfig
 * @typedef {ReturnType<import('@11ty/eleventy/src/defaultConfig')>} EleventyReturnValue
 * @type {(eleventyConfig: EleventyConfig) => EleventyReturnValue}
 */
module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(EleventyRenderPlugin);

  eleventyConfig.addNunjucksAsyncShortcode("related", async function (coll=[], requiredTags=[], pageUrl="") {
    const items = coll.filter(page => page.url !== pageUrl && requiredTags.every(tag => page.data.tags.includes(tag)));
    // Render a Nunjucks template from JavaScript? Why not!
    const { renderFile } = eleventyConfig.javascriptFunctions;
    const data = {
      items,
      count: items.length,
      tags: requiredTags,
    };
    return renderFile("./src/_includes/related.njk", data);
  });

  eleventyConfig.addFilter("filter_arr", function (arr=[], ...ignore) {
    return arr.filter(item => !ignore.flat().includes(item));
  });

  eleventyConfig.setQuietMode(true);

  return {
    dir: {
      input: "src",
      output: "www",
    }
  };
};
