import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { TaskData } from '../../class/TaskData';
import '../../custom.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

interface FetchTasksDataState {
    tasklist: TaskData[];
    loading: boolean;
}

export class FetchTaskComponent extends React.Component<RouteComponentProps<{}>, FetchTasksDataState> {
    constructor(props: RouteComponentProps<{}>) {
        super(props);
        this.state = { tasklist: [], loading: true };
    }

    componentDidMount() {
        const authorize = localStorage.getItem('login')
        
        if(!authorize)
            this.props.history.push("/login");
        else this.GetTask(localStorage.getItem('email'));
    }

    public render() {
        let noData = this.state.tasklist.length == 0 ? false : true;
        let contents = this.state.loading ? <p><em>Loading...</em></p> : noData ? this.renderTaskTable(this.state.tasklist) : <p>There are no tasks associated with this user yet</p>;
        let visibileAction = localStorage.getItem('login') ? true : false;

        return <div>
            <h1>Task List</h1>
            <p>This component retrieves the activity list of the logged in user from the server.</p>
            {visibileAction && <p>
                <Link to="/addnewtask">Create New Task</Link>
            </p>}
            {contents}
        </div>;
    }

    private GetTask(email: string) {
        axios.get(`api/Tasks/Index/${email}`).then(res => {
            this.setState({ tasklist: res.data, loading: false });
        });
    }

    private async DeleteTask(id) {
        await axios.delete(`api/Tasks/Delete/${id}`).then(res => {
            this.setState({
                tasklist: this.state.tasklist.filter((rec) => {
                    return (rec.tasksId != id);
                })
            });
            toast.success("Tasks successfully eliminated");
        });
    }

    private handleDelete(id: number) {
        if (!window.confirm("Do you want to delete city with Id: " + id + "?"))
            return;
        else this.DeleteTask(id);
    }

    private handleEdit(id: number) {
        this.props.history.push("/task/edit/" + id);
    }

    private renderTaskTable(tasklist: TaskData[]) {
        let visibileAction = localStorage.getItem('login') ? true : false;
        return <table className='table table-striped'>
            <thead>
                <tr>
                    <th scope="col">Task Id</th>
                    <th scope="col">Task Name</th>
                    <th scope="col">User</th>
                    <th scope="col">Status</th>
                    {visibileAction && <th scope="col">Actions</th>}
                </tr>
            </thead>
            <tbody>
                {tasklist.map(task =>
                    <tr key={task.tasksId}>
                        <td>{task.tasksId}</td>
                        <td>{task.tasksName}</td>
                        <td>{task.userEmail}</td>
                        <td>{task.taskStatusName}</td>
                        {visibileAction && <td>
                            <FontAwesomeIcon icon={faInfoCircle} className="icon-details" onClick={(id) => this.handleEdit(task.tasksId)} /> &nbsp;
                            <FontAwesomeIcon icon={faTrash} className="icon-delete" onClick={(id) => this.handleDelete(task.tasksId)} />
                        </td>}
                    </tr>
                )}
            </tbody>
        </table>;
    }
}