/** @jsx jsx */
import { useCallback, useState } from "react"
import { Text, Box, Flex, Label, Slider, jsx } from "theme-ui"

const ModelSlider = ({min = 0, max= 1, step = 0.1, onChange = () => {}, title, id, defaultValue,  ...props}) => {
  const [slideAmount, setSlideAmount] = useState(defaultValue)
  const handleChange = useCallback(e => {
    onChange(e)
    setSlideAmount(e.target.value)
  }, [onChange])
  return (
    <Box {...props}>
      <Label htmlfor={`seeker-${id}`}>{title}</Label>
      <Flex sx={{alignItems: 'center'}}>
        <Slider id={id} name={id} value={slideAmount} min={min} max={max} step={step} onChange={handleChange}></Slider>
        <Text sx={{fontWeight: 'bold', ml: 3, textAlign: 'end', width:'33%'}}>{slideAmount}</Text>
      </Flex>
    </Box>
  )
}

export {
  ModelSlider
}
