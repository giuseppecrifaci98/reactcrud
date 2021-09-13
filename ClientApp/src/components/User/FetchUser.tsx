import * as React from 'react'; 
import {RouteComponentProps } from 'react-router';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { UserData } from '../../class/UserData';
import '../../custom.css';
import axios from 'axios';

interface FetchUsereDataState{
    userlist: UserData[];
    loading: boolean;
    errorMessage?:string;
}

export class FetchUsersComponent extends React.Component<RouteComponentProps<{}>, FetchUsereDataState> { 
    constructor(props: RouteComponentProps<{}>) {
       super(props);
        this.state = { userlist: [], loading: true }; 
    }

    private getUsers(){
        axios.get('api/User/Index').then(res =>  {
            this.setState({ userlist: res.data, loading: false }); 
        }).catch(err=> {
            this.setState({userlist: [], loading: false, errorMessage:"To see this section you must be authenticated. If you are not authenticated try to login" }); 
        });
    }

    componentDidMount(){
        this.getUsers();
    }

    public render(){
        let visibileAction = localStorage.getItem('login')  ? true: false;
         let noData = !visibileAction && this.state.userlist.length==0 ? this.state.errorMessage: visibileAction && this.state.userlist.length > 0 ? true :false;
         let contents = this.state.loading  ? <p><em>Loading...</em></p>   : noData ? this.renderEmployeeTable(this.state.userlist) : <p>No Data</p>;
    
        return <div>  
            <h1>User Data</h1>  
            <p>This component fetching Employee data from the server.</p>  
            {!visibileAction && <p>To see this section you must be authenticated. If you are not authenticated try to login</p>}
            {visibileAction && <p>  
                <Link to="/register">Create New</Link>  
            </p>}
            {contents}  
        </div>;  
        }

        private DeleteUser(id){
            axios.delete(`api/User/Delete/${id}`).then(res => {
                this.setState({userlist: this.state.userlist.filter((rec) => { 
                    return (rec.userId != id);  
                     })  
                });  
              })
        }

        private handleDelete(id: number) {  
            if (!window.confirm("Do you want to delete employee with Id: " + id + "?"))  
                return;  
            else 
                this.DeleteUser(id);
        } 
    
        private handleEdit(id: number) {  
            this.props.history.push("/user/edit/" + id);  
        }  

        private renderEmployeeTable(userlist: UserData[]) {
            const visibileAction=  localStorage.getItem('login')  ? true: false;
            const contentShow = this.state.errorMessage != null ? <Link to="/login">Login</Link> : 
            <table className='table table-striped'>  
                <thead>  
                    <tr>  
                        <th scope="col">UserId</th>  
                        <th scope="col">Username</th>  
                        <th scope="col">Email</th>  
                        {visibileAction && <th scope="col">Actions</th>}
                    </tr>  
                </thead>  
                <tbody>  
                    {userlist.map(use =>  
                        <tr key={use.userId}>  
                            <td>{use.userId}</td>
                            <td>{use.username}</td>  
                            <td>{use.email}</td>  
                           {visibileAction && <td>  
                                <FontAwesomeIcon icon={faInfoCircle} className="icon-details" onClick={(id) => this.handleEdit(use.userId)} /> &nbsp;
                                <FontAwesomeIcon icon={faTrash} className="icon-delete" onClick={(id) => this.handleDelete(use.userId)} />
                            </td>  
                            }
                        </tr>  
                    )}  
                </tbody>  
            </table>; 
    
            return contentShow;
        
     }


}