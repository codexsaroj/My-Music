
let play_pause = document.querySelector('#play_pause');
let progressbar = document.querySelector('#myProgBar');
let gif = document.querySelector('#gif');
let all_songs = Array.from(document.querySelectorAll('.song'));
let prev = document.querySelector('#prev');
let next = document.querySelector('#next');
var song_index = 0;

// Song List
let songs = [
  {
    song_name: "Mitwa",
    filePath: "./music/Mitwa.m4a",
    time: "6:00",
    coverPath: "./images/mitwa.jpg",
  },
  {
    song_name: "Kal Ho Naa Ho",
    filePath: "./music/Kal_Ho_Naa_Ho.m4a",
    time: "5:22",
    coverPath: "./images/k.jpg"
  },
  {
    song_name: "Nijame",
    filePath: "./music/Nijame-Ne-Chebutunna.mp3",
    time: "3:56",
    coverPath: "./images/nijame.jpg"
  },
  {
    song_name: "Tere Naina",
    filePath: "./music/Tere Naina.mp3",
    time: "5:01",
    coverPath: "./images/mnik.jpg"
  },
  {
    song_name: "Nee-Singam_Dhan",
    filePath: "./music/Nee-Singam-Dhan.mp3",
    time: "4:07",
    coverPath: "./images/nee.jpg"
  },
  {
    song_name: "Inthandham",
    filePath: "./music/Inthandham.mp3",
    time: "3:38",
    coverPath: "./images/inthandham.jpg"
  },
  {
    song_name: "Haule-Haule",
    filePath: "./music/Haule-Haule.mp3",
    time: "4:02",
    coverPath: "./images/flames.jpg"
  },
  {
    song_name: "Kadalalle",
    filePath: "./music/Kadalalle .m4a",
    time: "4:09",
    coverPath: "./images/dc.jpg"
  },
  {
    song_name: "Mudhal Nee Mudivum Nee",
    filePath: "./music/Mudhal Nee Mudivum Nee.mp3",
    time: "5:22",
    coverPath: "./images/mudhal.jpg"
  },
  {
    song_name: "Agar Tum Saath Ho",
    filePath: "./music/Agar Tum Saath Ho.m4a",
    time: "5:41",
    coverPath: "./images/atsh.jpg"
  }
];


// Initial 
let audioElement = new Audio(songs[0].filePath)
let song_size = songs.length -1;


// Play Button
play_pause.addEventListener('click', () => {
    if(audioElement.paused || audioElement.currentTime == 0){
        audioElement.play();
        play_pause.classList.remove('fa-circle-play');
        play_pause.classList.add('fa-circle-pause');
        gif.style.opacity = "1";
        document.querySelector('.sname').innerHTML = songs[0].song_name;
      }
      else{
        audioElement.pause();
        play_pause.classList.remove('fa-circle-pause');
        play_pause.classList.add('fa-circle-play');
        gif.style.opacity = "0";
      }
    })
    
    
    // Change of Progress bar value with time
    audioElement.addEventListener('timeupdate', () => {
      progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
      progressbar.value = progress;
    })
    
      // Change of time of song when progress bar is changed
    progressbar.addEventListener('change', () => {
      audioElement.currentTime = parseInt((progressbar.value * audioElement.duration)/100);
    })
    
    all_songs.forEach((element, i) => {
      element.getElementsByTagName('img')[0].src = songs[i].coverPath;
      element.querySelectorAll('.songname')[0].innerHTML = songs[i].song_name;
      element.querySelectorAll('.time')[0].innerHTML = songs[i].time;
    })
    
    
    Array.from(document.getElementsByClassName('play_button')).forEach((element, i) => {
      element.addEventListener('click', (e) =>{
        song_index = i;
        if(audioElement.paused || audioElement.currentTime == 0){
          audioElement.play();
      play_pause.classList.remove('fa-circle-play');
      play_pause.classList.add('fa-circle-pause');
      gif.style.opacity = "1";
    }
    else{
      audioElement.play();
      play_pause.classList.add('fa-circle-pause');
      gif.style.opacity = "1";
    }
    
    document.querySelector('.sname').innerHTML = songs[i].song_name;
    audioElement.src = songs[i].filePath
    audioElement.play()
  });
});


// Continuous loop of songs
audioElement.addEventListener('ended', () =>{
  if(song_index != song_size){ 
    song_index += 1;
    audioElement.src = songs[song_index].filePath;
    
    document.querySelector('.sname').innerHTML = songs[song_index].song_name;
    audioElement.play();
    play_pause.classList.remove('fa-circle-play');
    play_pause.classList.add('fa-circle-pause');
    gif.style.opacity = "1";
  } 
  else{
    song_index = 0;
    audioElement.src = songs[song_index].filePath;
    
    document.querySelector('.sname').innerHTML = songs[song_index].song_name;
    audioElement.play();
    
  }
})

// Previous button
prev.addEventListener('click', () => {
  if(song_index == 0){
    audioElement.src = songs[song_size].filePath;
    song_index = song_size - 1;
  }
  else{
    audioElement.src = songs[song_index-1].filePath;
    song_index = song_index-1;
  }
  document.querySelector('.sname').innerHTML = songs[song_index].song_name;
  audioElement.play();
  play_pause.classList.remove('fa-circle-play');
  play_pause.classList.add('fa-circle-pause');
  gif.style.opacity = "1";
})

// Next button
next.addEventListener('click', () => {
  if(song_index == songs.length-1){
    audioElement.src = songs[0].filePath;
    song_index = 0;
  }
  else{
    audioElement.src = songs[song_index+1].filePath;
    song_index = song_index+1;
  }
  audioElement.play();
  document.querySelector('.sname').innerHTML = songs[song_index].song_name;
  play_pause.classList.remove('fa-circle-play');
  play_pause.classList.add('fa-circle-pause');
  gif.style.opacity = "1";
})