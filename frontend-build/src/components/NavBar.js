import { AppBar, Toolbar, Box, IconButton, ButtonGroup, Button, Typography, Drawer, List, ListItem, ListItemButton, ListItemText } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import { useState } from "react"
import logo from "../assets/logo.PNG"

const NavBar = () => {

    const pages = [
        {
            title: "Single Question",
            link: "singlequestion"
        },
        {
            title: "Multiple Questions",
            link: "multiplequestions"
        },
        {
            title: "About",
            link: "about"
        }
    ]

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
                        variant="h5"
                    >
                        Keptan Classifier
                    </Typography>

                    <ButtonGroup
                        sx={{ display: { xs: "none", md: "flex" } }}
                        variant="text"
                        color="inherit"
                    >
                        {pages.map(page => <Button key={page.link} href={page.link}> {page.title} </Button>)}
                    </ButtonGroup>


                </Toolbar>

            </AppBar>

            <Drawer
                open={drawerOpen}
                anchor="left"
                onClose={() => { setDrawerOpen(false) }}
                PaperProps={{
                    sx: {
                        bgcolor: "primary.main",
                        color: "primary.contrastText"
                    }
                }}
            >

                <List
                    sx={{ width: '100%', maxWidth: 360 }}
                    color="inherit"
                    component="nav"
                >
                    {pages.map(page => (
                        <ListItem key={page.link}
                        >
                            <ListItemButton component="a" href={page.link}>
                                <ListItemText primary={page.title} />
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