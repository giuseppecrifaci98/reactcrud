import * as React from 'react'; 
import {RouteComponentProps } from 'react-router';
import { CityData } from '../../class/CityData';
import axios from 'axios';

interface FetchCityDataState{
    title:string;
    cityList: CityData;
    loading: boolean;
    checkExistCity:boolean;
}

export class AddCity extends React.Component<RouteComponentProps<{}>, FetchCityDataState> { 
    constructor(props:RouteComponentProps<{}>){
        super(props);
         this.state = { title: "", loading: true, cityList: new CityData, checkExistCity:false };

         var cityid = this.props.match.params["cityid"];  

         if(cityid>0){

             axios.get(`api/City/Details/${cityid}`)
             .then(res=>{
              this.setState({ title: "Edit", loading: false, cityList: res.data });  
             });
         }
         else
             this.state = { title: "Create City", loading: false, cityList: new CityData, checkExistCity:false };  
             

      
    }

    public render(){
        let contents = this.state.loading ? <p><em>Loading...</em></p> : this.renderCreateForm();

    return <div>  
        <h1>{this.state.title}</h1>  
    <p>This form allows you to create a new cities</p>  
        <hr />  
        {contents}  
    </div>;  
    }

    componentDidMount(){
       // This binding is necessary to make "this" work in the callback  
       this.handleSave = this.handleSave.bind(this);  
       this.handleCancel = this.handleCancel.bind(this); 
    }

    private handleSave(event) {  
        event.preventDefault();  
        const data = new FormData(event.target);  

        if (this.state.cityList.cityId) {  
            axios.put(`api/City/Edit`, data)
            .then(res => {
                this.props.history.push("/fetchcity");  
            });
        }   
    
        else {  
            axios.post('api/City/Create',data)
            .then(responseJson=>{
                if(responseJson.data==0)
                this.setState({checkExistCity: true});
                else{
                    this.setState({checkExistCity: false});
                this.props.history.push("/fetchcity");
                }
            });
        }
    }
    
    private handleCancel(e) {  
        e.preventDefault();  
        this.props.history.push("/fetchcity");  
    }  

    
    private renderCreateForm() {  
        return (  
            <form onSubmit={this.handleSave} >  
                <div className="form-group row" >  
                    <input type="hidden" name="cityId" value={this.state.cityList.cityId} />  
                </div>  
                < div className="form-group row" >  
                    <label className=" control-label col-md-12" htmlFor="cityName">Name</label>  
                    <div className="col-md-4">  
                        <input className="form-control" type="text" name="cityName" defaultValue={this.state.cityList.cityName} required />  
                    </div>  
                </div>  

                {this.state.checkExistCity == true ? <p className="text-danger">The city you are trying to add already exists.</p> : ''}

                <div className="form-group">  
                    <button type="submit" className="btn btn-success">{this.state.title=="Create City" ? "Save" : "Update" }</button>  &nbsp;
                    <button className="btn btn-danger" onClick={this.handleCancel}>Cancel</button>  
                </div>  
            </form >  
        )  
    }  

}