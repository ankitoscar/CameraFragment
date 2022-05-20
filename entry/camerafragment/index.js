import camera from '@ohos.multimedia.camera';

export default class CameraFragment {
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
    }

    initialize(){
        this.cameraInput = this.camera_manager
            .then((cameraManage) => {
                return cameraManage.createCameraInput(this.cameraId)
            })
    }

    // Function to toggle flash mode, if flash is set to last mode
    // it will be set back to the first mode.
    toggleFlashMode(){
        if(this.cameraInput
            .then((instance) => {return instance.hasFlash()
                .then((status) => {return status})})){
            this.cameraInput.then((instance) => {
                return instance.setFlashMode((this.flashMode+1)%4)
                    .then(() => {
                        console.log("Flash Mode toggled.")
                    })
            })
        }
    }


}
