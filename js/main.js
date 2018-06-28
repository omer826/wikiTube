'use strict';

var gSearchStr = '';


function init() {
    getSearches();
    onSearch('eyal golan');
}

function getSearches() {
    var searches = getSearchesToDisplay();
    if (searches) {
        renderSearches(searches);
    }
}

function onSearch(txtSearch) {

    var elInput = document.querySelector('.search-input')
    txtSearch = !txtSearch ? elInput.value : txtSearch;
    if (txtSearch.length > 0 || txtSearch !== '') {
        gSearchStr = txtSearch;
        askYoutubeLink(txtSearch);
        saveSearches(txtSearch);
        getSearches();
    }
}

function renderResulst(searchRes) {
    var elUl = document.querySelector('.result-yt');
    var strHtml = '';
    var selectedSrc = '';
    var searchResults = searchRes.items;

    searchResults.forEach((ytItem, idx) => {
        if (idx === 0) selectedSrc = ytItem.id.videoId;
        strHtml += `
            <li onclick="onVideoSelected('${ytItem.id.videoId}')">
            <div class="res-item flex align-center space-between" >
            <img src="${ytItem.snippet.thumbnails.default.url}" 
         alt="img" >
    <p>${ytItem.snippet.title}</p>
    <div>
    </li>`
    });
    onVideoSelected(selectedSrc);
    askItemWiki(gSearchStr);

    elUl.innerHTML = strHtml;
}

function onkeyDown(el, ev) {
    if (ev.code === 'NumpadEnter') {
        onSearch();
    }
}

function onVideoSelected(ytId) {
    var elFrameSelected = document.querySelector('.selected-video iframe');
    var elTop = document.querySelector('.top-result')
    elTop.scrollIntoView();

    if (ytId) {
        elFrameSelected.src = `https://www.youtube.com/embed/${ytId}`;
        elFrameSelected.onload = function(){
            var elLoad = document.querySelector('.loading');
            elLoad.classList.add('hide')
        }
        askItemWiki(gSearchStr);
     
    }
}

function renderTxtWiki(wikiData) {
    var elWikiData = document.querySelector('.wiki-data');
    var Heaedr = wikiData[0];
    var dataLen = wikiData[2].length;
    var wikiHomeLink = 'https://he.wikipedia.org/wiki/%D7%A2%D7%9E%D7%95%D7%93_%D7%A8%D7%90%D7%A9%D7%99';

    var strHtml = `<li><h1>${Heaedr}</h1></li>`;

    var subTxt = wikiData[1];
    var mainTxt = wikiData[2];
    var txtLinks = wikiData[3];

    strHtml += subTxt;

    if (subTxt.length > 0 && mainTxt.length > 0) {
        for (var i = 0; i < dataLen; i++) {
            if( i === 5) break;
            var currSubLine = subTxt[i];
            var currMainLine = mainTxt[i];
            var currLinkLine = txtLinks[i];
            if (currLinkLine === '') currLinkLine = wikiHomeLink;
            if (currMainLine === '') currMainLine = 'No details about your serch';

            strHtml += `<li class="wiki-data-item">
            <h4>${currSubLine}</h4>
            <p>${currMainLine}</p>
            <button onclick="onReadMore('${wikiHomeLink}')" class="btn">Read More</button>
            </li>`
        }

    } else {
        strHtml += `<li class="wiki-data-item">
        <p>No details about your serch</p>
        <button onclick="onReadMore('${wikiHomeLink}')" class="btn">Read More</button>
        </li>`
    }

    elWikiData.innerHTML = strHtml;
}

function videoLoad(){

}

function onReadMore(href) {
    window.open(href, '_blank')
}

function renderSearches(searches) {
    var elSearches = document.querySelector('.search-list-container ul');
    var strHtml = '';

    searches.forEach((search, idx) => {
        strHtml += `
    <li>
    <div class="flex align-center space-between" >
        ${search}
    <div>
    </li>`
    });
    elSearches.innerHTML = strHtml;
}

function onClear() {
    confirmClearHistory();
}

function onChangeColor() {
    setColor();
}

function renderColor(colorInput) {
    var html = document.getElementsByTagName('html')[0];
    html.style.setProperty("--body-bg-color", colorInput);
    html.style.setProperty("--el-color", colorInput);
    var elInput = document.querySelector('.input-color');
}