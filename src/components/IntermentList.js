import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Interment from '../models/Interment';

const getUniqueValues = (interments, field) => {
  const values = {};
  for (const interment of interments) {
    if (typeof interment[field] === 'string' && interment[field].trim().length > 0) {
      values[interment[field].trim()] = true;
    }
  }
  return Object.keys(values).sort();
};

const getGraveyardTypes = interments => {
  return getUniqueValues(interments, 'graveyardType');
};

const getCemeteries = interments => {
  return getUniqueValues(interments, 'cemeteryName');
};

const selectMenuFilter = (values, filter, onChange) => {
  return (
    <select
      onChange={event => onChange(event.target.value)}
      style={{ width: "100%" }}
      value={filter ? filter.value : "all"}
    >
      <option value="all">All</option>
      {
        values.map(value => (
          <option value={value} key={value}>{value}</option>
        ))
      }
    </select>
  );
};

const accessibleFilterMethod = (filter, row) => {
  if (filter.value === 'all') {
    return true;
  }

  if (filter.value === 'other') {
    return typeof row[filter.id] === 'string' && row[filter.id] !== 'yes' &&
      row[filter.id] !== 'no' && row[filter.id].trim().length > 0;
  }

  return row[filter.id] === filter.value;
};

const selectMenuFilterMethod = (filter, row) => {
  if (filter.value === 'all') {
    return true;
  }

  return row[filter.id] === filter.value;
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

  accessibleFilter = ({ filter, onChange }) => {
    return selectMenuFilter(['yes', 'no', 'other'], filter, onChange);
  }

  graveyardTypeFilter = ({ filter, onChange }) => {
    const graveyardTypes = getGraveyardTypes(this.state.interments);
    return selectMenuFilter(graveyardTypes, filter, onChange);
  }

  cemeteryFilter = ({ filter, onChange }) => {
    const cemeteries = getCemeteries(this.state.interments);
    return selectMenuFilter(cemeteries, filter, onChange);
  }

  render() {
    const { interments } = this.state;

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
                minWidth: 200,
                filterMethod: selectMenuFilterMethod,
                Filter: this.cemeteryFilter
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
                filterMethod: selectMenuFilterMethod,
                Filter: this.graveyardTypeFilter
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
                accessor: "accessible",
                filterMethod: accessibleFilterMethod,
                Filter: this.accessibleFilter
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
                accessor: "originalSurvey",
                minWidth: 130,
                Cell: this.formatDateCell
              },
              {
                Header: "Updates",
                accessor: "surveyUpdates",
                minWidth: 130,
                Cell: this.formatDateCell
              },
              {
                Header: "Current",
                accessor: "currentSurvey",
                minWidth: 130,
                Cell: this.formatDateCell
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
