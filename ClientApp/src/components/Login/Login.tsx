import * as React from 'react'; 
import {RouteComponentProps } from 'react-router';
import { UserData } from '../../class/UserData';
import axios from 'axios';

interface FetchUserDataDataState{
    title:string;
    userlist: UserData;
    loading: boolean;
    checkUserLogged:boolean;
}

export class LoginComponent extends React.Component<RouteComponentProps<{}>, FetchUserDataDataState> { 
  
    constructor(props){
        super(props);
        this.state = { title: "", loading: false, userlist: new UserData, checkUserLogged:false };
    }


    public render(){
        let contents = this.state.loading ? <p><em>Loading...</em></p> : this.renderCreateForm();

    return <div>  
        <h1>{this.state.title}</h1>  
         <p>This form allows you to login</p>
        <hr />  
        {contents}  
    </div>;  
    }

    private handleCancel(e){
        e.preventDefault();  
        this.props.history.push("");  
    }

    private handleSave(e){
        e.preventDefault();  
        const data = new FormData(e.target);  
            axios.post('api/login/Login',data)
            .then(responseJson=>{
                if(!responseJson.data)
                    this.setState({checkUserLogged: true});
                 else{
                     this.setState({checkUserLogged: false});
                     localStorage.setItem('login', "true");
                     window.location.href='/fetchemployee';
                 }
            });
            
    }

    private renderCreateForm(){
        const authorize = localStorage.getItem('login')
        
        if(authorize)
            this.props.history.push("/fetchDepartment");

        return (  
            <form onSubmit={(e)=>this.handleSave(e)} >  
                <div className="form-group row" >  
                    <input type="hidden" name="userId" value={this.state.userlist.UserId} />  
                </div>  
              
                < div className="form-group row" >  
                    <label className=" control-label col-md-12" htmlFor="Email">Email:</label>  
                    <div className="col-md-4">  
                        <input className="form-control" type="text" name="email" defaultValue={this.state.userlist.Email} required />  
                    </div>  
                </div>  

                < div className="form-group row" >  
                    <label className=" control-label col-md-12" htmlFor="Password">Password:</label>  
                    <div className="col-md-4">  
                        <input className="form-control" type="password" name="password" defaultValue={this.state.userlist.Password} required />  
                    </div>  
                </div>  

                <div className="form-group mb-2 mt-2">  
                    <button type="submit" className="btn btn-success">Login</button>  &nbsp;
                    <button className="btn btn-danger" onClick={(e)=>this.handleCancel(e)}>Cancel</button>  
                </div>  
            </form >  
        )  
    }


}