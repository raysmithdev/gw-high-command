import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../actions/teamsActions';
import { Redirect } from 'react-router-dom';
import SectionBar from '../SectionBar';
import Paper from 'material-ui/Paper';
import pieChart from '../../assets/pie-chart.png';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import './GuildTeams.css';

class TeamsTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      rows: []
    };
    this.statsClick = this.statsClick.bind(this);
    //this.getAPIKey = this.getAPIKey.bind(this);
  }

  componentDidMount(){

  }
  componentWillReceiveProps(nextProps){
    if(nextProps.selectedTeam){
      nextProps.history.push("/dashboard/teams/"+encodeURIComponent((nextProps.selectedTeamInfo.name).toLowerCase()));
    }
    else if(this.props.guildTeams != nextProps.guildTeams){
      if(nextProps.guildTeams.length > 0){
        let rows = [];
        for(let i=0; i < nextProps.guildTeams.length; i++){
          //const apiKey = this.getAPIKey(nextProps, i);
          let rating = 'N/A';
          if(nextProps.guildTeams[i].seasons && nextProps.guildTeams[i].seasons.length !== 0){
            rating = nextProps.guildTeams[i].seasons[nextProps.guildTeams[i].seasons.length-1].rating;
          }
          rows.push(<TableRow className="teamRow" key={i}>
                  <TableRowColumn>{nextProps.guildTeams[i].name}</TableRowColumn>
                  <TableRowColumn>{rating}</TableRowColumn>
                  <TableRowColumn><button type="button" name="statsButton" value={i} onClick={this.statsClick}><img className="statsImage" src={pieChart} /></button></TableRowColumn>
                </TableRow>);
        }
        this.setState({ rows: rows });
        console.log(this.state.rows);
        console.log(rows); 
      }  
    }
  }
  /*getAPIKey(props, memberIndex){
    return props.registeredMembers[memberIndex].apiKey;
  }*/
  statsClick(event){
    const teamIndex = event.currentTarget.value;
    console.log(teamIndex);
    this.props.dispatch(actions.selectTeam(this.props.guildTeams[teamIndex]));
  }

  render() {
    if(this.props.selectedTeam){
      const url="/dashboard/teams/"+encodeURIComponent((this.props.selectedTeamInfo.name).toLowerCase());
      return (
        <Redirect to={url} />
      );
    }
    else if(this.props.guildTeams.length === 0){
      return (
        <section className="teamsTable">
          <Paper className="infoSection" zDepth={2}>
            <span>There are currently no teams for this guild.</span>
          </Paper>
        </section>
      ); 
    }
    else{
      return (
        <section className="teamsTable">
          <SectionBar title="Guild Teams" />
          <Table selectable={false}>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn>Name</TableHeaderColumn>
                <TableHeaderColumn>Rating</TableHeaderColumn>
                <TableHeaderColumn>Stats</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}> 
              {this.state.rows}
            </TableBody>
          </Table>
        </section>
      );
    }
  }
}


const mapStateToProps = (state, props) => ({
  guildTeams: state.teams.guildTeams,
  selectedTeam: state.teams.selectedTeam,
  selectedTeamInfo: state.teams.selectedTeamInfo
  //accountInfo: state.members.accountInfo
});

export default connect(mapStateToProps)(TeamsTable);