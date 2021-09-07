import * as React from 'react'; 
import {RouteComponentProps } from 'react-router';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { CityData } from '../../class/CityData';
import '../../custom.css';
import axios from 'axios';

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
        let contents = this.state.loading  ? <p><em>Loading...</em></p>   : this.renderCityTable(this.state.cityList);

    return <div>  
        <h1>City Data</h1>  
        <p>This component fetching City data from the server.</p>  
        <p>  
            <Link to="/addnewcity">Create New</Link>  
        </p>  
        {contents}  
    </div>;  
    }

    componentDidMount(){
        axios.get('api/City/Index').then(res =>  {
            this.setState({ cityList: res.data, loading: false });  
        });

         // This binding is necessary to make "this" work in the callback  
         this.handleDelete = this.handleDelete.bind(this);  
         this.handleEdit = this.handleEdit.bind(this); 
    }

      private handleDelete(id: number) {  
        if (!window.confirm("Do you want to delete city with Id: " + id + "?"))  
            return;  
        else {  
            axios.delete(`api/City/Delete/${id}`).then(res => {
                this.setState({cityList: this.state.cityList.filter((rec) => { 
                    return (rec.cityId != id);  
                     })  
                });  
              });
        }  
    } 

    private handleEdit(id: number) {  
        this.props.history.push("/city/edit/" + id);  
    }  

        // Returns the HTML table to the render() method.  
        private renderCityTable(cityList: CityData[]) {  
            return <table className='table table-striped'>  
                <thead>  
                    <tr>  
                        <th scope="col">City Id</th>  
                        <th scope="col">City Name</th>  
                        <th scope="col">Actions</th>
                    </tr>  
                </thead>  
                <tbody>  
                    {cityList.map(city =>  
                        <tr key={city.cityId}>  
                            <td>{city.cityId}</td>  
                            <td>{city.cityName}</td>  
                            <td>  
                                <FontAwesomeIcon icon={faInfoCircle} className="icon-details" onClick={() => this.handleEdit(city.cityId)} /> &nbsp;
                                <FontAwesomeIcon icon={faTrash} className="icon-delete" onClick={() => this.handleDelete(city.cityId)} />
                            </td>  
                        </tr>  
                    )}  
                </tbody>  
            </table>;  
        }

}