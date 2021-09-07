import * as React from 'react';
import {RouteComponentProps } from 'react-router';
import { CityData } from '../../class/CityData';
import { EmployeeData } from '../../class/EmployeeData';

interface AddEmployeeDataState{
    title:string;
    loading:boolean;
    cityList: CityData[];
    empData: EmployeeData;
    checkExistUser: boolean;
}

export class AddEmployee extends React.Component<RouteComponentProps<{}>, AddEmployeeDataState>{
    constructor(props){
        super(props);
        this.state = { title: "", loading: true, cityList: [], empData: new EmployeeData, checkExistUser:false }; 

        fetch('api/City/Index')  
        .then(response => response.json() as Promise<CityData[]>)  
        .then(data => {  
            this.setState({ cityList: data });  
        });  

        var empid = this.props.match.params["empid"];  

        // This will set state for Edit employee  
        if (empid > 0) {  
            fetch('api/Employee/Details/' + empid)  
                .then(response => response.json() as Promise<EmployeeData>)  
                .then(data => {  
                    this.setState({ title: "Edit", loading: false, empData: data });  
                });  
        }  
  
        // This will set state for Add employee  
        else {  
            this.state = { title: "Create Employee", loading: false, cityList: [], empData: new EmployeeData, checkExistUser:false };  
        }  
  
        // This binding is necessary to make "this" work in the callback  
        this.handleSave = this.handleSave.bind(this);  
        this.handleCancel = this.handleCancel.bind(this);  
    }

    public render(){
        let contents = this.state.loading  
        ? <p><em>Loading...</em></p>  
        : this.renderCreateForm(this.state.cityList);  

    return <div>  
        <h1>{this.state.title}</h1>  
    <p>This form allows you to create a new Employee</p>  
        <hr />  
        {contents}  
    </div>;  
    }

    private handleSave(event) {  
        event.preventDefault();  
        const data = new FormData(event.target);  
  
        // PUT request for Edit employee.  
        if (this.state.empData.employeeId) {  
            fetch('api/Employee/Edit', {  
                method: 'PUT',  
                body: data,
            }).then(response => response.json())
                .then((responseJson) => {  
                    this.props.history.push("/fetchemployee");  
                });  
        }   
  
        // POST request for Add employee.  
        else {  
            fetch('api/Employee/Create', {  
                method: 'POST',  
                body: data, 
            }).then((response) => response.json())  
                .then((responseJson) => {  
                    if(responseJson==0)
                    this.setState({checkExistUser: true});
                    else{
                        this.setState({checkExistUser: false});
                    this.props.history.push("/fetchemployee");
                    }
                })  
        }  
    }
    
    private handleCancel(e) {  
        e.preventDefault();  
        this.props.history.push("/fetchemployee");  
    }  

    private renderCreateForm(cityList: Array<any>) {  
        return (  
            <form onSubmit={this.handleSave} >  
                <div className="form-group row" >  
                    <input type="hidden" name="employeeId" value={this.state.empData.employeeId} />  
                </div>  
                < div className="form-group row" >  
                    <label className=" control-label col-md-12" htmlFor="Name">Name</label>  
                    <div className="col-md-4">  
                        <input className="form-control" type="text" name="name" defaultValue={this.state.empData.name} required />  
                    </div>  
                </div >  
                <div className="form-group row">  
                    <label className="control-label col-md-12" htmlFor="Gender">Gender</label>  
                    <div className="col-md-4">  
                        <select className="form-control" data-val="true" name="gender" defaultValue={this.state.empData.gender} required>  
                            <option value="">-- Select Gender --</option>  
                            <option value="Male">Male</option>  
                            <option value="Female">Female</option>  
                        </select>  
                    </div>  
                </div >  
                <div className="form-group row">  
                    <label className="control-label col-md-12" htmlFor="Department" >Department</label>  
                    <div className="col-md-4">  
                        <input className="form-control" type="text" name="Department" defaultValue={this.state.empData.department} required />  
                    </div>  
                </div>  
                <div className="form-group row">  
                    <label className="control-label col-md-12" htmlFor="City">City</label>  
                    <div className="col-md-4">  
                        <select className="form-control" data-val="true" name="City" defaultValue={this.state.empData.city} required>  
                            <option value="">-- Select City --</option>  
                            {cityList.map(city =>  
                                <option key={city.cityId} value={city.cityName}>{city.cityName}</option>  
                            )}  
                        </select>  
                    </div>  
                </div>  
                {this.state.checkExistUser == true ? <p className="text-danger">User you are trying to create is already present.</p> : ''}
                <div className="form-group">  
                    <button type="submit" className="btn btn-success">{this.state.title=="Create Employee" ? "Save" : "Update" }</button>  &nbsp;
                    <button className="btn btn-danger" onClick={this.handleCancel}>Cancel</button>  
                </div >  
            </form >  
        )  
    }  
  


}