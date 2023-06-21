import React from 'react';

function GroupCatItem(props) {
  let item = props.item;

  return (
    <div className="ag-courses_item">
      <a href={"/group/"+item.url_name} className="ag-courses-item_link">
        <div className="ag-courses-item_bg">
        </div>
        <div className="ag-courses-item_title">
        {item.name}
        </div>
      </a>
    </div>
  )
}

export default GroupCatItem