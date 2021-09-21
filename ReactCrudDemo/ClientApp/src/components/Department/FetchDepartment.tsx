import * as React from 'react'; 
import {RouteComponentProps } from 'react-router';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { DepartmentData } from '../../class/DepartmentData';
import '../../custom.css';
import axios from 'axios';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

interface FetchDepartmentDataState{
    depList: DepartmentData[];
    loading: boolean;
}

export class FetchDepartment extends React.Component<RouteComponentProps<{}>, FetchDepartmentDataState> { 
    constructor(props: RouteComponentProps<{}>){
        super(props);
        this.state = { depList: [], loading: true }; 
    }

    public render(){
        
     let noData = this.state.depList.length==0 ? false: true;
     let contents = this.state.loading  ? <p><em>Loading...</em></p>   : noData ? this.renderDepartmentTable(this.state.depList) : <p>No Data</p>;
     let visibileAction = localStorage.getItem('role')=='admin'  ? true: false;

    return <div>  
        <h1>Department Data</h1>  
        <p>This component fetching Department data from the server.</p>  
        {visibileAction && <p>  
             <Link to="/adddepartment">Create New</Link>  
        </p>}
        {contents}  
    </div>;  
    }

    private async getDepartmentList(){
        await axios.get('api/Department/Index').then(res =>  {
            this.setState({ depList: res.data, loading: false });  
        });
    }

    private async DeleteDepartment(id){
       await axios.delete(`api/Department/Delete/${id}`).then(res => {
            this.setState({depList: this.state.depList.filter((rec) => { 
                return (rec.departmentId != id);  
                 })  
            });  
          });

          toast.success("Department deleted successfully");
    }

    componentDidMount(){
       this.getDepartmentList();
    }

    private handleDelete(id: number) {  
        if (!window.confirm("Do you want to delete department with Id: " + id + "?"))  
            return;  
        else 
            this.DeleteDepartment(id);
    } 

    private handleEdit(id: number) {  
        this.props.history.push("/department/edit/" + id);  
    }  

    private renderDepartmentTable(deplist: DepartmentData[]) {  
        let visibileAction = localStorage.getItem('role')=='admin'  ? true: false;
        let contentShow = visibileAction ? 
         <table className='table table-striped'>  
            <thead>  
                <tr>  
                    <th scope="col">Department Id</th>  
                    <th scope="col">Department Name</th>  
                    {visibileAction && <th scope="col">Actions</th>}
                </tr>  
            </thead>  
            <tbody>  
                {deplist.map(dep =>  
                    <tr key={dep.departmentId}>  
                        <td>{dep.departmentId}</td>
                        <td>{dep.departmentName}</td>  
                        {visibileAction && <td>  
                            <FontAwesomeIcon icon={faInfoCircle} className="icon-details" onClick={(id) => this.handleEdit(dep.departmentId)} /> &nbsp;
                            <FontAwesomeIcon icon={faTrash} className="icon-delete" onClick={(id) => this.handleDelete(dep.departmentId)} />
                        </td>}
                    </tr>  
                )}  
            </tbody>  
        </table> :  <p>Section available only for administrators</p>;
        return contentShow;
    }

    

}
