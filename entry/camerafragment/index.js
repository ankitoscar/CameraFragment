import camera from '@ohos.multimedia.camera';

export default class CameraFragment {
    // Constructor for initialising some necessary camera variables
    constructor(context) {
        this.camera_manager = camera.getCameraManager(context);
        this.cameras = this.camera_manager
            .then((cameraManager) => {
                return cameraManager.getCameras()
                .then((cameraArray) => {return cameraArray});
            })
        this.cameraObj = this.cameras[0];
        this.cameraId = this.cameraObj.cameraId;
        this.cameraPosition = this.cameraObj.cameraPosition;
        this.cameraType = this.cameraObj.cameraType;
        this.flashMode = 0;
        this.cameraInput = this.camera_manager
            .then((cameraManage) => {
                return cameraManage.createCameraInput(this.cameraId)
            })
        this.photoCaptureSettings = {
            'ImageRotation' : 0,
            'QualityLevel': 0,
        }
    }


    // Function to toggle flash mode, if flash is set to last mode
    // it will be set back to the first mode.
    toggleFlashMode(){
        if(this.cameraInput
            .then((instance) => {return instance.hasFlash()
                .then((status) => {return status})})){
            this.cameraInput.then((instance) => {
                this.flashMode = (this.flashMode + 1)%4;
                return instance.setFlashMode(this.flashMode)
                    .then(() => {
                        console.log("Flash Mode toggled.")
                    })
            })
        }
    }

    // Function to set the quality level of captured image, modulo
    // operation is done to ensure level < 3
    setImageQuality(level){
        this.photoCaptureSettings['QualityLevel'] = (level%3);
    }

    capturePhoto(surfaceId){
        this.photoOutput = this.cameraObj.createPhotoOutput(surfaceId)
            .then((photoOutput) => {return photoOutput });

        this.photoOutput.capture(this.photoCaptureSettings)
            .then((err) => {
                if(err){
                    console.log("Photo couldn't be captured due to : ${err.message}");
                    return;
                }
                console.log("Photo captured successfully.")
            });

        this.photoOutput.release()
            .then(() => {
                console.log("PhotoCapture instance released.")
            })
    }

    // Function to start capturing a video\
    startVideoCapture(surfaceId){
        this.videoOutput = this.cameraObj.createVideoOutput(surfaceId)
            .then((videoOutput) => {return videoOutput});
        this.videoOutput.start()
            .then((err) => {
                if (err) {
                    console.log("Video capture couldn't start due to : ${err.message}.");
                    return;
                }

                console.log("Video capture session has started.")
            })
    }

    stopVideoCapture(){
        this.videoOutput.stop((err) => {
            if(err){
                console.log("Failed to stop capturing video due to : ${err.message}");
                return;
            }
            console.log("Video capture stopped successfully.");

            this.videoOutput.release().then((err) => {
                if(err){
                    console.log("VideoCapture instance couldn't be released due to : ${err.message}");
                    return;
                }

                console.log("VideoCapture instance is released successfully.");
            })
        })
    }
}
