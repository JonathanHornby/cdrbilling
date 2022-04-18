import React from 'react';
import './Main.css';
import NavList from '../NavList/NavList';
import Home from '../Home/Home';
import ContentWindow from '../ContentWindow/ContentWindow';
import Util from '../../Util/Util';

/**  Main component acts as a container for the components which will display the navigation list on the left and the tabulated data in the right */

class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            customerList: [],
            customerNavList: [],
            userNavList: [],
            userList: [],
            customerId: "2",
            userId: "625aa3149b7bd6be98524d11",
            customer: "",
            user: "",
            recordsData: "",
            simData: ""
        }

        this.changeCustomer = this.changeCustomer.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.getRecordsData = this.getRecordsData.bind(this);
        this.getCaller = this.getCaller.bind(this);
        this.getCustomer = this.getCustomer.bind(this);
        this.getCustomerData('customer', this.state.customerId);
        this.getCustomerData('user', this.state.userId);
        this.getRecordsData();
        this.getSimData();
    }

    
    async getSimData() {
        const response = await fetch('./sims.json',{
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        const data = await response.json();
        this.setState({simData: data});
    }

    async getRecordsData(type = "all", id = "0") {
        let sortedData = [];
        if(type === "customer") {
            return 1;
        } else if(type === "user") {
            return 1;
        } else if(type === "all") {
            const response = await fetch('./calls.json',{
                headers : { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            const data = await response.json();
            sortedData = Util.sortByDate(data);
        }
        this.setState({recordsData: sortedData})
    }

    changeCustomer(e, type = 'Customer') {
        if(type === 'Customer') {
            this.setState({customerId: e.target.id});
        } else if(type === 'User') {
            this.setState({userId: e.target.id});
        }
    }

    handleSearch(e, type) {
        if(type === 'CustomerSearch') {
            const regex = new RegExp(e.target.value, 'i')
            const custArray = this.state.customerList.filter((customer) => { return customer.name.match(regex)});
            this.setState({customerNavList: custArray})
        } else if(type === 'UserSearch') {
            const regex = new RegExp(e.target.value, 'i')
            const userArray = this.state.userList.filter((user) => { return user.name.match(regex)});
            this.setState({userNavList: userArray})
        }
    }

    // This should be API calls to fetch data from Database, but we are just using local .json files instead during development
    async getCustomerData(type = 'customer', id = this.state.customerId){
        if(type === 'customer') {
            const response = await fetch('./customers.json',{
                headers : { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            const data = await response.json();
            const customer = data.find(item => item.id === id);
            const sortedCustomers = Util.sortByName(data);
            this.setState({
                "customer": customer,
                "customerList": sortedCustomers,
                "customerNavList": sortedCustomers
                });

        } else if(type === 'user') {
            const response = await fetch('./users.json',{
                headers : { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            const data = await response.json();
            const user = data.find(item => item.id === id);
            const sortedUsers = Util.sortByName(data);
            this.setState({
                "user": user,
                "userList": sortedUsers,
                "userNavList": sortedUsers
                });
        }
     }

     componentDidUpdate(prevProps, prevState) {
        if(prevState.customerId !== this.state.customerId) { 
            this.getCustomerData('customer', this.state.customerId);
        }
        if(prevState.userId !== this.state.userId) { 
            this.getCustomerData('user', this.state.userId);
        }
     }

     getUser(id) {
        return this.state.userList.find(user => user.index === id);
     }

     getCaller(simid) {
        const userid = this.state.simData.find(sim => sim.index === simid).user;
        return this.state.userList.find(user => user.index === userid);
     }

     getCustomer(customerid) {
        return this.state.customerList.find(customer => customer.index === customerid);
     }

    render() {
        let mainLeft = '';
        let mainRight = '';
        let view = this.props.view;

        if(this.props.view === 'Home') {
            mainLeft = '';
            mainRight = <Home />;
        } else if (this.props.view === 'Customers') {
            mainLeft = <NavList customerList={this.state.customerNavList} view={view} customerChange={this.changeCustomer} searchBarChange={this.handleSearch} />
            mainRight = <ContentWindow view={view} customer={this.state.customer} />
        } else if (this.props.view === 'Users') {
            mainLeft = <NavList userList={this.state.userNavList} view={view} customerChange={this.changeCustomer} searchBarChange={this.handleSearch} />
            mainRight = <ContentWindow view={view} user={this.state.user}/>
        } else if (this.props.view === 'Records') {
            mainLeft = <NavList view={view} />
            mainRight = <ContentWindow view={view} recordsData={this.state.recordsData} getCaller={this.getCaller} getCustomer={this.getCustomer} />
        } else if (this.props.view === 'Reports') {
            mainLeft = <NavList view={view} />
            mainRight = <ContentWindow view={view} />
        }

        return (
            <div className='MainWindow'>
                {/* MainLeft to display lists of customers / users / reports to select for display in MainRight */}
                <div className="MainLeft">
                    {mainLeft}
                </div>
                {/* MainRight to display table data for the selected option in MainLeft */}
                <div className="MainRight">
                    {mainRight}
                </div>
            </div>
        )
    }
}

export default Main;