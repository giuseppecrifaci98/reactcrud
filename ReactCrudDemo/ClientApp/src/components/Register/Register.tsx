import * as React from 'react'; 
import {RouteComponentProps } from 'react-router';
import { UserData } from '../../class/UserData';
import axios from 'axios';

interface FetchUserDataDataState{
    title:string;
    userlist: UserData;
    loading: boolean;
    checkExistUser:boolean;
}

export class RegisterComponent extends React.Component<RouteComponentProps<{}>, FetchUserDataDataState> { 
    constructor(props: RouteComponentProps<{}>){
        super(props);
        this.state = { title: "", loading: false, userlist: new UserData, checkExistUser:false };
    }

    public render(){
        let contents = this.state.loading ? <p><em>Loading...</em></p> : this.renderCreateForm();

    return <div>  
        <h1>{this.state.title}</h1>  
        <p>This form allows you to sign in</p>
        <hr />  
        {contents}  
    </div>;  
    }

    private handleCancel(e){
        e.preventDefault();  
        this.props.history.push("");  
    }

    private async Register(data:FormData){
        await axios.post('api/login/Register',data)
        .then(responseJson=>{
            if(responseJson.data['value']=="Already registered user")
            this.setState({checkExistUser: true});
            else{
                this.setState({checkExistUser: false});
                this.props.history.push("/login");
            }
        });
    }

    private handleSave(e){
        e.preventDefault();  
        const data = new FormData(e.target);  
        this.Register(data);
    }

    private renderCreateForm(){
        return (  
            <form onSubmit={(e)=>this.handleSave(e)} >  
                <div className="form-group row" >  
                    <input type="hidden" name="userId" value={this.state.userlist.userId} />  
                </div>  
                < div className="form-group row" >  
                    <label className=" control-label col-md-12" htmlFor="Username">Username:</label>  
                    <div className="col-md-4">  
                        <input className="form-control" type="text" name="username" defaultValue={this.state.userlist.username} required />  
                    </div>  
                </div>  

                < div className="form-group row" >  
                    <label className=" control-label col-md-12" htmlFor="Email">Email:</label>  
                    <div className="col-md-4">  
                        <input className="form-control" type="text" name="email" defaultValue={this.state.userlist.email} required />  
                    </div>  
                </div>  

                < div className="form-group row" >  
                    <label className=" control-label col-md-12" htmlFor="Password">Password:</label>  
                    <div className="col-md-4">  
                        <input className="form-control" type="password" name="password" defaultValue={this.state.userlist.password} required />  
                    </div>  
                </div>  

                {this.state.checkExistUser == true ? <p className="text-danger">The user you are trying to add already exists.</p> : ''}

                <div className="form-group mb-2 mt-2">  
                    <button type="submit" className="btn btn-success">Create User</button>  &nbsp;
                    <button className="btn btn-danger" onClick={(e)=>this.handleCancel(e)}>Cancel</button>  
                </div>  
            </form >  
        )  
    }


}