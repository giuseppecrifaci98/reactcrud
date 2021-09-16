import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { TaskData } from '../../class/TaskData';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TaskStatusData } from '../../class/TaskStatusData';
toast.configure();

interface CreateTaskDataState {
    title: string;
    tasklist: TaskData;
    loading: boolean;
    checkExistTask: boolean;
    taskStatuslist: TaskStatusData[];
}

export class CreateTaskComponent extends React.Component<RouteComponentProps<{}>, CreateTaskDataState> {
    constructor(props: RouteComponentProps<{}>) {
        super(props);
        this.state = { title: "", loading: true, taskStatuslist: [], tasklist: new TaskData, checkExistTask: false };

        var taskid = this.props.match.params["taskid"];

        if (taskid > 0)
            this.TasksDetails(taskid);
        else
            this.state = { title: "Create Tasks", taskStatuslist: [], loading: false, tasklist: new TaskData, checkExistTask: false };
    }

    public render() {
        let contents = this.state.loading ? <p><em>Loading...</em></p> : this.renderCreateForm();

        return <div>
            <h1>{this.state.title}</h1>
            <p>This form allows you to create a new Tasks</p>
            <hr />
            {contents}
        </div>;
    }

    componentDidMount() {
        const authorize = localStorage.getItem('login')
        if (!authorize)
            this.props.history.push("/login");
        else this.getTaskStatus();
    }


    private async getTaskStatus() {
        await axios.get(`api/Tasks/getTasksStatus`)
            .then(res => {
                this.setState({ taskStatuslist: res.data })
            });
    }

    private async TasksDetails(id) {
        await axios.get(`api/Tasks/Details/${id}`)
            .then(res => {
                this.setState({ title: "Edit", loading: false, tasklist: res.data });
            });
    }

    private async EditCity(data: FormData) {
        await axios.put(`api/Tasks/Edit`, data)
            .then(res => {
                this.props.history.push("/fetchtask");
            });
        toast.success("Tasks changed successfully")
    }

    private async CreateCity(data: FormData) {
        await axios.post('api/Tasks/Create', data)
            .then(responseJson => {
                if (responseJson.data['value'] == 0) {
                    this.setState({ checkExistTask: true });
                    toast.warning('The Tasks already exist');
                } else {
                    this.setState({ checkExistTask: false });
                    toast.success('Tasks added successfully');
                    this.props.history.push("/fetchtask");
                }
            });
    }

    private handleSave(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        if (this.state.tasklist.tasksId)
            this.EditCity(data);
        else
            this.CreateCity(data);
    }

    private handleCancel(e) {
        e.preventDefault();
        this.props.history.push("/fetchtask");
    }

    private renderCreateForm() {
        let username = localStorage.getItem('email');
        return (
            <form onSubmit={(e) => this.handleSave(e)} >
                <div className="form-group row" >
                    <input type="hidden" name="tasksId" value={this.state.tasklist.tasksId} />
                </div>
                <div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="tasksName">Task Name</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="tasksName" defaultValue={this.state.tasklist.tasksName} required />
                    </div>
                </div>

                <div className="form-group row" >
                    <input className="form-control" type="hidden" name="userEmail" defaultValue={username} />
                </div>

                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="taskStatus">Task Status</label>
                    <div className="col-md-4">
                        <select className="form-control" data-val="true" name="taskStatusId" defaultValue={this.state.tasklist.taskStatusId} required>
                            <option value="">-- Select Task Status --</option>
                            {this.state.taskStatuslist.map(taskst =>
                                <option key={taskst.taskStatusId} value={taskst.taskStatusId}>{taskst.taskStatusName}</option>
                            )}
                        </select>
                    </div>
                </div>

                {this.state.checkExistTask == true ? <p className="text-danger">The tasks you are trying to add already exists.</p> : ''}

                <div className="form-group mb-2 mt-2">
                    <button type="submit" className="btn btn-success">{this.state.title == "Create Tasks" ? "Save" : "Update"}</button>  &nbsp;
                    <button className="btn btn-danger" onClick={(e) => this.handleCancel(e)}>Cancel</button>
                </div>
            </form >
        )
    }
}