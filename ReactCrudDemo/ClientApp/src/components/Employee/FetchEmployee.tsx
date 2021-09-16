import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { EmployeeData } from '../../class/EmployeeData';
import '../../custom.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

interface FetchEmployeeDataState {
    empList: EmployeeData[];
    loading: boolean;
    errorMessage?: string;
}

export class FetchEmployee extends React.Component<RouteComponentProps<{}>, FetchEmployeeDataState> {
    constructor(props: RouteComponentProps<{}>) {
        super(props);
        this.state = { empList: [], loading: true };
    }

    public render() {
        let visibileAction = localStorage.getItem('login') ? true : false;
        let noData = !visibileAction && this.state.empList.length == 0 ? this.state.errorMessage : visibileAction && this.state.empList.length > 0 ? true : false;
        let contents = this.state.loading ? <p><em>Loading...</em></p> : noData ? this.renderEmployeeTable(this.state.empList) : <p>No Data</p>;

        return <div>
            <h1>Employee Data</h1>
            <p>This component fetching Employee data from the server.</p>
            {!visibileAction && <p>To see this section you must be authenticated. If you are not authenticated try to login</p>}
            {visibileAction && <p>
                <Link to="/addemployee">Create New</Link>
            </p>}
            {contents}
        </div>;
    }

    private async getEmployee() {
        await axios.get('api/Employee/Index').then(res => {
            this.setState({ empList: res.data, loading: false });
        }).catch(err => {
            this.setState({ empList: [], loading: false, errorMessage: "To see this section you must be authenticated. If you are not authenticated try to login" });
        });
    }

    componentDidMount() {
        this.getEmployee();
    }


    private async DeleteEmployee(id: number) {
        await axios.delete(`api/Employee/Delete/${id}`).then(res => {
            this.setState({
                empList: this.state.empList.filter((rec) => {
                    return (rec.employeeId != id);
                })
            });
        });
        toast.success("Employee deleted successfully");
    }

    private handleDelete(id: number) {
        if (!window.confirm("Do you want to delete employee with Id: " + id + "?"))
            return;
        else
            this.DeleteEmployee(id);
    }

    private handleEdit(id: number) {
        this.props.history.push("/employee/edit/" + id);
    }

    private renderEmployeeTable(empList: EmployeeData[]) {
        const visibileAction = localStorage.getItem('login') ? true : false;
        const contentShow = this.state.errorMessage != null ? <Link to="/login">Login</Link> :
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th scope="col">EmployeeId</th>
                        <th scope="col">Name</th>
                        <th scope="col">Gender</th>
                        <th scope="col">Department</th>
                        <th scope="col">City</th>
                        {visibileAction && <th scope="col">Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {empList.map(emp =>
                        <tr key={emp.employeeId}>
                            <td>{emp.employeeId}</td>
                            <td>{emp.name}</td>
                            <td>{emp.gender}</td>
                            <td>{emp.departmentName}</td>
                            <td>{emp.cityName}</td>
                            {visibileAction && <td>
                                <FontAwesomeIcon icon={faInfoCircle} className="icon-details" onClick={(id) => this.handleEdit(emp.employeeId)} /> &nbsp;
                                <FontAwesomeIcon icon={faTrash} className="icon-delete" onClick={(id) => this.handleDelete(emp.employeeId)} />
                            </td>
                            }
                        </tr>
                    )}
                </tbody>
            </table>;

        return contentShow;
    }
}

