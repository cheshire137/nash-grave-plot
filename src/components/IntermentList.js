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
                accessor: "person",
                minWidth: 200
              },
              {
                Header: "Died",
                accessor: "deathDate",
                minWidth: 130
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
                accessor: "cemeteryName",
                minWidth: 200
              },
              {
                Header: "Address",
                accessor: "address",
                minWidth: 200
              },
              {
                Header: "Graveyard Type",
                accessor: "graveyardType",
                minWidth: 130
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
                accessor: "inscription",
                minWidth: 250
              },
              {
                Header: "Footstone",
                accessor: "footstone",
                minWidth: 150
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
            accessor: "notes",
            minWidth: 300
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
        defaultPageSize={100}
        className="-striped -highlight"
      />
    );
  }
}

export default IntermentList;
