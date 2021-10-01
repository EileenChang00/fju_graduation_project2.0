import './App.css'
import {
    //BrowserRouter as Router,
    //Switch,
    //Route,
    Link,
    Route,
} from 'react-router-dom'

import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import MailIcon from '@material-ui/icons/Mail'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import StarBorder from '@material-ui/icons/StarBorder'
import Collapse from '@material-ui/core/Collapse'
import StorageRoundedIcon from '@material-ui/icons/StorageRounded'
import Button from '@material-ui/core/Button'
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded'
import IconButton from '@material-ui/core/IconButton'
import { Grid, Menu, MenuItem } from '@material-ui/core'
import Bulletin from './bulletin'
import Come from './come/come'
import Customer from './customer/customer'
import Product from './product/product'
import Producer from './producer/producer'
import Employee from './employee/employee'
import Buy from './buy/buy'
import Service from './service/service'
import Reservation from './reservation/reservation'
import Firm from './firm/firm'
import Firmstaff from './firmstaff/firmstaff'
import Visit from './visit/visit'
import ReservationCreate4home from './reservation/reservation_create4home'
import ComeCreate4home from './come/come_create4home'
import VisitCreate4home from './visit/visit_create4home'
import BuyCreate4home from './buy/buy_create4home'
import ServiceCreate4home from './service/service_create4home'
import YearOnYear from './YearOnYear'
import Chart from './Chart'
import Changemenu from './changemenu'
import Changepw from './changepw'
import Changemenu2 from './changemenu2'
import Changemenu3 from './changemenu3'
import Intro from './intro'
import Chart_em from './chart_em'
import Important_Cus from './Important_Cus'
import Name from './name'
import category from './category'
import series from './series'
import producers from './producers'
import fixedsize from './fixedsize'

