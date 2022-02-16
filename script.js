'use strict';

const spoonacularAPIKey = 'ad40309b1fd843fdbc6577dac38d03ea';

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

        // If we get no results, throw an error:
        if (content.data.length === 0){
          throw new Error('No GIPHY image found for that search term!');
        }

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
      .then(() => {

        // Put recipe stuff inside a .then so it only loads when the GIPHY has loaded?

        fetch(`https://api.spoonacular.com/recipes/complexSearch?includeIngredients=${str}&sort=random&number=1&apiKey=${spoonacularAPIKey}`)
        .then((response) => {
          if (!response.ok) { throw new Error(response.status); }
          return response.json();
        })
        .then((json) => {

          //console.log(json);

          // If there are no results, throw an error:
          if (json['totalResults'] === 0) {
            throw new Error('No recipes with that ingredient found!');
          }

          const recipeID = json['results'][0]['id'];
          
          //console.log(recipeID);

          fetch(`https://api.spoonacular.com/recipes/${recipeID}/information?includeNutrition=false&apiKey=${spoonacularAPIKey}`)
            .then((response) => {
              if (!response.ok) { throw new Error(response.status); }
              return response.json();
            })
            .then((json) => {

              //console.log(json);

              const recipeSpoonacularSourceURL = json['spoonacularSourceUrl'];
              const recipeSourceURL = json['sourceUrl'];
              const recipeTitle = json['title'];

              /*  We don't know if the spoonacular API guarantees a source URL,
                  so just in case, check if it's blank and replace with the
                  spoonacular source URL. (PS: testing for '' might be incorrect!)
              */
              if (recipeSourceURL === '') {
                recipeSourceURL = recipeSpoonacularSourceURL;
              }

              //console.log(`${recipeSourceURL} | ${recipeSpoonacularSourceURL} | ${recipeTitle}`);

              const recipeContentArea = document.querySelector('#spoonacular-testing-area');

              let html = `<a href="${recipeSourceURL}">${recipeTitle}</a>`;

              recipeContentArea.innerHTML = html;

            });

        })

      })
      .catch(err => {
        console.error(err);
      });
  });
}
