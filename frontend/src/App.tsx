import React, { useState } from 'react';
import { parse } from 'papaparse';
import FileUpload from './components/FileUpload';
import  DataDisplay  from './components/DataDisplay';
import './App.css';

type DataType = {
  id: string;
  name: string;
  age: number;
  city: string;
  country: string;
  favorite_sport: string;
};

const App: React.FC = () => {
  const [data, setData] = useState<DataType[] | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleUpload = (file: File) => {
    const reader = new FileReader();

    reader.onload = () => {
      try {
        const csvData = parse(reader.result as string, { header: true }).data as DataType[];
        setData(csvData);
        setError(null);
      } catch (e) {
        setError('Failed to parse CSV data');
      }
    };

    reader.onerror = () => setError('Failed to read file');

    reader.readAsText(file);
  };

  return (
    <div className="AppContainer">
      <FileUpload onUpload={handleUpload} />
      <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search..." />
      {error && <div className="Error">{error}</div>}
      {data && <DataDisplay data={data.filter(item => item.name && item.name.includes(searchTerm))} />}
    </div>
  );
};

export default App;