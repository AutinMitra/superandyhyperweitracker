/** @jsx jsx */
import { Box, Text, jsx } from "theme-ui";

const InfoCard = ({ title, data, ...props }) => (
  <Box
    sx={{
      width: 200,
      color: "white",
      background: "primary",
      padding: 3,
    }}
    {...props}
  >
    <Text>{title}</Text>
    <Box
      sx={{
        fontSize: 4,
        fontWeight: "bold",
      }}
    >
      {Intl.NumberFormat("en-US").format(data)}
    </Box>
  </Box>
);

export {
  InfoCard
}
