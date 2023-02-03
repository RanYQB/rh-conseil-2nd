import React , { Component} from "react";
import HomeForm from "./HomeForm";
import OffersList from "./OffersList";
import axios from "axios";

class HomeContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            offers: [],
            selected: ''
        }
        this.handleClick  = this.handleClick.bind(this)
    }

    componentDidMount() {
        axios.get('/api/offers')
            .then(response => {
                const offers = response.data['hydra:member'];
                console.log(response.data['hydra:member'][0])
                this.setState({
                    offers: offers,
                    selected: response.data['hydra:member'][0]
                })
            })
            .catch(err => {
                const errorMessage = "Error: " + err.message;
                console.log(errorMessage);
            })
        this.setState({loading: false});
        console.log(this.state.offers)
    }

    handleClick(offer){
        this.setState({ selected: offer })
    }

    render(){
        const { offers , selected } = this.state;
        return(
            <div>
                <HomeForm/>
                {offers && <OffersList offers={ offers } selected={ selected } handleClick={this.handleClick}/>}
            </div>
        )
    }
}
export default HomeContent;