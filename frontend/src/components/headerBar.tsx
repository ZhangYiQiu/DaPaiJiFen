import { AppBar, Toolbar, Typography } from "@mui/material";

const HeaderBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          游戏记账
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderBar;
