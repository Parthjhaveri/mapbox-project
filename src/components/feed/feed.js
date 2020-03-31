import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import {get_quakes} from '../../store/actions/quakes.actions.js';

// REACT HIGHLIGHTER
import Highlighter from 'react-highlight-words';

// ANT DESIGN
import { Table, Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

// LIBRARIES
import moment from 'moment';

const Feed = (_earthquakes) => {

	const [searchText, setSearchText] = useState('');
	const [searchedColumn, setSearchColumn] = useState('');
	
	// FEED TABLE DATA
	const table_data = [];
  	
  	if (_earthquakes._earthquakes != null) {
		_earthquakes._earthquakes.features.forEach((el, idx) => {
			table_data.push(
				{
				    key: el.id,
				    mag: el.properties.mag,
				    time: moment(el.properties.time).format('MMMM Do YYYY, h:mm:ss a'),
				    updated: moment(el.properties.updated).startOf('hour').fromNow(),
				    title: el.properties.title
			  	},
			)
		});			
	}

	const getColumnSearchProps = (dataIndex, searchInput) => ({

	    filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
	      <div style={{ padding: 8 }}>
	        <Input
	          ref={node => {
	            searchInput = node;
	          }}
	          placeholder={`Search ${dataIndex}`}
	          value={selectedKeys[0]}
	          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
	          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
	          style={{ width: 188, marginBottom: 8, display: 'block' }}
	        />
	        <Button
	          type="primary"
	          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
	          icon={<SearchOutlined />}
	          size="small"
	          style={{ width: 90, marginRight: 8 }}
	        >
	          Search
	        </Button>
	        <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
	          Reset
	        </Button>
	      </div>
	    ),
	    
	    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
	    onFilter: (value, record) =>
	      record[dataIndex]
	        .toString()
	        .toLowerCase()
	        .includes(value.toLowerCase()),
	    onFilterDropdownVisibleChange: (visible) => {
	      if (visible) {
	        setTimeout(() => searchInput.select());
	      }
	    },
	    render: text =>
	      searchedColumn === dataIndex ? (
	        <Highlighter
	          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
	          searchWords={[searchText]}
	          autoEscape
	          textToHighlight={text.toString()}
	        />
	      ) : (
	        text
	      ),
  	});

	const handleSearch = (selectedKeys, confirm, dataIndex) => {
		confirm();
	};

	const handleReset = clearFilters => {
		clearFilters();
	};

	// COLUMNS CONFIGURATION
	const columns = [
		{
	        title: 'Title',
	        dataIndex: 'title',
	        key: 'title',
	        width: '40%',
	        ...getColumnSearchProps('title'),
      	},
      	{
        	title: 'Mag.',
	        dataIndex: 'mag',
	        key: 'mag',
	        width: '10%',
	        ...getColumnSearchProps('mag'),
      	},
      	{
        	title: 'Time',
        	dataIndex: 'time',
        	key: 'time',
        	width: '30%',
        	...getColumnSearchProps('time'),
      	},
      	{
	        title: 'Updated',
        	dataIndex: 'updated',
        	key: 'updated',
        	...getColumnSearchProps('updated'),
      	},      
    ];

  	return (
	    <section className='sec-reg' id='section-feed'>
	    	<Table columns={columns} dataSource={table_data} />
	    </section>
  	);
  
}

const mapStateToProps = (state) => {		
	return {		
		_earthquakes: (state.earthquakes.quakes.length != 0 ? state.earthquakes.quakes : null)
	}
}

const mapDispatchToProps = (dispatch) => {	
	return {
		all_earthquakes: dispatch(get_quakes())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
