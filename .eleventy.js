module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/files");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addFilter("num", n => Number(n).toLocaleString("en-US"));
  eleventyConfig.addFilter("tel", s => "+1" + String(s).replace(/\D/g, "").replace(/^1/, ""));
  eleventyConfig.addFilter("longdate", d => {
    const [y, m, day] = String(d).slice(0, 10).split("-").map(Number);
    return new Date(Date.UTC(y, m - 1, day)).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
  });
  eleventyConfig.addFilter("total", (stats, i) => stats.series.reduce((a, s) => a + Number(s.values[i]), 0));
  eleventyConfig.addFilter("maxtotal", stats => Math.max(...stats.years.map((_, i) => stats.series.reduce((a, s) => a + Number(s.values[i]), 0))));
  eleventyConfig.addFilter("head", (a, n) => a.slice(0, n));
  eleventyConfig.addFilter("pct", (v, max) => Math.round((v / max) * 100));
  return { dir: { input: "src", output: "_site", includes: "_includes", data: "_data" }, markdownTemplateEngine: "njk", htmlTemplateEngine: "njk" };
};
