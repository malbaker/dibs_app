import React from 'react';

function Table({ data }) {
  return (
    <div className="max-w-fit">
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>Image</th>
            <th>Item Type</th>
            <th>Item Location</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {data.map((post) => (
            <tr key={post.id}>
              <th></th>
              <td>{post.image != null ? <img src={post.image}></img> : 'No image.' }</td>
              <td>{post.category}</td>
              <td>{post.address}</td>
              <td>{post.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;