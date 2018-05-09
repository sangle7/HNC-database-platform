import React from 'react'
import { Select } from 'antd'

const Option = Select.Option

class SearchInput extends React.Component {
    state = {
      data: [],
      value: '',
    }
    handleChange = (value) => {
      const { cgi = 'sug' } = this.props
      this.setState({ value },this.props.onChange(value));
      fetchForSuggest(value, data => this.setState({ data }), cgi);
    }
    render() {
      const options = this.state.data.map(d => <Option key={d.value}>{d.text}</Option>);
      return (
        <Select
          mode="combobox"
          value={this.state.value}
          placeholder={this.props.placeholder}
          style={this.props.style}
          defaultActiveFirstOption={false}
          showArrow={false}
          filterOption={false}
          onChange={this.handleChange}
        >
          {options}
        </Select>
      );
    }
  }


let timeout;
let currentValue;

function fetchForSuggest(value, callback, cgi) {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  currentValue = value;

  function fake() {
    fetch(`/cgi/gene/${cgi}?q=${value}`,{
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => response.json())
      .then((d) => {
        if (currentValue === value) {
          const result = d.result;
          const data = [];
          result.forEach((r) => {
            data.push({
              value: r.name,
              text: r.name,
            });
          });
          callback(data);
        }
      });
  }

  timeout = setTimeout(fake, 300);
}

export default SearchInput