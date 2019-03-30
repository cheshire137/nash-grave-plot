import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Interment from '../models/Interment';

const getGraveyardTypes = interments => {
  const types = {};
  for (const interment of interments) {
    if (typeof interment.graveyardType === 'string' && interment.graveyardType.trim().length > 0) {
      types[interment.graveyardType.trim()] = true;
    }
  }
  return Object.keys(types).sort();
};

class IntermentList extends Component {
  constructor(props) {
    super(props);
    this.state = { interments: [] }
  }

  componentDidMount() {
    this.setState(prevState => ({ interments: Interment.findAll() }));
  }

  filterTable = (filter, row) => {
    const haystack = String(row[filter.id]).toLowerCase();
    const needle = filter.value.toLowerCase();
    return haystack.indexOf(needle) > -1;
  }

  formatDateCell = ({ value }) => {
    if (value instanceof Date) {
      const year = value.getFullYear();
      let month = value.getMonth() + 1;
      if (month < 10) {
        month = `0${month}`;
      }
      let day = value.getDate();
      if (day < 10) {
        day = `0${day}`;
      }
      return `${year}-${month}-${day}`;
    }

    return value;
  }

  render() {
    const { interments } = this.state;
    const graveyardTypes = getGraveyardTypes(interments);

    return (
      <ReactTable
        data={interments}
        filterable
        defaultFilterMethod={this.filterTable}
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
                minWidth: 130,
                Cell: this.formatDateCell
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
                minWidth: 130,
                filterMethod: (filter, row) => {
                  if (filter.value === "all") {
                    return true;
                  }
                  return row[filter.id] === filter.value;
                },
                Filter: ({ filter, onChange }) => (
                  <select
                    onChange={event => onChange(event.target.value)}
                    style={{ width: "100%" }}
                    value={filter ? filter.value : "all"}
                  >
                    <option value="all">All</option>
                    {
                      graveyardTypes.map(type => (
                        <option
                          value={type}
                          key={type}
                        >{type}</option>
                      ))
                    }
                  </select>
                )
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
