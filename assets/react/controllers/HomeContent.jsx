import React , { Component} from "react";
import OffersList from "./OffersList";

class HomeContent extends Component {

    render(){
        const { offers , selected } = this.props;
        return(
            <div>
                {offers && <OffersList offers={ offers } selected={ selected } handleClick={this.props.handleClick}/>}
            </div>
        )
    }
}
export default HomeContent;