var axios = require("axios");
var cheerio = require("cheerio");

var scrape = function() {

  return axios.get("https://www.cnet.com").then(function(res) {
    var $ = cheerio.load(res.data);
    console.log("scrape on the way");
    var articles = [];

    $("div.col-5").each( function(i, element) {

      var head = $(this)
        .find("h3")
        .text()
        .trim();

      var url = $(this)
        .find("a")
        .attr("href");

      var photo = $(this)
        .find("figure")
        .find("a")
        .find("img")
        .attr("src");

      var sum = $(this)
        .find("p")
        .text()
        .trim();

      if (head && sum && url) {

        var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
        var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

        var dataToAdd = {
          headline: headNeat,
          summary: sumNeat,
          url: "https://www.cnet.com" + url,
          photo: photo
        };

        articles.push(dataToAdd);
      }
    });

    return articles;
  });
};

module.exports = scrape;
