const videoElement = document.getElementById('video');
const button = document.getElementById('button');

// prompt to select media stream,pass to video element, then play
async function selectMediaStream() {
    try {
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        videoElement.srcObject = mediaStream;
        videoElement.onloadeddata = () => {
            videoElement.play();
        }
    }catch(error) {
        // catch Error here
    }
}

button.addEventListener('click', async () => {
    // disable button
    button.disabled = true;
    // start picture in picture
    await videoElement.requestPictureInPicture();
    // Reset Button
    button.disabled = false;
})

// onLoad
selectMediaStream();