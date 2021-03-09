// const searchSongs = () => {
//     const inputSong = document.getElementById('search-item').value;
//     //console.log(inputSong);
//     const url = `https://api.lyrics.ovh/suggest/${inputSong}`
//     //console.log(url);

//     fetch(url)
//         .then(response => response.json())
//         .then(select => getSongs(select.data))
// }

const searchSongs = async() => {
    const inputSong = document.getElementById('search-item').value;
    //console.log(inputSong);
    const url = `https://api.lyrics.ovh/suggest/${inputSong}`
    //console.log(url);
    try{
        const response=await fetch(url)
        const select=await response.json()
        getSongs(select.data);                                   //when we are use async,await then we have to  bring try catch for error handling.
    }
    catch(error){
        errorHandle("Something went wrong!!Please try again")
    }
    
}
const getSongs = (item) => {
    // console.log(item);
    const songList = document.getElementById('songsContainer');
    songList.innerHTML=" ";   //normally we set the html empty by default;

    item.forEach(song => {                        //instead of for loop,using for each loop)  
        // const li=document.createElement('li')
        // li.innerText=song.title;
        // songList.appendChild(li);   
        const singleDiv = document.createElement('div');
        singleDiv.className = 'single-result row align-items-center my-3 p-3';
        singleDiv.innerHTML = `
        <div class="col-md-9">
            <h3 class="lyrics-name">${song.title}</h3>
            <p class="author lead">Album by <span>${song.artist.name}</span></p>
            <audio controls>
                <source src="${song.preview}" type="audio/mpeg">
            </audio>
        </div>
        <div class="col-md-3 text-md-right text-center">
            <button onclick="getLyric('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
        </div>
        `
        songList.appendChild(singleDiv);
    })
}

const getLyric=(artistName,titleName)=>{
    const artist=artistName.split(/\s/).join('');
    const title=titleName.split(/\s/).join('');
    //console.log(artist,title);
     const urlLyric=`https://api.lyrics.ovh/v1/${artist}/${title}`;
    //console.log(urlLyric);
    fetch (urlLyric)
    .then(response=>response.json())
    .then(data=>console.log(data.lyrics))
    //.catch(error=>errorHandle("Something went wrong!! Please try again"));


    // const urlLyric=`https://api.lyrics.ovh/v1/${artist}/${title}`; //async,await used in here,instead of .then .then  .
    // //console.log(urlLyric);
    // const res=await fetch (urlLyric)
    // const data=await res.json()
    // displayLyrics(data.lyrics);
    
}
const displayLyrics=lyrics=> {
    const lyricsDiv =document.getElementById('song-lyrics')
    lyricsDiv.innerText=lyrics;
}
const errorHandle=error=>{
    const errorHeading=document.getElementById('errorSection');
    errorHeading.innerText=error;
}