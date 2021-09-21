import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { UserData } from '../../class/UserData';
import '../../custom.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

interface EditUserDataState {
    title: string;
    loading: boolean;
    userlist: UserData;
    checkExistUser: boolean;
    errorMessage?: string;
}

export class EditUsersComponent extends React.Component<RouteComponentProps<{}>, EditUserDataState> {
    constructor(props: RouteComponentProps<{}>) {
        super(props);
        this.state = { title: "", userlist: new UserData, loading: true, checkExistUser: false };

        var userid = this.props.match.params["id"];

        if (userid > 0)
            this.EditUserDetails(userid);
        else
            this.props.history.push('/fetchuser');

    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderEditForm(this.state.userlist);

        return <div>
            <h1>{this.state.title}</h1>
            <p>This form allows you to update the users </p>
            <hr />
            {contents}
        </div>;
    }

    private async EditUserDetails(id) {
        await axios.get(`api/User/Details/${id}`)
            .then(res => {
                this.setState({ title: "Update", loading: false, userlist: res.data });
            })
    }

    private async EditUser(data: FormData) {
        await axios.put(`api/User/Edit`, data)
            .then(res => {
                if (res.data['value'] == "Updated")
                    this.props.history.push("/fetchuser");
            });
        toast.success("Users changed successfully");
    }

    private handleSave(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        if(event.target.elements.password.value==event.target.elements.confermapassword.value){
            if (this.state.userlist.userId)
            this.EditUser(data);
        }else
        this.setState({errorMessage:"The two passwords do not match"});
    }

    private handleCancel(e) {
        e.preventDefault();
        this.props.history.push("/fetchuser");
    }

    private renderEditForm(userlist: UserData) {
        return (
            <form onSubmit={(e) => this.handleSave(e)} >
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

                <div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="Password">Password:</label>
                    <div className="col-md-4">
                        <input className="form-control" type="password" name="password" defaultValue={this.state.userlist.password} required />
                    </div>
                </div>

                <div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="Conferma Password">Confirm Password:</label>
                    <div className="col-md-4">
                        <input className="form-control" type="password" name="confermapassword" defaultValue={this.state.userlist.confermapassword} required />
                    </div>
                </div>

                {this.state.errorMessage != null ? <p className="text-danger">The password must be equals.</p> : ''}

                <div className="form-group mb-2 mt-2">
                    <button type="submit" className="btn btn-success">Edit User</button>  &nbsp;
                    <button className="btn btn-danger" onClick={(e) => this.handleCancel(e)}>Cancel</button>
                </div>
            </form>
        )
    }
}