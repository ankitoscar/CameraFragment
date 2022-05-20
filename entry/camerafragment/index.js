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
    }

    initialize(){
        this.cameraInput = this.camera_manager
            .then((cameraManage) => {
                return cameraManage.createCameraInput(this.cameraId)
            })
    }
}