'use strict';



/*
  giphy testing starts here:

// */
let APIKEY = "Dli5GxSun7HzszaxwgFeRbCET2HGlCKd";
// my key from dashboard 
// https://developers.giphy.com/dashboard/
document.addEventListener("DOMContentLoaded", init);
function init() {
  document.getElementById("btnSearch").addEventListener("click", ev => {
    ev.preventDefault(); //to stop the page reload
    
    let url = `https://api.giphy.com/v1/stickers/search?api_key=${APIKEY}&limit=1&q=`;
    let str = document.getElementById("search").value.trim();
    url = url.concat(str);
    console.log(url);
    //send request to API
    fetch(url)
    // get the response
      .then(response => response.json())
    //handle the data
      .then(content => {
        //  data, pagination, meta
        console.log(content.data);
        console.log("META", content.meta);
        //create HTML elements
        let fig = document.createElement("figure");
        let img = document.createElement("img");
        let fc = document.createElement("figcaption");
        img.src = content.data[0].images.fixed_height.url;
        img.alt = "";

        fig.appendChild(img);
        fig.appendChild(fc);
       
        //revealing stickers on the page
        let out = document.querySelector(".out");
        //as a first child
        out.insertAdjacentElement("afterbegin", fig);
        document.querySelector("#search").value = "";
      })
      .catch(err => {
        console.error(err);
      });
  });
}

/*
  giphy testing ends here
*/

/* --------------------------------------------------------- */



/*
  spoonacular testing starts here:
*/



/*
  spoonacular testing ends here
*/
