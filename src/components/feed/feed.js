import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import {get_quakes} from '../../store/actions/quakes.actions.js';

// REACT HIGHLIGHTER
import Highlighter from 'react-highlight-words';

// ANT DESIGN
import { Table, Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const Feed = (_earthquakes) => {

	const [searchText, setSearchText] = useState('');
	const [searchedColumn, setSearchColumn] = useState('');

  	useEffect(() => {
		if (_earthquakes._earthquakes != null) {
			console.log(_earthquakes);
		}
	})

	const data = [
	  {
	    key: '1',
	    name: 'John Brown',
	    age: 32,
	    address: 'New York No. 1 Lake Park',
	  },
	  {
	    key: '2',
	    name: 'Joe Black',
	    age: 42,
	    address: 'London No. 1 Lake Park',
	  },
	  {
	    key: '3',
	    name: 'Jim Green',
	    age: 32,
	    address: 'Sidney No. 1 Lake Park',
	  },
	  {
	    key: '4',
	    name: 'Jim Red',
	    age: 32,
	    address: 'London No. 2 Lake Park',
	  },
	];

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
		// setState({
		//   searchText: selectedKeys[0],
		//   searchedColumn: dataIndex,
		// });
	};

	const handleReset = clearFilters => {
		clearFilters();
		// setState({ searchText: '' });
	};

	const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: '30%',
        ...getColumnSearchProps('name'),
      },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        width: '20%',
        ...getColumnSearchProps('age'),
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
        ...getColumnSearchProps('address'),
      },
    ];
	 
  	return (
	    <section className='sec-reg'>
	    	<Table columns={columns} dataSource={data} />
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
