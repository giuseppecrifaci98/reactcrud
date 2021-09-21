import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { UserData } from '../../class/UserData';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

interface FetchRecoveryPasswordDataDataState {
    title: string;
    userlist: UserData;
    loading: boolean;
    checkUserLogged: boolean;
    confirmedPassword?:string;
    errorMessage?:string;
}

export class RecoveryPasswordComponent extends React.Component<RouteComponentProps<{}>, FetchRecoveryPasswordDataDataState> {
    constructor(props) {
        super(props);
        this.state = { title: "", loading: false, userlist: new UserData, checkUserLogged: false };
    }


    public render() {
        let contents = this.state.loading ? <p><em>Loading...</em></p> : this.renderCreateForm();

        return <div>
            <h1>{this.state.title}</h1>
            <p>This form allows you recovery password</p>
            <hr />
            {contents}
        </div>;
    }

    private handleCancel(e) {
        e.preventDefault();
        this.props.history.push("");
    }

    private async Recovery(data: FormData) {
        await axios.put(`api/User/Recovery`, data)
        .then(res => {
            if (res.data['value'] == "Updated")
                this.props.history.push("/login");
        });
        toast.success("User recovered successfully");
    }

    private handleSave(e) {
        e.preventDefault();
        if(e.target.elements.password.value==e.target.elements.confermapassword.value){
            const data = new FormData(e.target);
            this.Recovery(data);
        }else
            this.setState({errorMessage:"The two passwords do not match"});
   
    }

    private renderCreateForm() {
        const authorize = localStorage.getItem('login')

        if (authorize)
            this.props.history.push("/");

        return (
            <form onSubmit={(e) => this.handleSave(e)} >
                <div className="form-group row" >
                    <input type="hidden" name="userId" value={this.state.userlist.userId} />
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

                < div className="form-group row" >
                <label className=" control-label col-md-12" htmlFor="Conferma Password">Confirm password:</label>
                    <div className="col-md-4">
                        <input className="form-control" type="password" name="confermapassword" defaultValue={this.state.userlist.confermapassword} required />
                    </div>
                </div>

                <div className="form-group mb-2 mt-2">
                    <button type="submit" className="btn btn-success">Recovery</button>  &nbsp;
                    <button className="btn btn-danger" onClick={(e) => this.handleCancel(e)}>Cancel</button>
                </div>

            {this.state.errorMessage!=null ? <p className="text-danger">The two passwords do not match</p>: ''}

            </form>
        )
    }
}