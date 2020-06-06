import React, { Component, useState, useEffect } from 'react';
import {connect} from 'react-redux';
import {get_quakes} from '../../store/actions/quakes.actions.js';

// REACT HIGHLIGHTER
import Highlighter from 'react-highlight-words';

// ANT DESIGN
import { Table, Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

// LIBRARIES
import moment from 'moment';
import socketIoClient from 'socket.io-client';
import io from 'socket.io-client';

class Feed extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			searchText: '',
			searchedColumn: '',
			table_data: []
		}
		
		// GET ALL EARTHQUAKES 
	    this.socket = io('localhost:9000', {reconnection: true});

	    this.getAllQuakes = this.getAllQuakes.bind(this);

	}

	getAllQuakes() {
		this.socket.on('all_quakes_event', (data) => {	    	

		  	if (data) {	    
		  		console.log(data);

		    	const new_quake_data = data.features.map((el, idx) => {
					return {
					    key: el.id,
					    mag: el.properties.mag,
					    time: moment(el.properties.time).format('MMMM Do YYYY, h:mm:ss a'),
					    time_readable: moment(el.properties.time).startOf('hour').fromNow(),
					    title: el.properties.title
				  	}
				});	

		    	this.setState({ table_data: [...this.state.table_data, ...new_quake_data] });

			} // END IF	    	
	    }); // END SOCKET EVENT

	}

	componentDidMount() {	
		this.getAllQuakes();
	}

	componentWillUnmount() {
	    this.socket.close();
  	}

	// - - - - - - - - - - - - - - - - - - - - - - - - -
	getColumnSearchProps(dataIndex) {
	    return {
	    	filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
	      <div style={{ padding: 8 }}>
	        <Input
	          ref={node => {
	            this.searchInput = node;
	          }}
	          placeholder={`Search ${dataIndex}`}
	          value={selectedKeys[0]}
	          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
	          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
	          style={{ width: 188, marginBottom: 8, display: 'block' }}
	        />
	        <Button
	          type="primary"
	          onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
	          icon={<SearchOutlined />}
	          size="small"
	          style={{ width: 90, marginRight: 8 }}
	        >
	          Search
	        </Button>
	        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
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
	    onFilterDropdownVisibleChange: visible => {
	      if (visible) {
	        setTimeout(() => this.searchInput.select());
	      }
	    },
	    render: text =>
	      this.state.searchedColumn === dataIndex ? (
	        <Highlighter
	          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
	          searchWords={[this.state.searchText]}
	          autoEscape
	          textToHighlight={text.toString()}
	        />
	      ) : (
	        text
	      ),
	    }
  	};

  	handleSearch(selectedKeys, confirm, dataIndex) {
    	confirm();
    	this.setState({
      		searchText: selectedKeys[0],
      		searchedColumn: dataIndex,
    	});
  	};

	handleReset(clearFilters) {
	    clearFilters();
	    this.setState({ searchText: '' });
	 };
	// - - - - - - - - - - - - - - - - - - - - - - - - -

	render() {
		// COLUMNS CONFIGURATION
		this.columns = [
			{
		        title: 'Title',
		        dataIndex: 'title',
		        key: 'title',
		        width: '40%',
		        ...this.getColumnSearchProps('title'),
	      	},
	      	{
	        	title: 'Mag.',
		        dataIndex: 'mag',
		        key: 'mag',
		        width: '10%',
		        ...this.getColumnSearchProps('mag'),
	      	},
	      	{
	        	title: 'Time',
	        	dataIndex: 'time',
	        	key: 'time',
	        	...this.getColumnSearchProps('time'),
	      	},  
	      	{
	        	title: '',
	        	dataIndex: 'time_readable',
	        	key: 'time_readable',        	
	      	},     
	    ];

	  	return (
		    <section className='sec-reg' id='section-feed'>
		    	<Table columns={this.columns} dataSource={this.state.table_data} />
		    </section>
	  	);
	}
  
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
