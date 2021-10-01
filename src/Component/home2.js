
import './App.css';
import {
    //BrowserRouter as Router,
    //Switch,
    //Route,
    Link, Route
} from 'react-router-dom';
import Bulletin from "./bulletin";
import Come from "./come/come";
import Customer from "./customer/customer";
import Product from "./product/product";
import Producer from "./producer/producer";
import Employee from "./employee/employee";
import Buy from "./buy/buy";
import Service from "./service/service";
import Reservation from "./reservation/reservation";
import Firm from "./firm/firm";
import Firmstaff from "./firmstaff/firmstaff";
import Visit from "./visit/visit";
import ReservationCreate4home from "./reservation/reservation_create4home";
import ComeCreate4home from "./come/come_create4home";
import VisitCreate4home from "./visit/visit_create4home";
import BuyCreate4home from "./buy/buy_create4home";
import ServiceCreate4home from "./service/service_create4home";
import YearOnYear from "./YearOnYear";
import Chart from "./Chart";
import Changemenu from "./changemenu";
import Changepw from "./changepw";
import Changemenu2 from "./changemenu2";
import Changemenu3 from "./changemenu3";
import Intro from "./intro";
import Chart_em from "./chart_em";
import Important_Cus from "./Important_Cus";
import Name from "./name";
import category from "./category";
import series from "./series";
import producers from "./producers";
import fixedsize from "./fixedsize";

import { makeStyles } from '@material-ui/core/styles';

var backgroundstyle = {
    width: "auto",
    height: "auto",
    backgroundColor: "oldlace",
};
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
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
}));
function home() {
    //setInterval(tick, 1000);
    
    const name = localStorage.getItem('name');

    function logout() {
        localStorage.clear();
        window.location.href = '/';
    }

    return (
        
        <div style={backgroundstyle}>
            <div class="d-flex" id="wrapper">
                <div class="bg-light border-right" id="sidebar-wrapper">
                    <div class="sidebar-heading">SCHRAMM </div>
                    <div class="list-group list-group-flush">
                        <div>基本資料表</div>
                        <Link to="/home/customer"><a href="/#" class="list-group-item list-group-item-action bg-light">顧客資料表</a></Link>
                        <Link to="/home/employee"><a href="/#" class="list-group-item list-group-item-action bg-light">員工資料表</a></Link>
                        <Link to="/home/product"><a href="/#" class="list-group-item list-group-item-action bg-light">產品資料表</a></Link>
                        <Link to="/home/producer"><a href="/#" class="list-group-item list-group-item-action bg-light">後勤廠商資料表</a></Link>
                        <Link to="/home/firm"><a href="/#" class="list-group-item list-group-item-action bg-light">廠商資料表</a></Link>
                        <Link to="/home/firmstaff"><a href="/#" class="list-group-item list-group-item-action bg-light">廠商人員資料表</a></Link>
                        {/* <a href="/#" class="list-group-item list-group-item-action bg-light">贈品資料表</a> */}
                        <div>進階資料表</div>
                        <Link to="/home/reservation"><a href="/#" class="list-group-item list-group-item-action bg-light">預約資料表</a></Link>
                        <Link to="/home/come"><a href="/#" class="list-group-item list-group-item-action bg-light">來訪資料表</a></Link>
                        <Link to="/home/buy"><a href="/#" class="list-group-item list-group-item-action bg-light">購買資料表</a></Link>
                        <Link to="/home/service"><a href="/#" class="list-group-item list-group-item-action bg-light">售後服務資料表</a></Link>
                        <Link to="/home/visit"><a href="/#" class="list-group-item list-group-item-action bg-light">拜訪資料表</a></Link>
                        <div>報表</div>
                        <Link to='/home/Chart'><a href="/#" class="list-group-item list-group-item-action bg-light">營業報表</a></Link>
                        <Link to='/home/YearOnYear'><a href="/#" class="list-group-item list-group-item-action bg-light">環比報表</a></Link>
                        <Link to='/home/Intro'><a href="/#" class="list-group-item list-group-item-action bg-light">介紹次數報表</a></Link>
                        <Link to='/home/Chart_em'><a href="/#" class="list-group-item list-group-item-action bg-light">員工業績報表</a></Link>
                        <Link to='/home/Important_Cus'><a href="/#" class="list-group-item list-group-item-action bg-light">重要顧客</a></Link>
                        <Link to='/home/Name'><a href="/#" class="list-group-item list-group-item-action bg-light">產品分析</a></Link>
                    </div>
                </div>

                <div id="page-content-wrapper">

                    <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
                        {/* <button class="btn btn-primary" id="menu-toggle">Toggle Menu</button> */}
                        <div id="time"></div>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>

                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
                                <li class="nav-item active">
                                    <div class="nav-link" id='name'>你好,{name}</div>
                                </li>
                                <li class="nav-item active">
                                    <Link to="/home"><a class="nav-link" href="/#">公告</a></Link>
                                </li>
                                <li class="nav-item">
                                    <ReservationCreate4home></ReservationCreate4home>
                                </li>
                                <li class="nav-item">
                                    <ComeCreate4home></ComeCreate4home>
                                </li>
                                <li class="nav-item">
                                    <BuyCreate4home></BuyCreate4home>
                                </li>
                                <li class="nav-item">
                                    <ServiceCreate4home></ServiceCreate4home>
                                </li>
                                <li class="nav-item">
                                    <VisitCreate4home></VisitCreate4home>
                                </li>
                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" href="/#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">設定</a>
                                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                        <Link to="/home/changepw"><a class="dropdown-item" href="/#">員工更改密碼</a></Link>
                                        <div class="dropdown-divider"></div>
                                        <Link to="/home/changemenu"><a class="dropdown-item" href="/#">選單修改</a></Link>
                                        <div class="dropdown-divider"></div>
                                        <a class="dropdown-item" href="/#" onClick={logout}>登出</a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </nav>
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
                </div>

            </div>
        </div>
    );
}


export default home;
