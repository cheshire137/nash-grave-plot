import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Interment from '../models/Interment';

class IntermentList extends Component {
  constructor(props) {
    super(props);
    this.state = { interments: [] }
  }

  componentDidMount() {
    this.setState(prevState => ({ interments: Interment.findAll() }));
  }

  render() {
    const { interments } = this.state;

    return (
      <ReactTable
        data={interments}
        columns={[
          {
            Header: "Person",
            columns: [
              {
                Header: "Name",
                accessor: "person"
              },
              {
                Header: "Died",
                accessor: "deathDate"
              },
              {
                Header: "Info",
                accessor: "deceasedInfo"
              }
            ]
          },
          {
            Header: "Location",
            columns: [
              {
                Header: "Cemetery",
                accessor: "cemeteryName"
              },
              {
                Header: "Address",
                accessor: "address"
              },
              {
                Header: "Graveyard Type",
                accessor: "graveyardType"
              },
              {
                Header: "Site History",
                accessor: "siteHistory"
              },
              {
                Header: "Notes",
                accessor: "additionalLocationInfo"
              }
            ]
          },
          {
            Header: "Marker/Plot",
            columns: [
              {
                Header: "Inscription",
                accessor: "inscription"
              },
              {
                Header: "Footstone",
                accessor: "footstone"
              },
              {
                Header: "Demarcation",
                accessor: "demarcation"
              },
              {
                Header: "Condition",
                accessor: "condition"
              },
              {
                Header: "Accessible",
                accessor: "accessible"
              },
              {
                Header: "Restoration",
                accessor: "restoration"
              }
            ]
          },
          {
            Header: "Notes",
            accessor: "notes"
          },
          {
            Header: "Survey",
            columns: [
              {
                Header: "Original",
                accessor: "originalSurvey"
              },
              {
                Header: "Updates",
                accessor: "surveyUpdates"
              },
              {
                Header: "Current",
                accessor: "currentSurvey"
              }
            ]
          }
        ]}
      />
    );
  }
}

export default IntermentList;
