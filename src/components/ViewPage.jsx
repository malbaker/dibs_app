import React from 'react';
import Table from './Table';

function ViewPage() {
return (
<div className="hero-content text-center sticky top-0 max-w-screen-sm">
<div className="max-w-fit mx-auto pt-20">
<h1 className="text-4xl font-semibold mb-8">View Items</h1>
<div style={{ overflowX: 'auto' }}>
<Table />
</div>
</div>
</div>
);
}

export default ViewPage;