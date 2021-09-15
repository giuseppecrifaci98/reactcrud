import * as React from 'react'; 
import {RouteComponentProps } from 'react-router';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { CityData } from '../../class/CityData';
import '../../custom.css';
import axios from 'axios';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

interface FetchCityDataState{
    cityList: CityData[];
    loading: boolean;
}

export class FetchCity extends React.Component<RouteComponentProps<{}>, FetchCityDataState> { 
    constructor(props:RouteComponentProps<{}>){
        super(props);
        this.state = { cityList: [], loading: true };  
    }

    public render(){
    let noData = this.state.cityList.length==0 ? false: true;
    let contents = this.state.loading  ? <p><em>Loading...</em></p>   : noData ? this.renderCityTable(this.state.cityList) : <p>No Data</p>;
    let visibileAction = localStorage.getItem('login')  ? true: false;

    return <div>  
        <h1>City Data</h1>  
        <p>This component fetching City data from the server.</p>  
        {visibileAction && <p>  
            <Link to="/addnewcity">Create New</Link>  
        </p>}
        {contents}  
    </div>;  
    }

    private async getCity(){
        await axios.get('api/City/Index').then(res =>  {
            this.setState({ cityList: res.data, loading: false });  
        });
    }

    private async DeleteCity(id){
        await axios.delete(`api/City/Delete/${id}`).then(res => {
            this.setState({cityList: this.state.cityList.filter((rec) => { 
                return (rec.cityId != id);  
                 })  
            });  
            toast.success("City successfully eliminated");
          });
    }

    componentDidMount(){
        this.getCity();
    }

      private handleDelete(id: number) {  
        if (!window.confirm("Do you want to delete city with Id: " + id + "?"))  
            return;  
        else this.DeleteCity(id);
    } 

    private handleEdit(id: number) {  
        this.props.history.push("/city/edit/" + id);  
    }  

        private renderCityTable(cityList: CityData[]) {  
            let visibileAction = localStorage.getItem('login')  ? true: false;
            return <table className='table table-striped'>  
                <thead>  
                    <tr>  
                        <th scope="col">City Id</th>  
                        <th scope="col">City Name</th>  
                       {visibileAction && <th scope="col">Actions</th>}
                    </tr>  
                </thead>  
                <tbody>  
                    {cityList.map(city =>  
                        <tr key={city.cityId}>  
                            <td>{city.cityId}</td>  
                            <td>{city.cityName}</td>  
                            {visibileAction && <td>  
                                <FontAwesomeIcon icon={faInfoCircle} className="icon-details" onClick={(id) => this.handleEdit(city.cityId)} /> &nbsp;
                                <FontAwesomeIcon icon={faTrash} className="icon-delete" onClick={(id) => this.handleDelete(city.cityId)} />
                            </td>}
                        </tr>  
                    )}  
                </tbody>  
            </table>;  
        }

}