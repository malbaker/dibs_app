import React from "react";

function Cards({ data }) {
  return (
    <div className="max-w-fit">
      {data.map((post) => (
        <Card key={post.id} post={post}/>
      ))}
    </div>
  );
}

function Card({ post }) {
  return (
    <div className="card card-compact w-96 bg-base-100 shadow-xl" style={{margin: '4px'}}>
      <figure><img src={post.image} alt={post.description} /></figure>
      <div className="card-body">
        <h2 className="card-title">{post.category}</h2>
        <p className="card-actions justify-beginning">{post.address}</p>
        <div className="card-actions justify-end">
        <button className="btn mt-1 bg-buttons hover:bg-buttons rounded-full border-transparent focus:border-transparent focus:ring-0">more info</button>
        </div>
      </div>
    </div>
  )
}
export default Cards;
