var cat = document.getElementById('myForm').addEventListener('submit',saveBookmark);

function saveBookmark()         //save bookmark
{
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;

    if(!validation(siteName,siteUrl))
    {
        return false;
    }

    var bookmark = {        // create a obj form submit local storage
        name: siteName,
        url: siteUrl
    }

            //  local storage only store the String and show the parse the json.stingify is do parse into a String 
            //and save it then move to back parse from the json.parse                   

        if(localStorage.getItem('bookmarks') === null)
        {   
            var bookmarks = [];                     // init array
            bookmarks.push(bookmark);               // add to array
            localStorage.setItem('bookmarks', JSON.stringify(bookmarks));      // set to local storage

        }
        else
        {
            var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));   //get bookmark from localstorage and JSON.parse is convert the string to parse
            bookmarks.push(bookmark);                                           // add to bookmark
            localStorage.setItem('bookmarks', JSON.stringify(bookmarks));      // set to local storage
        }

        document.getElementById('myForm').reset();  //clear all the text
        fetchBookmark();        // again call same page
}

function fetchBookmark()
{
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        var bookmarkResult = document.getElementById('bookmarkResult');     //get output from id 
        bookmarkResult.innerHTML= "";

        for(var i=0; i< bookmarks.length; i++)
        {
            var name = bookmarks[i].name;
            var url = bookmarks[i].url;

            bookmarkResult.innerHTML += '<br>'+'<div class="well">'+'<h4>' +name+ ' '+
                                        '<a class="btn btn-default" target="_blank" href="'+url+'">Visit</a>'+' '+
                                        '<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a>'+
                                        '</h4>'+'</div>';
        }
}

function deleteBookmark(url)
{
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));    
    for(var i=0; i< bookmarks.length; i++)
    {
        if(bookmarks[i].url == url)
        {
            bookmarks.splice(i,1);          // remove from array
        }        
    }    
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    fetchBookmark();        // again call same page
}   


function validation(siteName,siteUrl)
{
    if(!siteName || !siteUrl)
    {
        alert("Please enter the detail...");
        return false;
    }
    
    var exp = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(exp);
    if(!siteUrl.match(regex))
    {
        alert("Please use a valid URL");
        return false;
    }  
    return true;    
}