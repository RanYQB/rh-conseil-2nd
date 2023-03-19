import React, {Component} from 'react';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import PersonIcon from "@mui/icons-material/Person";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import SearchIcon from "@mui/icons-material/Search";
import DescriptionIcon from "@mui/icons-material/Description";

class CandidateProfileList extends Component {
    static defaultProps = {
        listInfo: [
            "Mes informations personnelles",
            "Ma recherche d'emploi",
            "Mes CV"
        ]
    }
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <List sx={{width: '100%'}} component="nav" aria-label="mailbox folders">
                    <ListItem
                        button
                        onClick={this.props.handleListClick}
                        id={this.props.listInfo.indexOf(this.props.listInfo[0])}
                    >
                        <PersonIcon/><ListItemText primary={this.props.listInfo[0]} />
                    </ListItem>
                    <Divider />
                    <ListItem
                        button
                        divider
                        onClick={this.props.handleListClick}
                        id={this.props.listInfo.indexOf(this.props.listInfo[1])}>
                        <SearchIcon/><ListItemText primary={this.props.listInfo[1]} />
                    </ListItem>
                    <ListItem
                        button
                        onClick={this.props.handleListClick}
                        id={this.props.listInfo.indexOf(this.props.listInfo[2])} >
                        <DescriptionIcon/><ListItemText primary={this.props.listInfo[2]}/>
                    </ListItem>
                    <Divider light />
                </List>
            </div>
        );
    }
}
export default CandidateProfileList;