import { makeStyles } from '@material-ui/core/styles'
import { useState } from 'react'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        display: 'flex',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: 'auto',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}))
export default function Home() {
    //setInterval(tick, 1000);
    const name = localStorage.getItem('name')

    function logout() {
        localStorage.clear()
        window.location.href = '/'
    }
    const classes = useStyles()
    //控制基本資料表開關
    const [openBa, setOpenBa] = useState(false)
    const handleClickBase = () => {
        setOpenBa(!openBa)
    }
    //控制進階資料表開關
    const [openEx, setOpenEx] = useState(true)
    const handleClickExtend = () => {
        setOpenEx(!openEx)
    }
    //控制報表開關
    const [openCh, setOpenCh] = useState(false)
    const handleClickChart = () => {
        setOpenCh(!openCh)
    }
    //控制設定開關
    const [anchorEl, setAnchorEl] = useState(null)
    const openMenu = Boolean(anchorEl)
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleCloseMenu = () => {
        setAnchorEl(null)
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Grid container direction="row" justify="space-between" alignItems="center">
                        <Grid item>
                            <Typography variant="h5" noWrap>
                                SCHRAMM
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Grid container direction="row" justify="flex-end" alignItems="center" spacing={4}>
                                <Grid item>
                                    <Typography variant="h6" noWrap align="right">
                                        你好，{name}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="h6" noWrap align="right" component={Link} to="/home">
                                        <font style={{ color: 'white' }}>公告</font>
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <BuyCreate4home></BuyCreate4home>
                                </Grid>
                                <Grid item>
                                    <ReservationCreate4home></ReservationCreate4home>
                                </Grid>
                                <Grid item>
                                    <ComeCreate4home></ComeCreate4home>
                                </Grid>
                                <Grid item>
                                    <ServiceCreate4home></ServiceCreate4home>
                                </Grid>
                                <Grid item>
                                    <VisitCreate4home></VisitCreate4home>
                                </Grid>
                                <Grid item>
                                    <IconButton
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        onClick={handleMenu}
                                        color="inherit"
                                        edge="end"
                                    >
                                        <SettingsRoundedIcon />
                                    </IconButton>
                                    <Menu
                                        id="menu-appbar"
                                        anchorEl={anchorEl}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={openMenu}
                                        onClose={handleCloseMenu}
                                    >
                                        <MenuItem onClick={handleCloseMenu} component={Link} to="/home/Changepw">
                                            修改密碼
                                        </MenuItem>
                                        <MenuItem onClick={handleCloseMenu} component={Link} to="/home/changemenu">
                                            選單修改
                                        </MenuItem>
                                        <Divider />
                                        <MenuItem onClick={logout}>登出</MenuItem>
                                    </Menu>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <Toolbar />
                <div className={classes.drawerContainer}>
                    <List>
                        <ListItem button onClick={handleClickBase}>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary="基本資料表" />
                            {openBa ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={openBa} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {localStorage.getItem('level') === 'B' && (
                                    <ListItem
                                        component={Link}
                                        to="/home/employee"
                                        color="default"
                                        className={classes.nested}
                                    >
                                        <ListItemIcon>
                                            <StorageRoundedIcon />
                                        </ListItemIcon>
                                        <font style={{ color: 'black' }}>
                                            <ListItemText primary="員工" />
                                        </font>
                                    </ListItem>
                                )}
                                <ListItem
                                    component={Link}
                                    to="/home/customer"
                                    color="inherit"
                                    className={classes.nested}
                                >
                                    <ListItemIcon>
                                        <StorageRoundedIcon />
                                    </ListItemIcon>
                                    <font style={{ color: 'black' }}>
                                        <ListItemText primary="顧客" />
                                    </font>
                                </ListItem>
                                <ListItem
                                    component={Link}
                                    to="/home/product"
                                    color="inherit"
                                    className={classes.nested}
                                >
                                    <ListItemIcon>
                                        <StorageRoundedIcon />
                                    </ListItemIcon>
                                    <font style={{ color: 'black' }}>
                                        <ListItemText primary="產品" />
                                    </font>
                                </ListItem>
                                <ListItem
                                    component={Link}
                                    to="/home/producer"
                                    color="inherit"
                                    className={classes.nested}
                                >
                                    <ListItemIcon>
                                        <StorageRoundedIcon />
                                    </ListItemIcon>
                                    <font style={{ color: 'black' }}>
                                        <ListItemText primary="後勤廠商" />
                                    </font>
                                </ListItem>
                                <ListItem component={Link} to="/home/firm" color="inherit" className={classes.nested}>
                                    <ListItemIcon>
                                        <StorageRoundedIcon />
                                    </ListItemIcon>
                                    <font style={{ color: 'black' }}>
                                        <ListItemText primary="廠商" />
                                    </font>
                                </ListItem>
                                <ListItem
                                    component={Link}
                                    to="/home/firmstaff"
                                    color="inherit"
                                    className={classes.nested}
                                >
                                    <ListItemIcon>
                                        <StorageRoundedIcon />
                                    </ListItemIcon>
                                    <font style={{ color: 'black' }}>
                                        <ListItemText primary="廠商員工" />
                                    </font>
                                </ListItem>
                            </List>
                        </Collapse>
                    </List>
                    <Divider />
                    <List>
                        <ListItem button onClick={handleClickExtend}>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary="進階資料表" />
                            {openEx ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={openEx} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItem
                                    component={Link}
                                    to="/home/reservation"
                                    color="inherit"
                                    className={classes.nested}
                                >
                                    <ListItemIcon>
                                        <StorageRoundedIcon />
                                    </ListItemIcon>
                                    <font style={{ color: 'black' }}>
                                        <ListItemText primary="預約" />
                                    </font>
                                </ListItem>
                                <ListItem component={Link} to="/home/come" color="inherit" className={classes.nested}>
                                    <ListItemIcon>
                                        <StorageRoundedIcon />
                                    </ListItemIcon>
                                    <font style={{ color: 'black' }}>
                                        <ListItemText primary="來訪" />
                                    </font>
                                </ListItem>
                                <ListItem component={Link} to="/home/buy" color="inherit" className={classes.nested}>
                                    <ListItemIcon>
                                        <StorageRoundedIcon />
                                    </ListItemIcon>
                                    <font style={{ color: 'black' }}>
                                        <ListItemText primary="購買" />
                                    </font>
                                </ListItem>
                                <ListItem
                                    component={Link}
                                    to="/home/service"
                                    color="inherit"
                                    className={classes.nested}
                                >
                                    <ListItemIcon>
                                        <StorageRoundedIcon />
                                    </ListItemIcon>
                                    <font style={{ color: 'black' }}>
                                        <ListItemText primary="售後服務" />
                                    </font>
                                </ListItem>
                                <ListItem component={Link} to="/home/visit" color="inherit" className={classes.nested}>
                                    <ListItemIcon>
                                        <StorageRoundedIcon />
                                    </ListItemIcon>
                                    <font style={{ color: 'black' }}>
                                        <ListItemText primary="拜訪" />
                                    </font>
                                </ListItem>
                            </List>
                        </Collapse>
                    </List>
                    <Divider />
                    {localStorage.getItem('level') === 'B' && (
                        <List>
                            <ListItem button onClick={handleClickChart}>
                                <ListItemIcon>
                                    <InboxIcon />
                                </ListItemIcon>
                                <ListItemText primary="報表中心" />
                                {openCh ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            <Collapse in={openCh} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItem
                                        component={Link}
                                        to="/home/Chart"
                                        color="inherit"
                                        className={classes.nested}
                                    >
                                        <ListItemIcon>
                                            <StorageRoundedIcon />
                                        </ListItemIcon>
                                        <font style={{ color: 'black' }}>
                                            <ListItemText primary="營業報表" />
                                        </font>
                                    </ListItem>
                                    <ListItem
                                        component={Link}
                                        to="/home/YearOnYear"
                                        color="inherit"
                                        className={classes.nested}
                                    >
                                        <ListItemIcon>
                                            <StorageRoundedIcon />
                                        </ListItemIcon>
                                        <font style={{ color: 'black' }}>
                                            <ListItemText primary="同比報表" />
                                        </font>
                                    </ListItem>
                                    <ListItem
                                        component={Link}
                                        to="/home/Intro"
                                        color="inherit"
                                        className={classes.nested}
                                    >
                                        <ListItemIcon>
                                            <StorageRoundedIcon />
                                        </ListItemIcon>
                                        <font style={{ color: 'black' }}>
                                            <ListItemText primary="介紹次數" />
                                        </font>
                                    </ListItem>
                                    <ListItem
                                        component={Link}
                                        to="/home/Chart_em"
                                        color="inherit"
                                        className={classes.nested}
                                    >
                                        <ListItemIcon>
                                            <StorageRoundedIcon />
                                        </ListItemIcon>
                                        <font style={{ color: 'black' }}>
                                            <ListItemText primary="員工業績" />
                                        </font>
                                    </ListItem>
                                    <ListItem
                                        component={Link}
                                        to="/home/Important_Cus"
                                        color="inherit"
                                        className={classes.nested}
                                    >
                                        <ListItemIcon>
                                            <StorageRoundedIcon />
                                        </ListItemIcon>
                                        <font style={{ color: 'black' }}>
                                            <ListItemText primary="重要顧客" />
                                        </font>
                                    </ListItem>
                                    <ListItem
                                        component={Link}
                                        to="/home/Name"
                                        color="inherit"
                                        className={classes.nested}
                                    >
                                        <ListItemIcon>
                                            <StorageRoundedIcon />
                                        </ListItemIcon>
                                        <font style={{ color: 'black' }}>
                                            <ListItemText primary="產品分析" />
                                        </font>
                                    </ListItem>
                                </List>
                            </Collapse>
                        </List>
                    )}
                </div>
            </Drawer>
            <main className={classes.content}>
                <Toolbar />
                <Route exact path="/home" component={Bulletin}></Route>
                <Route path="/home/customer" component={Customer} />
                <Route path="/home/come" component={Come} />
                <Route path="/home/product" component={Product} />
                <Route path="/home/producer" component={Producer} />
                <Route path="/home/employee" component={Employee} />
                <Route path="/home/buy" component={Buy} />
                <Route path="/home/service" component={Service} />
                <Route path="/home/visit" component={Visit} />
                <Route path="/home/reservation" component={Reservation} />
                <Route path="/home/firm" component={Firm} />
                <Route path="/home/firmstaff" component={Firmstaff} />
                <Route path="/home/YearOnYear" component={YearOnYear} />
                <Route path="/home/Chart" component={Chart} />
                <Route path="/home/Changemenu" component={Changemenu} />
                <Route path="/home/Changepw" component={Changepw} />
                <Route path="/home/Changemenu2" component={Changemenu2} />
                <Route path="/home/Changemenu3" component={Changemenu3} />
                <Route path="/home/Intro" component={Intro} />
                <Route path="/home/Chart_em" component={Chart_em} />
                <Route path="/home/Important_Cus" component={Important_Cus} />
                <Route path="/home/category" component={category} />
                <Route path="/home/name" component={Name} />
                <Route path="/home/series" component={series} />
                <Route path="/home/producers" component={producers} />
                <Route path="/home/fixedsize" component={fixedsize} />
            </main>
        </div>
    )
}
