prediction1 = "";
prediction2 = "";

Webcam.set({
    height:300,
    width:350,
    image_format:'PNG',
    PNG_quality:90
});

Camera = document.getElementById("camera");
Webcam.attach('#Camera');

function takeSnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id = "picture_taken" src = "'+data_uri+'"/>';
        console.log("snapshot taken");

    });

}

console.log("ml5:",ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/T1868BwQ5/model.json', modelLoaded);

function modelLoaded(){
    console.log("model loaded");
}

function speak(){
    var synth = window.speechSynthesis;
    var speechData1 = "The first prediction is " + prediction1;
    var speechData2 = "The second prediction is " + prediction2;
    var utterThis = new SpeechSynthesisUtterance(speechData1 + speechData2);
    synth.speak(utterThis);

}
function Check(){
    img = document.getElementById("picture_taken");
    classifier.classify(img, gotResult);
}
function gotResult(error, results){
  if (error){
      console.error(error);
  }
  else{
      console.log(results);
      document.getElementById("resultName1").innerHTML = results[0].label;
      document.getElementById("resultName2").innerHTML = results[1].label;
      prediction1 = results[0].label;
      prediction2 = results[1].label;
      speak();

      if (results[0].label == "Happy"){
          document.getElementById("updateEmoji1").innerHTML = "&#128522;";
      } 
      if (results[0].label == "Sad"){
        document.getElementById("updateEmoji1").innerHTML = "&#128532;";
    } 
    if (results[0].label == "Angry"){
        document.getElementById("updateEmoji1").innerHTML = "&#128548;";
    } 

    if (results[1].label == "Happy"){
        document.getElementById("updateEmoji2").innerHTML = "&#128522;";
    } 
    if (results[1].label == "Sad"){
      document.getElementById("updateEmoji2").innerHTML = "&#128532;";
  } 
  if (results[1].label == "Angry"){
      document.getElementById("updateEmoji2").innerHTML = "&#128548;";
  } 


  }

}