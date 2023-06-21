import React, { useEffect, useState } from 'react';

function GroupItem(props) {
  let item = props.item;

  return (
    <div className="ag-courses_item" >
      <a href={"/groupInfo/" + item._id} className="ag-courses-item_link text-decoration-none">
        <div className="ag-courses-item_bg">
        </div>
        <div className="ag-courses-item_title">
        {item.name}
        </div>
      </a>
    </div>
  )
}

export default GroupItem