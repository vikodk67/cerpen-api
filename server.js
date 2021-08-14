var express = require("express");
var app = express();
const cheerio = require("cheerio");
const request = require("request");
const http = require("http");
const htmlToText = require("html-to-text");

app.get("/", (req, res, next) => {
  function foreach(arr, func) {
    for (var i in arr) {
      func(i, arr[i]);
    }
  }
  var items = [
    "cerpen-bahasa-inggris",
    "cerpen-cinta",
    "cerpen-cinta-dalam-hati-terpendam",
    "cerpen-cinta-islami",
    "cerpen-remaja",
    "cerpen-renungan",
    "cerpen-persahabatan"
  ];
  var kategori = items[Math.floor(Math.random() * items.length)];

  var hal = Math.floor(Math.random() * 30);
  var url = "http://cerpenmu.com/category/" + kategori + "/page/" + hal;
  request.get(
    {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (X11; Linux x86_64; rv:74.0) Gecko/20100101 Firefox/74.0",
      },
      url: url,
    },
    function (error, response, body) {
      let $ = cheerio.load(body);
      //var bodi = body.replace("}1", "}");
      //var d = JSON.parse(bodi);
      let cerpen = [];

      $('article[class="post"] > h2 > a').each(function (i, e) {
        cerpen[i] = $(this).attr("href");
      });
      var nomorlink = Math.floor(Math.random() * 10);
      var url = cerpen[nomorlink];
      request.get(
        {
          headers: { "content-type": "application/x-www-form-urlencoded" },
          url: url,
        },
        function (error, response, body) {
          let $ = cheerio.load(body);
          //var h  = $.html().replace(/<[^>]*>?/gm, '');
          const text = htmlToText.fromString($.html(), {
            noLinkBrackets: true,
            ignoreHref: true,
            ignoreImage: true,
          });
          //console.log(text)
          res.json(text.split("kamu dapat")[0].split("Kontak Kami")[1]);
        }
      );
    }
  );
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
  if (err) throw err;
  console.log("%c Server running", "color: green");
});
//aaa
