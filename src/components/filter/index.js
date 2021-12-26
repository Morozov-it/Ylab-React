import React, {useCallback} from 'react';
import propTypes from "prop-types";
import {cn} from '@bem-react/classname'
import './styles.css';

function Filter(props){
  
  // CSS классы по БЭМ
  const className = cn('Select');

  const onSelect = useCallback((e) => {
    props.onChange(e.target.value);
  }, [props.onChange])
  
  // const options = () => {
  //   return props.categories.map(item => {
  //     if (item.parent) item.title = '- ' + item.title;
  //   })
  // }

  return (
    <select className={className()} onChange={onSelect} value={props.value}>
      <option value={''}>Все</option>
      {props.categories.map(item => (
        <option key={item._id} value={item._id}>{item.title}</option>
      ))}
    </select>
  )
}

Filter.propTypes = {
  categories: propTypes.arrayOf(propTypes.object).isRequired,
  value: propTypes.any,
  onChange: propTypes.func
}

Filter.defaultProps = {
  onChange: () => {
  }
}

export default React.memo(Filter);
