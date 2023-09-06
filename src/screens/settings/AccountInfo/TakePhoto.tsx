// REFERENCE: Settings - Account information - take photo

import {
  Camera,
  CameraCapturedPicture,
  CameraType,
  FlashMode,
} from "expo-camera"
import { useState, createRef, useCallback } from "react"
import { View, SafeAreaView, TouchableOpacity, StatusBar } from "react-native"
import { Entypo, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import LatoText from "components/styled_components/LatoText"
import { TUpdateIcon } from "types/endpoints"
import { useAppDispatch, useAppSlector } from "redux/hooks"
import { updateIcon } from "utils/services/accountInfo"
import { tmpStoreAction } from "redux/reducers/tmpStore.reducer"

const TakePhoto = () => {
  const navigate = useNavigation()
  const tmpUser = useAppSlector(state => state.tmpStore)
  const dispatch = useAppDispatch()
  const cameraRef = createRef<Camera>()
  const [permission, requestPermission] = Camera.useCameraPermissions()
  const [userIcon, setUserIcon] = useState<CameraCapturedPicture>()
  const [type, setType] = useState(CameraType.back)
  const [flash, setFlash] = useState<FlashMode>(FlashMode.auto)
  const [isCameraReady, setIsCameraReady] = useState(false)
  const [isPreview, setIsPreview] = useState(false)

  // To hide status bar
  useFocusEffect(
    useCallback(() => {
      // This will run when screen is `focused` or mounted.
      StatusBar.setHidden(true)

      // This will run when screen is `blured` or unmounted.
      return () => {
        StatusBar.setHidden(false)
      }
    }, []),
  )

  console.log("check permission:", permission)

  if (!permission?.granted) {
    ;(async () => {
      await requestPermission()
    })()
  }

  const onCameraReady = () => {
    setIsCameraReady(true)
  }

  const handleTakePhoto = () => {
    ;(async () => {
      if (!cameraRef.current) return

      const options = {
        quality: 0.3,
        base64: true,
      }

      const photo = await cameraRef.current?.takePictureAsync(options)

      if (photo === undefined) return

      if (photo.uri) {
        cameraRef.current?.pausePreview()
        setIsPreview(true)
        setUserIcon(photo)
      }
    })()
  }

  const handleFlipCamera = () =>
    setType(type === CameraType.back ? CameraType.front : CameraType.back)

  const handleSwitchCameraType = () => {
    setFlash(
      flash === FlashMode.auto
        ? FlashMode.on
        : flash === FlashMode.on
        ? FlashMode.off
        : FlashMode.auto,
    )
  }

  const handleCancelPreview = () => {
    cameraRef.current?.resumePreview()
    setIsPreview(false)
  }

  const handleSave = () => {
    ;(async () => {
      if (!userIcon) return

      const payload = {
        iconFile: {
          base64: userIcon.base64,
          name: tmpUser.userId,
          type: "image",
          ext: userIcon.uri.split(".").pop(),
        },
        userId: tmpUser.userId,
      } as TUpdateIcon["requestType"]

      // endpoint: upload photo to backend
      const resp = await updateIcon(payload)

      if (typeof resp === "undefined") return

      navigate.goBack()

      dispatch(
        tmpStoreAction.setState({
          ...tmpUser,
          link_icon: userIcon.uri,
          message: "Profile picture changed successfully",
        }),
      )
    })()
  }

  // TODO: open media library to select photo
  const handleOpenMediaLibrary = () => {}

  const renderSwitchCamera = () => {
    if (!isCameraReady || isPreview) return

    switch (flash) {
      case FlashMode.auto:
        return (
          <MaterialCommunityIcons name="flash-auto" size={30} color="white" />
        )
      case FlashMode.on:
        return <Ionicons name="flash" size={30} color="white" />
      case FlashMode.off:
        return <Ionicons name="flash-off" size={30} color="white" />
      default:
        return null
    }
  }

  return (
    <SafeAreaView className="flex-1">
      <StatusBar hidden={true} />
      <Camera
        ref={cameraRef}
        type={type}
        flashMode={flash}
        onCameraReady={onCameraReady}
        className="flex-1"
        ratio="1:1"
      >
        <View className="flex-1 justify-between">
          <View className="flex flex-row justify-between px-16 py-12">
            <TouchableOpacity onPress={() => navigate.goBack()}>
              <Entypo name="cross" size={30} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSwitchCameraType}>
              {renderSwitchCamera()}
            </TouchableOpacity>
          </View>

          {isPreview ? (
            <View className="flex flex-row justify-between items-center px-16 py-12 ">
              <TouchableOpacity onPress={handleCancelPreview}>
                <LatoText classname="font-lato-bold text-8">Retake</LatoText>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSave}>
                <LatoText classname="font-lato-bold text-8 drop-shadow-lg">
                  Save
                </LatoText>
              </TouchableOpacity>
            </View>
          ) : (
            <View className="flex flex-row justify-around items-center px-16 py-12 ">
              {/* TODO: open media library to select photo */}
              <TouchableOpacity
                className="block invisiable"
                onPress={handleOpenMediaLibrary}
              >
                <Ionicons name="images-outline" size={30} color="transparent" />
              </TouchableOpacity>

              <TouchableOpacity onPress={handleTakePhoto}>
                <Entypo name="circle" size={72} color="white" />
              </TouchableOpacity>

              <TouchableOpacity onPress={handleFlipCamera}>
                <MaterialCommunityIcons
                  name="camera-flip-outline"
                  size={30}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Camera>
    </SafeAreaView>
  )
}

export default TakePhoto
