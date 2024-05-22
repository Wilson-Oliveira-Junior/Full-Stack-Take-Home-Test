import React from "react";

interface DataType {
                id: string;
                name: string;
                age: number;
                city: string;
                country: string; 
                favorite_sport: string; 
}

const DataDisplay: React.FC<{ data: DataType[] }> = ({ data }) => (
        <div className="DataDisplay">
            {data.map((item, index) => (
                <div key={index} className="DataCard">
                    <h2>{item.name}</h2>
                    <p>{item.city}</p>
                    <p>{item.country}</p> 
                    <p>{item.favorite_sport}</p> 
                </div>
            ))}
        </div>
    );


export default DataDisplay;