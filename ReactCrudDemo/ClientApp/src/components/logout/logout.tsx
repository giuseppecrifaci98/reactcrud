import * as React from 'react'; 
import {RouteComponentProps } from 'react-router';
import { UserData } from '../../class/UserData';
import axios from 'axios';

interface FetchUserDataDataState{
    title:string;
    userlist: UserData;
    loading: boolean;
    Islogged:boolean;
}

export class LogoutComponent extends React.Component<RouteComponentProps<{}>, FetchUserDataDataState> { 
    constructor(props: RouteComponentProps<{}>){
        super(props);
        this.state = { title: "", loading: false, userlist: new UserData, Islogged:false };
    }

    public render(){
        let contents = this.state.loading ? <p><em>Loading...</em></p> : this.renderCreateForm();

    return <div>  
        <h1>{this.state.title}</h1>  
         <p>This form allows you log out the application</p> 
        <hr />  
        {contents}  
    </div>;  
    }

    private async Logout(){
       await axios.post('api/login/Logout')
        .then(responseJson=>{
          if(responseJson.data=='')
            localStorage.removeItem('login');
            window.location.href='/';
        });
    }

    componentDidMount(){
        if (window.confirm("Vuoi effettuare il logout?"))
            this.Logout(); 
        else
        this.props.history.push('/');
    }

    private renderCreateForm(){
        return;
    }


}