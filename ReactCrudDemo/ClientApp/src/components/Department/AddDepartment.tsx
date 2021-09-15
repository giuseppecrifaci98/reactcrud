import * as React from 'react'; 
import {RouteComponentProps } from 'react-router';
import { DepartmentData } from '../../class/DepartmentData';
import axios from 'axios';

interface FetchDepartmentDataState{
    title:string;
    departmentList: DepartmentData;
    loading: boolean;
    checkExistDepartment:boolean;
}

export class AddDepartment extends React.Component<RouteComponentProps<{}>, FetchDepartmentDataState> { 
    constructor(props: RouteComponentProps<{}>){
        super(props);
        this.state = { title: "", loading: true, departmentList: new DepartmentData, checkExistDepartment:false };

        var depid = this.props.match.params["depid"];  

        if(depid>0)
            this.DepartmentDetails(depid);
        else
            this.state = { title: "Create Department", loading: false, departmentList: new DepartmentData, checkExistDepartment:false }; 
    }

    public render(){
        let contents = this.state.loading ? <p><em>Loading...</em></p> : this.renderCreateForm();

    return <div>  
        <h1>{this.state.title}</h1>  
        {this.state.title=="Edit" ? <p>This form allows you to update the Department </p> : <p>This form allows you to create a new Department</p> }
        <hr />  
        {contents}  
    </div>;  
    }

    private async DepartmentDetails(id){
        await axios.get(`api/Department/Details/${id}`)
        .then(res=>{
         this.setState({ title: "Edit", loading: false, departmentList: res.data });  
        });
    }

    private async DepartmentEdit(data:FormData){
        await axios.put(`api/Department/Edit`, data)
        .then(res => {
            this.props.history.push("/fetchDepartment");  
        });
    }

    private async DepartmentCreate(data:FormData){
       await axios.post('api/Department/Create',data)
        .then(responseJson=>{
            if(responseJson.data==0)
            this.setState({checkExistDepartment: true});
            else{
                this.setState({checkExistDepartment: false});
            this.props.history.push("/fetchDepartment");
            }
        });
    }

    private handleCancel(e){
        e.preventDefault();  
        this.props.history.push("/fetchcity");  
    }

    private handleSave(e){
        e.preventDefault();  
        const data = new FormData(e.target);  

        if (this.state.departmentList.departmentId) 
            this.DepartmentEdit(data);
        else
            this.DepartmentCreate(data);

    }

    private renderCreateForm(){
        return (  
            <form onSubmit={(e)=>this.handleSave(e)} >  
                <div className="form-group row" >  
                    <input type="hidden" name="departmentId" value={this.state.departmentList.departmentId} />  
                </div>  
                < div className="form-group row" >  
                    <label className=" control-label col-md-12" htmlFor="departmentName">Name</label>  
                    <div className="col-md-4">  
                        <input className="form-control" type="text" name="departmentName" defaultValue={this.state.departmentList.departmentName} required />  
                    </div>  
                </div>  

                {this.state.checkExistDepartment == true ? <p className="text-danger">The department you are trying to add already exists.</p> : ''}

                <div className="form-group mb-2 mt-2">  
                    <button type="submit" className="btn btn-success">{this.state.title=="Create Department" ? "Save" : "Update" }</button>  &nbsp;
                    <button className="btn btn-danger" onClick={(e)=>this.handleCancel(e)}>Cancel</button>  
                </div>  
            </form >  
        )  
    }


}