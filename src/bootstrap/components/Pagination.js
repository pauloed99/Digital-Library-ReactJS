import React from 'react';

export default function Pagination(props){
    return (
        <nav aria-label="Page navigation example" className="d-flex justify-content-center mt-4 ">
            <ul className="pagination">
                <li className="page-item"><button className="page-link" onClick={props.prevPage}>Previous</button></li>
                <li className="page-item"><button className="page-link" onClick={props.nextPage}>Next</button></li>
            </ul>
        </nav>
    );
}