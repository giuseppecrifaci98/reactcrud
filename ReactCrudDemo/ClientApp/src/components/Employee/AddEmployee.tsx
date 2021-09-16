import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { CityData } from '../../class/CityData';
import { EmployeeData } from '../../class/EmployeeData';
import { DepartmentData } from '../../class/DepartmentData';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

interface AddEmployeeDataState {
    title: string;
    loading: boolean;
    cityList: CityData[];
    empData: EmployeeData;
    checkExistUser: boolean;
    alt: 'Upload an Image';
    src: any;
    setImg: any;
    departmentData: DepartmentData[];
}

export class AddEmployee extends React.Component<RouteComponentProps<{}>, AddEmployeeDataState>{
    constructor(props) {
        super(props);
        this.state = { title: "", loading: true, cityList: [], empData: new EmployeeData, checkExistUser: false, src: '/img/image_placeholder.png', setImg: null, alt: 'Upload an Image', departmentData: [] };

        var empid = this.props.match.params["empid"];

        // This will set state for Edit employee  
        if (empid > 0)
            this.EmployeeDetails(empid);
        else
            this.state = { title: "Create Employee", loading: false, cityList: [], empData: new EmployeeData, checkExistUser: false, src: '/img/image_placeholder.png', setImg: null, alt: 'Upload an Image', departmentData: [] };

    }

    private async EmployeeDetails(id) {
        await axios.get(`api/Employee/Details/${id}`)
            .then(res => {
                this.setState({ title: "Update", loading: false, empData: res.data });
            })
    }

    private async getCity() {
        await axios.get(`api/City/Index`)
            .then(res => {
                this.setState({ cityList: res.data })
            });
    }

    private async getDepartment() {
        await axios.get(`api/Department/Index`)
            .then(res => {
                this.setState({ departmentData: res.data });
            });
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCreateForm(this.state.cityList);

        return <div>
            <h1>{this.state.title}</h1>
            {this.state.title == "Update" ? <p>This form allows you to update the Employee </p> : <p>This form allows you to create a new Employee</p>}
            <hr />
            {contents}
        </div>;
    }


    componentDidMount() {
        this.getCity();
        this.getDepartment();
    }

    private async EditEmployee(data: FormData) {
        await axios.put(`api/Employee/Edit`, data)
            .then(res => {
                if (res.data['value'] == "Updated")
                    this.props.history.push("/fetchemployee");
            });
        toast.success("Employee changed successfully");
    }

    private async CreateEmployee(data: FormData) {
        await axios.post('api/Employee/Create', data)
            .then(responseJson => {
                let checkUser = responseJson.data['value'];
                if (checkUser) {
                    this.setState({ checkExistUser: false });
                    this.props.history.push("/fetchemployee");
                    toast.success("Employee created successfully");
                } else {
                    this.setState({ checkExistUser: true });
                    toast.warning("Employee already exists");
                }
            });
    }


    private handleSave(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        if (this.state.empData.employeeId)
            this.EditEmployee(data);
        else
            this.CreateEmployee(data);
    }

    private showPreview(e) {
        if (e.target.files[0]) {
            this.setState({ src: URL.createObjectURL(e.target.files[0]), alt: e.target.files[0].name, setImg: URL.createObjectURL(e.target.files[0]) });
        }
    }

    private handleCancel(e) {
        e.preventDefault();
        this.props.history.push("/fetchemployee");
    }

    private renderCreateForm(cityList: Array<any>,) {
        let profileImageSource;

        if (this.state.src == null)
            profileImageSource = this.state.src;

        if (this.state.title == "Update" && this.state.empData.imageFileData == null)
            profileImageSource = this.state.src;
        else {
            profileImageSource = `data:image/jpeg;base64,${this.state.empData.imageFileData}`;
            if (this.state.setImg != null)
                profileImageSource = this.state.setImg;
        }

        if (this.state.title == "Create Employee")
            profileImageSource = this.state.src;

        return (
            <form onSubmit={e => this.handleSave(e)} >
                <div className="form-group row" >
                    <input type="hidden" name="employeeId" value={this.state.empData.employeeId} />
                </div>
                < div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="Name">Name</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="name" defaultValue={this.state.empData.name} required />
                    </div>
                </div >
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Gender">Gender</label>
                    <div className="col-md-4">
                        <select className="form-control" data-val="true" name="gender" defaultValue={this.state.empData.gender} required>
                            <option value="">-- Select Gender --</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                </div >
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="department">Department</label>
                    <div className="col-md-4">
                        <select className="form-control" data-val="true" name="departmentId" defaultValue={this.state.empData.departmentId} required>
                            <option value="">-- Select Department --</option>
                            {this.state.departmentData.map(dep =>
                                <option key={dep.departmentId} value={dep.departmentId}>{dep.departmentName}</option>
                            )}
                        </select>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="cityId">City</label>
                    <div className="col-md-4">
                        <select className="form-control" data-val="true" name="cityId" defaultValue={this.state.empData.cityId} required>
                            <option value="">-- Select City --</option>
                            {cityList.map(city =>
                                <option key={city.cityId} value={city.cityId}>{city.cityName}</option>
                            )}
                        </select>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="imageFile" className="control-label col-md-12">Image</label>
                    <div className="col-md-4">
                        <img src={profileImageSource} width="200" height="200" />
                        <input type="file" name="imageFile" accept="image/*" className="form-control-file"
                            onChange={(e) => this.showPreview(e)} id="image-uploader" />
                    </div>

                </div>
                {this.state.checkExistUser == true ? <p className="text-danger">User you are trying to create is already present.</p> : ''}
                <div className="form-group mb-2 mt-2">
                    <button type="submit" className="btn btn-success">{this.state.title == "Create Employee" ? "Save" : "Update"}</button>  &nbsp;
                    <button className="btn btn-danger" onClick={e => this.handleCancel(e)}>Cancel</button>
                </div >
            </form>
        )
    }
}