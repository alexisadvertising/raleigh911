const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/files");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addFilter("num", n => Number(n).toLocaleString("en-US"));
  eleventyConfig.addFilter("tel", s => { const d = String(s).replace(/\D/g, ""); return d.length <= 4 ? d : "+1" + d.replace(/^1/, ""); });
  eleventyConfig.addFilter("longdate", d => {
    const [y, m, day] = String(d).slice(0, 10).split("-").map(Number);
    return new Date(Date.UTC(y, m - 1, day)).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
  });
  eleventyConfig.addFilter("total", (stats, i) => (stats.totals && stats.totals[i]) ? Number(stats.totals[i]) : stats.series.reduce((a, s) => a + Number(s.values[i]), 0));
  eleventyConfig.addFilter("maxtotal", stats => Math.max(...stats.years.map((_, i) => (stats.totals && stats.totals[i]) ? Number(stats.totals[i]) : stats.series.reduce((a, s) => a + Number(s.values[i]), 0))));
  eleventyConfig.addFilter("head", (a, n) => a.slice(0, n));
  eleventyConfig.addFilter("pct", (v, max) => Math.round((v / max) * 100));
  eleventyConfig.addFilter("split2", t => String(t || "").split(/\n\s*\n/).map(x => x.trim()).filter(Boolean));
  eleventyConfig.addFilter("maxcount", items => Math.max(...items.map(i => Number(i.count))));
  eleventyConfig.amendLibrary("md", md => {
    const slug = t => String(t).toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    md.core.ruler.push("heading_ids", state => {
      const used = {};
      state.tokens.forEach((tok, i) => {
        if (tok.type !== "heading_open" || tok.attrGet("id")) return;
        let id = slug(state.tokens[i + 1].content) || "section";
        if (used[id]) id += "-" + used[id]++; else used[id] = 1;
        tok.attrSet("id", id);
      });
    });
  });
  return { pathPrefix: process.env.PATH_PREFIX || "/", dir: { input: "src", output: "_site", includes: "_includes", data: "_data" }, markdownTemplateEngine: "njk", htmlTemplateEngine: "njk" };
};
