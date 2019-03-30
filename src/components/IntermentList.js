import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Interment from '../models/Interment';
import PhotoDisplay from './PhotoDisplay';
import AddressDisplay from './AddressDisplay';

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

const photoFilterMethod = (filter, row) => {
  if (filter.value === 'all') {
    return true;
  }

  if (filter.value === 'has photo') {
    return row[filter.id].length > 0;
  }

  if (filter.value === 'does not have photo') {
    return row[filter.id].length < 1;
  }

  return row[filter.id] === filter.value;
};

const selectMenuFilterMethod = (filter, row) => {
  if (filter.value === 'all') {
    return true;
  }

  return row[filter.id] === filter.value;
};

const fuzzyStringMatch = (needle, haystack) => {
  return haystack.toLowerCase().indexOf(needle.toLowerCase()) > -1;
};

const filterTableFunc = (filter, row) => {
  const needle = filter.value;
  const haystack = String(row[filter.id]);

  return fuzzyStringMatch(needle, haystack);
};

const addressFilterFunc = (filter, row) => {
  const needle = filter.value;
  const address = row[filter.id];
  const haystack = address.toString();

  return fuzzyStringMatch(needle, haystack);
};

class IntermentList extends Component {
  constructor(props) {
    super(props);
    this.state = { interments: [] }
  }

  componentDidMount() {
    this.setState(prevState => ({ interments: Interment.findAll() }));
  }

  formatAddress = ({ value }) => {
    return <AddressDisplay {...value} />
  }

  formatGravePhotos = ({ value }) => {
    return (
      <div>
        {value.map(photo => (
          <PhotoDisplay {...photo} key={photo.text} />
        ))}
      </div>
    )
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

  gravePhotoFilter = ({ filter, onChange }) => {
    return selectMenuFilter(['has photo', 'does not have photo'], filter, onChange);
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
        defaultFilterMethod={filterTableFunc}
        columns={[
          {
            Header: 'Person',
            columns: [
              {
                Header: 'Name',
                accessor: 'person',
                minWidth: 200
              },
              {
                Header: 'Died',
                accessor: 'deathDate',
                minWidth: 130,
                Cell: this.formatDateCell
              },
              {
                Header: 'Info',
                accessor: 'deceasedInfo'
              }
            ]
          },
          {
            Header: 'Location',
            columns: [
              {
                Header: 'Cemetery',
                accessor: 'cemeteryName',
                minWidth: 200,
                filterMethod: selectMenuFilterMethod,
                Filter: this.cemeteryFilter
              },
              {
                Header: 'Address',
                accessor: 'address',
                minWidth: 200,
                Cell: this.formatAddress,
                filterMethod: addressFilterFunc
              },
              {
                Header: 'Graveyard Type',
                accessor: 'graveyardType',
                minWidth: 130,
                filterMethod: selectMenuFilterMethod,
                Filter: this.graveyardTypeFilter
              },
              {
                Header: 'Site History',
                accessor: 'siteHistory'
              }
            ]
          },
          {
            Header: 'Marker/Plot',
            columns: [
              {
                Header: 'Inscription',
                accessor: 'inscription',
                minWidth: 250
              },
              {
                Header: 'Footstone',
                accessor: 'footstone',
                minWidth: 150
              },
              {
                Header: 'Demarcation',
                accessor: 'demarcation'
              },
              {
                Header: 'Condition',
                accessor: 'condition'
              },
              {
                Header: 'Accessible',
                accessor: 'accessible',
                filterMethod: accessibleFilterMethod,
                Filter: this.accessibleFilter
              },
              {
                Header: 'Restoration',
                accessor: 'restoration'
              },
              {
                Header: 'Photos',
                accessor: 'gravePhotos',
                Cell: this.formatGravePhotos,
                minWidth: 120,
                filterMethod: photoFilterMethod,
                Filter: this.gravePhotoFilter
              }
            ]
          },
          {
            Header: 'Notes',
            accessor: 'notes',
            minWidth: 300
          },
          {
            Header: 'Parcel Numbers',
            columns: [
              {
                Header: 'Tract',
                accessor: 'tractParcelNumber',
                minWidth: 130
              },
              {
                Header: 'Cemetery',
                accessor: 'cemeteryParcelNumber',
                minWidth: 150
              }
            ]
          },
          {
            Header: 'Survey',
            columns: [
              {
                Header: 'Original',
                accessor: 'originalSurvey',
                minWidth: 130,
                Cell: this.formatDateCell
              },
              {
                Header: 'Updates',
                accessor: 'surveyUpdates',
                minWidth: 130,
                Cell: this.formatDateCell
              },
              {
                Header: 'Current',
                accessor: 'currentSurvey',
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
