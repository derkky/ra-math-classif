import { AppBar, Toolbar, Box, IconButton, ButtonGroup, Button, Typography, Drawer, List, ListItem, ListItemButton, ListItemText } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import { useState } from "react"

const NavBar = () => {

    const pages = ["Single Question", "Multiple Question", "About"]

    const [drawerOpen, setDrawerOpen] = useState(false)

    return (
        <>
            <AppBar>
                <Toolbar>
                    <IconButton
                        sx={{ display: { xs: "flex", md: "none" } }}
                        size="large"
                        color="inherit"
                        onClick={() => setDrawerOpen(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        color="inherit"
                        sx={{ display: "flex", flex: 1 }}
                        variant="h6"
                    >
                        NUS Math Classifier
                    </Typography>

                    <ButtonGroup
                        sx={{ display: { xs: "none", md: "flex" } }}
                        variant="text"
                        color="inherit"
                    >
                        {pages.map(page => <Button key={page}> {page} </Button>)}
                    </ButtonGroup>


                </Toolbar>

            </AppBar>
            <Drawer
                open={drawerOpen}
                anchor="left"
                onClose={() => { setDrawerOpen(false) }}
            >

                <List
                    sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                    color="inherit"
                    component="nav"
                >
                    {pages.map(page => (
                        <ListItem key={page}>
                            <ListItemButton>
                                <ListItemText primary={page} />
                            </ListItemButton>
                        </ListItem>
                    )
                    )}
                </List>

            </Drawer>
        </>

    )

}

export default NavBar