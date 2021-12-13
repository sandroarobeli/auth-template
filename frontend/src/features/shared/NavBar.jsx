// Third party
import React, { useState } from 'react'
import { Link, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

// Custom
import { selectToken, logout } from '../../redux/userSlice'

const NavBar = () => {
    // From Redux
    const token = useSelector(selectToken)
    const dispatch = useDispatch()

    const onLogoutClicked = () => {
        dispatch(logout())
    }

    let isLoggedIn = token !== "" ? true : false

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar
                    sx={{
                        justifyContent: 'flex-end',
                        marginRight: '2rem'
                    }}
                >
                    <Button
                        disableRipple
                        color="inherit"
                        component={Link}
                        to='/'
                    >
                        Home
                    </Button>
                    {!isLoggedIn && <Button
                        disableRipple
                        color="inherit"
                        component={Link}
                        to='/login'
                    >
                        Login
                    </Button>}
                    {!isLoggedIn && <Button
                        disableRipple
                        color='inherit'
                        component={Link}
                        to='/signup'
                    >
                        Signup
                    </Button>}
                    {isLoggedIn && <Button
                        disableRipple
                        color='inherit'
                        component={Link}
                        onClick={onLogoutClicked}
                        to='/'
                    >
                        Logout
                    </Button>}
                </Toolbar>
            </AppBar>
            <Outlet />
        </Box>
    )
}


export default NavBar