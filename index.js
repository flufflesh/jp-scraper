const axios = require("axios");
const $ = require("cheerio");
const fs = require("fs");
const url = "https://yonde.itazuraneko.org/other/kensaku.html";

axios
  .get(url)
  .then((res) => {
    const html = res.data;
    const links = $("tr a", html).map((_, element) => {
      return { src: $(element).attr("href"), text: $(element).text() };
    });
    return links.toArray();
  })
  .then((links) => {
    const urls = links.map((item) => {
      return item;
    });
    fs.writeFile("./urls.json", buildJson(urls), () => {
      console.log("saved into urls.json");
    });

    return links;
  });

function buildJson(urls) {
  let urlElement = [];
  urls.forEach((value, index) => {
    if (index === 0 || index % 2 === 0) {
      urlElement.push(
        `{"name":"${value.text.replace(/"/g, "''")}","href":"${
          urls[index + 1].src
        }","size":"${urls[index + 1].text}"},`
      );
    }
  });
  return `[${urlElement.join("\n")}]`;
}

/**
 * @deprecated was used when generated html for this but moved to gatsby & used json, just build json kekw
 */
function buildHtml(urls) {
  let urlElement = [];
  urls.forEach((value, index) => {
    if (index === 0 || index % 2 === 0) {
      urlElement.push(`<p>url ${value.text}</p>`);
    } else {
      urlElement.push(`<a src="${value.src}">epub ${value.text}</a>`);
    }
  });
  return;
}
