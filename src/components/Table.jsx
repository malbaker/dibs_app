import React from "react";
import PropTypes from "prop-types";

function Table({ data }) {
  return (
    <div className="max-w-fit">
      <table className="table">
        <thead>
          <tr>
            <th />
            <th>Image</th>
            <th>Item Type</th>
            <th>Item Location</th>
            <th className="w">Description</th>
          </tr>
        </thead>
        <tbody>
          {data.map((post) => (
            <tr key={post.id}>
              <th />
              <td>
                {post.image != null ? (
                  <img src={post.image} alt={post.description} />
                ) : (
                  "No image."
                )}
              </td>
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
Table.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Table;
