import React , { Component} from "react";
import HomeForm from "./HomeForm";
import OffersList from "./OffersList";
import axios from "axios";
import theme from './theme';
import { ThemeProvider } from '@mui/material/styles';

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