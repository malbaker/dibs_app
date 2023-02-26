import React from 'react';

function Table({ data }) {
  return (
    <div class="max-w-fit">
  <table class="table">
    <thead>
      <tr>
        <th></th>
        <th>Item Type</th>
        <th>Item Location</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>1</th>
        <td>Furniture</td>
        <td>33 Harry Agganis Way</td>
        <td>White couch from IKEA</td>
      </tr>
      <tr>
        <th> 2</th>
        <td>Furniture</td>
        <td>33 Harry Agganis Way</td>
        <td>White couch from IKEA</td>
      </tr>
      <tr>
        <th>3</th>
        <td>Furniture</td>
        <td>33 Harry Agganis Way</td>
        <td>White couch from IKEA</td>
      </tr>
      <tr>
        <th>4</th>
        <td>Furniture</td>
        <td>33 Harry Agganis Way</td>
        <td>White couch from IKEA</td>
      </tr>
      <tr>
        <th>5</th>
        <td>Furniture</td>
        <td>33 Harry Agganis Way</td>
        <td>White couch from IKEA</td>
      </tr>
    </tbody>
  </table>
</div>
  );
}

export default Table;