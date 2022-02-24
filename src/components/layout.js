/** @jsx jsx */
import { Themed, jsx, Box } from 'theme-ui'

// Taken from my personal site
const Layout = ({ location, children, ...props }) => {
  return (
    <Themed.root {...props}>
      <Box
        sx={{
          minHeight: '100vh',
          height: '100%',
          padding: 4
        }}
      >
        {children}
      </Box>
    </Themed.root>
  )
}

export default Layout
