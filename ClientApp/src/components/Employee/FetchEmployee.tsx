import * as React from 'react'; 
import ReactDOM from 'react-dom'
import {RouteComponentProps } from 'react-router';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

interface FetchEmployeeDataState{
    empList: EmployeeData[];
    loading: boolean;
}

export class FetchEmployee extends React.Component<RouteComponentProps<{}>, FetchEmployeeDataState> { 
    constructor() {
       super();
        this.state = { empList: [], loading: true };  

        fetch('api/Employee/Index')  
        .then(response => response.json() as Promise<EmployeeData[]>)  
        .then(data => {  
            this.setState({ empList: data, loading: false });  
        }); 

         // This binding is necessary to make "this" work in the callback  
         this.handleDelete = this.handleDelete.bind(this);  
         this.handleEdit = this.handleEdit.bind(this); 
    }

   public render(){
        let contents = this.state.loading  ? <p><em>Loading...</em></p>   : this.renderEmployeeTable(this.state.empList);  

    return <div>  
        <h1>Employee Data</h1>  
        <p>This component fetching Employee data from the server.</p>  
        <p>  
            <Link to="/addemployee">Create New</Link>  
        </p>  
        {contents}  
    </div>;  
    }

     // Handle Delete request for an employee  
     private handleDelete(id: number) {  
        if (!window.confirm("Do you want to delete employee with Id: " + id + "?"))  
            return;  
        else {  
            fetch('api/Employee/Delete/' + id, {  
                method: 'delete'  
            }).then(data => {  
                this.setState(  
                    {  
                        empList: this.state.empList.filter((rec) => {  
                            return (rec.employeeId != id);  
                        })  
                    });  
            });  
        }  
    } 

    private handleEdit(id: number) {  
        this.props.history.push("/employee/edit/" + id);  
    }  

       // Returns the HTML table to the render() method.  
       private renderEmployeeTable(empList: EmployeeData[]) {  
        return <table className='table table-striped'>  
            <thead>  
                <tr>  
                    <th scope="col">EmployeeId</th>  
                    <th scope="col">Name</th>  
                    <th scope="col">Gender</th>  
                    <th scope="col">Department</th>  
                    <th scope="col">City</th>  
                    <th scope="col">Action</th>
                </tr>  
            </thead>  
            <tbody>  
                {empList.map(emp =>  
                    <tr key={emp.employeeId}>  
                        <td>{emp.employeeId}</td>  
                        <td>{emp.name}</td>  
                        <td>{emp.gender}</td>  
                        <td>{emp.department}</td>  
                        <td>{emp.city}</td>  
                        <td>  
                            <FontAwesomeIcon icon={faInfoCircle}  onClick={(id) => this.handleEdit(emp.employeeId)} /> &nbsp;
                            <FontAwesomeIcon icon={faTrash} onClick={(id) => this.handleDelete(emp.employeeId)} />
                        </td>  
                    </tr>  
                )}  
            </tbody>  
        </table>;  
    }



}

export class EmployeeData {  
    employeeId: number = 0;  
    name: string = "";  
    gender: string = "";  
    city: string = "";  
    department: string = "";  
} 

