import { View } from "react-native"

const ProgressBar = (props: { currentStep: number }) => {
  const totalSteps = 7
  const progress = (props.currentStep / totalSteps) * 100
  const segmentWidth = 100 / totalSteps

  const segments = []
  for (let i = 1; i < totalSteps; i++) {
    segments.push(
      <View
        key={i}
        className="h-full w-1 bg-black absolute"
        style={[{ left: `${i * segmentWidth}%` }]}
      />,
    )
  }

  return (
    <View className="h-6 rounded-md bg-white overflow-hidden relative">
      <View
        className="h-full bg-blue-700 absolute"
        style={[{ width: `${progress}%` }]}
      ></View>
      {segments}
    </View>
  )
}

export default ProgressBar
