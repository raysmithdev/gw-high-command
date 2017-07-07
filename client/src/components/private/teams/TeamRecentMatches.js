import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import CircularProgress from 'material-ui/CircularProgress';
import {List, ListItem, makeSelectable} from 'material-ui/List';
import Paper from 'material-ui/Paper';
import './GuildTeams.css';

function TeamRecentMatches(props){
  let teamColor;
  let opponentColor;
  let count = 0; 
  const recentMatchListItems = props.matches.map(match => {
    teamColor = match.team.toLowerCase();
    if(teamColor = "blue"){
      opponentColor = "red"
    }
    else
      opponentColor = "blue";
    /*let resultClass ='';
    switch(match.result.toLowerCase()){
      case 'defeat':
        resultClass = 'defeat';
        break;
      case 'forfeit':
        resultClass = 'forfeit'
    }*/

    return (<ListItem 
              primaryText={
                            <div className={"matchElement "+match.result.toLowerCase()}>
                              <div className="matchDetail">
                                <div className="matchResult">{match.result}</div>
                              </div>
                              <div className="matchDetail">
                                  <h5>Team Score</h5>
                                  <span>{match.scores[teamColor]}</span>
                              </div>
                              <div className="matchDetail">
                                  <h5>Opponent's Score</h5>
                                  <span>{match.scores[opponentColor]}</span>
                              </div>
                              <div className="matchDetail">
                                  <h5>Type</h5>
                                  <span>{match.rating_type}</span>
                              </div>
                            </div>
                          } 
              disabled={true} 
              key={count++}
            />);
  });

  if(props.loading && props.display){
    return (
      <div className="teamRecentMatches">
        <Paper className="infoSection" zDepth={2}>
          <CircularProgress size={80} thickness={5} />
        </Paper>
      </div>
    );
  }
  else if(props.display && recentMatchListItems.length > 0){
    return (
      <div className="teamRecentMatches">
        <Paper className="infoSection" zDepth={2}>
          <Paper className="teamRecentMatchesInfo" zDepth={5}>
          <List className="teamRecentMatchesList">
            {recentMatchListItems}
          </List>
          </Paper>
        </Paper>
      </div>
    );
  }
  else{
    return (
      <div className="teamRecentMatches">
        <Paper className="infoSection" zDepth={2}>
          <Paper className="teamRecentMatchesInfo" zDepth={5}>
            <span>This team has not played any games as of yet.</span>
          </Paper>
        </Paper>
      </div>
    );    
  }
  //<FlatButton label="Log Out" onClick={props.logOut}/>
}

/*      <AppBar
        title={<span>{props.title}</span>}
        iconElementLeft={<span></span>}
        iconElementRight={<FloatingActionButton style={style}>
                            <ContentAdd />
                          </FloatingActionButton>}
      />*/
export default TeamRecentMatches; 