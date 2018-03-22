import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import debounce from "lodash/debounce";
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { makeSelectSearchText, makeSelectPlanets, makeSelectLoading, makeSelectError } from './selectors';
import { makeLoggedInUser } from 'containers/Login/selectors';
import { searchRequest } from './actions';
import reducer from './reducer';
import saga from './saga';
import LoadingIndicator from 'components/LoadingIndicator';
import Planet from './Planet'
import Planets from './Planets'
import PlanetWrapper from './PlanetWrapper'

class SearchPage extends React.Component {
  constructor(props){
    super(props);
    const { query } = this.props;
    this.onChangeQuery = this.onChangeQuery.bind(this);
  }
  state = { query : "" };
  onChangeQuery = function(e){
    const query = e.target.value;
    this.setState({ query });
    this.debounceSearch(query);
  }
  getRandomColor = () =>{
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    //generate random red, green and blue intensity
    var r = getRandomInt(0, 255);
    var g = getRandomInt(0, 255);
    var b = getRandomInt(0, 255);
    
    return "rgb(" + r + "," + g + "," + b + ")";
  }

  getNumber(number){
    return parseInt(number) ? parseInt(number)  : 0;
  }
  debounceSearch = debounce(function(query) {
    const { loggedInUser } = this.props;
    this.props.searchRequest(query, loggedInUser);
  }.bind(this), 300);
  getSizedPlanets(planets){
    const sizes = planets.map((planet) => {
      const population = this.getNumber(planet.population)
      return population;
    });
    const max = Math.max.apply(null, sizes);
    
    var cloned = JSON.parse(JSON.stringify(planets));
    const sizeinPercent = cloned.forEach((planet) => {
      const population = this.getNumber(planet.population)
      if(population){
        planet.size = (planet.population / max);
      }else{
        planet.size = 0;
      }
    });

    return cloned || {};
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.query){
      this.setState({query : nextProps.query})
    }
  }
  render() {
    let { planets, loading, error } = this.props;
    const { query } = this.state;
    planets = planets && this.getSizedPlanets(planets) || [];
    let planetList  = null, loadingContent;

    if(!loading){
      planetList = planets && planets.map((planet) => {
        return (<PlanetWrapper key={planet.name}>
          <Planet size={planet.size}  getRandomColor={this.getRandomColor}></Planet>
          <p className="name">{planet.name}</p>
        </PlanetWrapper>);
      });
    }else if(query){
      loadingContent = (
        <div>
          <br/>
          <br/>
          <LoadingIndicator key="LoadingIndicator"/>
      </div>);
    }

    return (
      <div className="search-page">
        <div className="form search">
          <form className="search-form">
            <input type="text" value={query || ""} placeholder="Search Planet Name" onChange={this.onChangeQuery} />
          </form>
          {loadingContent}
          <Planets>
            { error ? error : planetList }
          </Planets>
        </div>
      </div>);
  }

}



SearchPage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  searchRequest: PropTypes.func,
  query: PropTypes.string,
  planets: PropTypes.any,
  loggedInUser:   PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
};


export function mapDispatchToProps(dispatch) {
  return {
    searchRequest: (query, loggedInUser) => {
      dispatch(searchRequest(query, loggedInUser))
    }
  };
}

const mapStateToProps = createStructuredSelector({
  query: makeSelectSearchText(),
  planets: makeSelectPlanets(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  loggedInUser: makeLoggedInUser(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'global', reducer });
const withSaga = injectSaga({ key: 'global', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SearchPage);
