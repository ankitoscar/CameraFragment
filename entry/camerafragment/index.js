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
                this.flashMode += 1;
                return instance.setFlashMode((this.flashMode)%4)
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
            .then((photoOutput) => {return photoOutput })
        this.photoOutput.capture(this.photoCaptureSettings)
            .then()
            .then()
    }


}
