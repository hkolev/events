import { useState, useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import { NAVIGATION } from '../../constants';
import { WishlistContext, WishlistType } from '../../contexts/WishlistContext';
import { GlobalContextType, GlobalContext } from '../../contexts/GlobalContext';
import { pageLinks } from '../../types/Routes';

export function Header() {
  const { wishList } = useContext(WishlistContext) as WishlistType;
  const { cart } = useContext(GlobalContext) as GlobalContextType;

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const appName = 'Venue app';

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/">
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              {appName}
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {NAVIGATION.map((page) => (
                <MenuItem key={page.id} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <>
                      <Link to={page.url}>
                        {page.name}
                        {page.withMeta && (
                          <MenuListMeta wishlistCount={wishList.length} />
                        )}
                      </Link>
                    </>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Link to="/">
            <Typography
              variant="h5"
              noWrap
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              {appName}
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {NAVIGATION.map((page) => (
              <MenuItem key={page.id} onClick={handleCloseNavMenu}>
                <Typography textAlign="center">
                  <>
                    <Link to={page.url} style={{ position: 'relative' }}>
                      {page.name}
                      {page.withMeta && (
                        <MenuListMeta wishlistCount={wishList.length} />
                      )}
                    </Link>
                  </>
                </Typography>
              </MenuItem>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open cart">
              <Link to={pageLinks.cart}>
                <IconButton sx={{ p: 0 }}>
                  <Avatar>
                    <span
                      style={{
                        color: '#000',
                      }}
                    >
                      {cart.length > 0 && cart.length}
                    </span>

                    <ShoppingCartIcon color="info" />
                  </Avatar>
                </IconButton>
              </Link>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

const MenuListMeta = ({ wishlistCount }: { wishlistCount: number }) => {
  return (
    <span
      style={{
        width: '20px',
        height: '20px',
        display: 'block',
        borderRadius: '50%',
        background: '#bdbdbd',
        lineHeight: '20px',
        position: 'absolute',
        color: '#000',
        top: -10,
        right: -25,
      }}
    >
      {wishlistCount}
    </span>
  );
};
