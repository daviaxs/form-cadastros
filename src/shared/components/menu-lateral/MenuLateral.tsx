import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, useTheme } from "@mui/material"
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import { Box } from '@mui/system'
import ProfileAvatar from '../../assets/avatarImage.png'
import Divider from "@mui/material/Divider"
import Avatar from '@mui/material/Avatar'

interface IMenuLateralProps {
  children: React.ReactNode
}

export const MenuLateral: React.FC<IMenuLateralProps> = ({ children }) => {
  const theme = useTheme()

  function HomeIcon(props: SvgIconProps) {
    return (
      <SvgIcon {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </SvgIcon>
    );
  }

  return (
    <>
      <Drawer variant='permanent'>
        <Box width={theme.spacing(28)} height='100%' display='flex' flexDirection='column' >

          <Box width='100%' height={theme.spacing(20)} display='flex' alignItems='center' justifyContent='center' >
            <Avatar
              sx={{ height: theme.spacing(12), width: theme.spacing(12) }}
              src={ProfileAvatar} />
          </Box>

          <Divider />

          <Box flex={1}>
            <List component='nav'>
              <ListItemButton>
                <ListItemIcon>
                  <HomeIcon/>
                </ListItemIcon>
                <ListItemText primary='Página inicial'/>
              </ListItemButton>
            </List>
          </Box>

        </Box>
      </Drawer>

      <Box height="100vh" marginLeft={theme.spacing(28)} >
        {children}
      </Box>
    </>
  )
}