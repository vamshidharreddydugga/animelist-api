let topAnimeClass = document.querySelector(".top-anime");
let searchApiUrl = "https://api.jikan.moe/v4/anime?q=";
let apiUrl = "https://api.jikan.moe/v4/top/anime?top_anime_filter=bypopularity";
let searchInputSelector = document.querySelector("#search-input");
let searchResultSelector = document.querySelector("#search-results");
let searchSubmitButton = document.querySelector("#submit-btn");
topAnimeClass.innerHTML = `<div class="loader-div"><div class="loader"></div></div>`;
setTimeout(async function getTopAnime() {
  try {
    let fetchUrl = await fetch(apiUrl);
    let fetchedData = await fetchUrl.json();
    let fetchedFinalData = fetchedData.data;
    let animeList = fetchedFinalData.map((anime) => `<div class="card"><a class="nav-link" href="https://myanimelist.net/anime/${anime.mal_id}" target="_blank"><img src="${anime.images.jpg.large_image_url}" class="card-img-top" alt="${anime.title}"><div class="card-body p-1"><p class="card-text">${anime.title}</p></div></a></div>`);
    topAnimeClass.innerHTML = animeList.join("");
  } catch (error) {
    topAnimeClass.innerHTML = `<div class="server-error"><p>503 Service Unavailable<p></div>`;
  }
}, 2000);
searchSubmitButton.addEventListener("click", function () {
  let inputQuery = searchInputSelector.value;
  async function getSearchResults() {
    try {
      let fetchSearchUrl = await fetch(searchApiUrl + inputQuery);
      let fetchedSearchData = await fetchSearchUrl.json();
      let fetchedFinalSearchData = fetchedSearchData.data;
      let searchList = fetchedFinalSearchData.slice(0, 10).map((searchedanime) => `<div class="card"><a class="nav-link" href="https://myanimelist.net/anime/${searchedanime.mal_id}" target="_blank"><img src="${searchedanime.images.jpg.large_image_url}" class="card-img-top" alt="${searchedanime.title}"><div class="card-body p-1"><p class="card-text">${searchedanime.title}</p></div></a></div>`);
      searchResultSelector.innerHTML = searchList.join("");
    } catch (error) {}
  }
  getSearchResults();
});
