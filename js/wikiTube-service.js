'use strict';
var YT_KEY = `AIzaSyANrISFcbmdjmL0lrQBylPpUUJmI_dTLk4`
var SEARCH_KEY = 'searchKey';
var gSearch = [];
console.log('servics');


function initSearch() {
    var searches = [];
    searches = loadFromStorage(SEARCH_KEY);

    if (!searches || searches.length === 0) {
        searches = [];
    }
    return searches;
}

function askYoutubeLink(searchStr) {
    var http = `https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${YT_KEY}&q=${searchStr}`;
    console.log(http)
    var prm = axios.get(http);
    prm.then(function (res) {
        renderResulst(res.data);
    });
    prm.catch(function (err) {
        console.error('Had Problem:', err)
    });
}

function askItemWiki(searchStr) {
    var http = `https://en.wikipedia.org/w/api.php?&origin=*&action=opensearch&search=${searchStr}&limit=5`;
    console.log(http)
    var prm = axios.get(http);
    prm.then(function (res) {
        console.log(res);
        renderTxtWiki(res.data);
    });
    prm.catch(function (err) {
        console.error('Had Problem:', err)
    });
}

function saveSearches(txtSearch) {
    gSearch.push(txtSearch);
    gSearch = new Set(gSearch);
    gSearch = Array.from(gSearch);
    saveToStorage(SEARCH_KEY, gSearch);
}

function getSearchesToDisplay() {
    gSearch = initSearch();
    return gSearch;
}

function clearLocalStorage() {
    localStorage.removeItem(SEARCH_KEY);
    gSearch = [];
}

function confirmClearHistory() {
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                swal("Your history of searches is deleted!", {
                    icon: "success",
                });
                clearLocalStorage();
                renderSearches(gSearch);
            } else {
                swal("Your history of searches is safe!");
            }
        });
}

function setColor() {
    var bodyStyles = window.getComputedStyle(document.body);
    var currVal = bodyStyles.getPropertyValue('--body-bg-color');

    swal("Choose color", {
        content: {
            element: "input",
            attributes: {
                className: "input-color",
                placeholder: "Change theme color",
                value: currVal,
                type: "color",
            },
        },
        buttons: {
            cancel: true,
            confirm: true,
            Reset: {
                    value:'#ffca7c'
            }
        },

    })
        .then((value) => {
            if (value) {
                renderColor(value)
            } else {
                renderColor(currVal)
            }

        });
}


function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
    return JSON.parse(localStorage.getItem(key))
}
