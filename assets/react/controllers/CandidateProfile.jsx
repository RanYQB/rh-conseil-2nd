import * as React from 'react';
import {useState} from "react";
import { makeStyles } from 'tss-react/mui';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import CandidateProfileList from "./CandidateProfileList";
import CandidateProfileInfo from "./CandidateProfileInfo";
import CandidateProfileJobSearch from "./CandidateProfileJobSearch";
import CandidateProfileResume from "./CandidateProfileResume";

const useStyles = makeStyles()(() => {
    return {
        CandidateProfileRoot: {

            minHeight: '60vh',
            display: "flex",
            flexDirection: 'row',
            height: '100%'
        },
        CandidateProfileCard: {
            position: "relative",
            width: "100%",
            maxWidth: "1200px",
            margin: "100px auto",
        },
        CandidateProfileMenu: {
            width: "25%",
        },
        CandidateProfileContent: {
            width: '75%',
            margin: '20px'
        }

    }})

function CandidateProfile (props)  {
    const [ selectedNav, setSelectedNav] = useState("0");
    const { classes } = useStyles();

    const handleListClick = (event) => {
        setSelectedNav(event.target.offsetParent.id);
    }
    return(
            <Card variant="outlined" className={classes.CandidateProfileCard}>
                <div className={classes.CandidateProfileRoot}>
                    <div className={classes.CandidateProfileMenu}>
                        <CandidateProfileList handleListClick={handleListClick} selectedNav={selectedNav}/>
                    </div>
                    <Divider orientation="vertical" flexItem />
                    <div className={classes.CandidateProfileContent}>
                        {(() => {
                            switch (selectedNav) {
                                case '0':
                                    return <CandidateProfileInfo/>
                                case '1':
                                    return <CandidateProfileJobSearch/>
                                case '2':
                                    return <CandidateProfileResume/>
                                default:
                                    return <CandidateProfileInfo/>
                            }
                        })()}
                    </div>
                </div>
            </Card>
    )
}

export default CandidateProfile;