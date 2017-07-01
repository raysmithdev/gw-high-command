import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../actions/teamsActions';
import { Redirect } from 'react-router-dom';
import SectionBar from '../SectionBar';
import Paper from 'material-ui/Paper';
import CircularProgress from 'material-ui/CircularProgress';
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
    let rows = [];
        for(let i=0; i < this.props.guildTeams.length; i++){
          //const apiKey = this.getAPIKey(nextProps, i);
          let rating = 'N/A';
          if(this.props.guildTeams[i].seasons && this.props.guildTeams[i].seasons.length !== 0){
            rating = this.props.guildTeams[i].seasons[this.props.guildTeams[i].seasons.length-1].rating;
          }
          rows.push(<TableRow className="teamRow" key={i}>
                  <TableRowColumn style={{textAlign: 'center'}}>{this.props.guildTeams[i].name}</TableRowColumn>
                  <TableRowColumn style={{textAlign: 'center'}}>{rating}</TableRowColumn>
                  <TableRowColumn style={{textAlign: 'center'}}><button className="statsButton" type="button" name="statsButton" value={i} onClick={this.statsClick}><img className="statsImage" src={pieChart} /></button></TableRowColumn>
                </TableRow>);
        }
        this.setState({ rows: rows });
        console.log(this.state.rows);
        console.log(rows); 
  }
  componentWillReceiveProps(nextProps){
    /*if(nextProps.selectedTeam){
      nextProps.history.push("/dashboard/teams/"+encodeURIComponent((nextProps.selectedTeamInfo.name).toLowerCase()));
    }*/
    if(this.props.guildTeams !== nextProps.guildTeams){
      if(nextProps.guildTeams.length > 0){
        let rows = [];
        for(let i=0; i < nextProps.guildTeams.length; i++){
          //const apiKey = this.getAPIKey(nextProps, i);
          let rating = 'N/A';
          if(nextProps.guildTeams[i].seasons && nextProps.guildTeams[i].seasons.length !== 0){
            rating = nextProps.guildTeams[i].seasons[nextProps.guildTeams[i].seasons.length-1].rating;
          }
          rows.push(<TableRow className="teamRow" key={i}>
                  <TableRowColumn style={{textAlign: 'center'}}>{nextProps.guildTeams[i].name}</TableRowColumn>
                  <TableRowColumn style={{textAlign: 'center'}}>{rating}</TableRowColumn>
                  <TableRowColumn style={{textAlign: 'center'}}><button className="statsButton" type="button" name="statsButton" value={i} onClick={this.statsClick}><img className="statsImage" src={pieChart} /></button></TableRowColumn>
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
    //const options = statsValue.split('|');
    //this.props.dispatch(actions.selectTeam(options[0], this.props.registeredMembers));
    this.props.dispatch(actions.selectTeam(this.props.guildTeams[teamIndex]));
    this.props.history.push("/dashboard/teams/"+encodeURIComponent((this.props.guildTeams[teamIndex].name).toLowerCase()));
  }
  render() {
    /*if(this.props.selectedTeam){
      const url="/dashboard/teams/"+encodeURIComponent((this.props.selectedTeamInfo.name).toLowerCase());
      return (
        <Redirect to={url} />
      );
    }*/
    if(this.props.teamsLoading){
      return (
      <section className="teamLoadingScreen">
          <CircularProgress size={80} thickness={5} />
      </section>
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
                <TableHeaderColumn style={{textAlign: 'center'}}>Name</TableHeaderColumn>
                <TableHeaderColumn style={{textAlign: 'center'}}>Rating</TableHeaderColumn>
                <TableHeaderColumn style={{textAlign: 'center'}}>Stats</TableHeaderColumn>
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
  selectedTeamInfo: state.teams.selectedTeamInfo,
  teamsLoading: state.teams.teamsLoading,
  activeGuild: state.registrationAndLogin.activeGuild,
  activeUser: state.registrationAndLogin.activeUser
  //accountInfo: state.members.accountInfo
});

export default connect(mapStateToProps)(TeamsTable);