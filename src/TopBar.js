import { Grid, Typography, IconButton, Menu, MenuItem, Breadcrumbs, Link } from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'
import React from 'react'
import ReservationCreate from './Component/reservation_create'
import ComeCreate from './Component/come_create'
import BuyCreate from './Component/buy_create'
import ServiceCreate from './Component/service_create'

export default function TopBar() {
    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl)
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    return (
        <Grid container direction="row" justify="space-between">
            <Grid item>
                <Typography variant="h4" color="inherit">
                    SCHRAMM
                </Typography>
            </Grid>
            <Grid item>
                <Breadcrumbs aria-label="breadcrumb" edge="end">
                    <ReservationCreate></ReservationCreate>
                    <ComeCreate></ComeCreate>
                    <BuyCreate></BuyCreate>
                    <ServiceCreate></ServiceCreate>
                </Breadcrumbs>
            </Grid>
            <Grid item>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                    edge="end"
                >
                    <AccountCircle />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={open}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                </Menu>
            </Grid>
        </Grid>
    )
}
