import * as React from 'react';
import {RouteComponentProps } from 'react-router';
import { CityData } from '../../class/CityData';
import { EmployeeData } from '../../class/EmployeeData';
import axios from 'axios';

interface AddEmployeeDataState{
    title:string;
    loading:boolean;
    cityList: CityData[];
    empData: EmployeeData;
    checkExistUser: boolean;
    alt:'Upload an Image';
    src:any;
    setImg:any;
}

export class AddEmployee extends React.Component<RouteComponentProps<{}>, AddEmployeeDataState>{
    constructor(props){
        super(props);
        this.state = { title: "", loading: true, cityList: [], empData: new EmployeeData, checkExistUser:false,src:'/img/image_placeholder.png',setImg:null,alt:'Upload an Image'};

        
        axios.get(`api/City/Index`)
        .then(res => {
            this.setState({cityList:res.data})
        });

        var empid = this.props.match.params["empid"];  

        // This will set state for Edit employee  
        if (empid > 0) {  
               axios.get(`api/Employee/Details/${empid}`)
               .then(res=>{
                  this.setState({ title: "Update", loading: false, empData: res.data });  
               })
        }  
  
        // This will set state for Add employee  
        else {  
            this.state = { title: "Create Employee", loading: false, cityList: [], empData: new EmployeeData, checkExistUser:false,src:'/img/image_placeholder.png',setImg:null,alt:'Upload an Image'};
        }  
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


    componentDidMount(){
        
    }


    private handleSave(event) {  
        event.preventDefault();  
        const data = new FormData(event.target);  
 
        if (this.state.empData.employeeId) {
                axios.put(`api/Employee/Edit`,data)
                .then(res => {
                     if(res.data['value']=="Updated")
                        this.props.history.push("/fetchemployee");
                });
        }   
        else { 

            axios.post('api/Employee/Create',data)
            .then(responseJson=>{
                let checkUser = responseJson.data['value'];
                if(checkUser){
                        this.setState({checkExistUser: false});
                    this.props.history.push("/fetchemployee");
                }else
                this.setState({checkExistUser:true});
            });
        }  
    }

    private showPreview(e){
        if(e.target.files[0]) {
        this.setState({src: URL.createObjectURL(e.target.files[0]),alt: e.target.files[0].name,setImg:URL.createObjectURL(e.target.files[0])});
        }
    }
    
    private handleCancel(e) {  
        e.preventDefault();  
        this.props.history.push("/fetchemployee");  
    }  

    private renderCreateForm(cityList: Array<any>) {  
        let profileImageSource;

        if(this.state.src==null)
        profileImageSource=this.state.src;

        if(this.state.title=="Update" && this.state.empData.imageName==null)
            profileImageSource=this.state.src;
        else{
            profileImageSource=this.state.empData.imageSrc;
            if(this.state.setImg!=null)
                profileImageSource=this.state.setImg;
        }

        if(this.state.title=="Create Employee")
            profileImageSource=this.state.src;

        return (  
            <form onSubmit={e => this.handleSave(e)} >  
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
                <div className="form-group row">
                    <label htmlFor="imageFile" className="control-label col-md-12">Image</label>
                    <div className="col-md-4">
                             <img src={profileImageSource} width="200" height="200" />
                        <input type="file" name="imageFile" accept="image/*" className="form-control-file"
                        onChange={(e) => this.showPreview(e)} id="image-uploader" />
                    </div>

                </div>
                {this.state.checkExistUser == true ? <p className="text-danger">User you are trying to create is already present.</p> : ''}
                <div className="form-group">  
                    <button type="submit" className="btn btn-success">{this.state.title=="Create Employee" ? "Save" : "Update" }</button>  &nbsp;
                    <button className="btn btn-danger" onClick={e => this.handleCancel(e)}>Cancel</button>  
                </div >  
            </form>
        )  
    }  
  


}


