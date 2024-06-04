/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import { baseURL } from 'api/baseUrl';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Regions = () => {
  const [data, setData] = useState({ mikoa: [], wilaya: {}, kata: {} });
  const [filter, setFilter] = useState({ value: '', type: '' });
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchMikoa = async () => {
      try {
        const response = await axios.get(`${baseURL}api/ccm/get-mikoa/`);

        if (response.data.success) {
          setData({
            mikoa: response.data.mikoa,
            wilaya: response.data.wilaya,
            kata: response.data.kata
          });
        } else {
          console.log('error: ', response.data.error);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchMikoa();
  }, [data]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const filterData = () => {
    const { type, value } = filter;
    let result = [];

    if (type === 'mkoa' && value) {
      result = data.wilaya[value]?.map(w => ({ mkoa: value, wilaya: w, kata: data.kata[value][w] })) || [];
    } else if (type === 'wilaya' && value) {
      for (const mkoa in data.wilaya) {
        if (data.wilaya[mkoa].includes(value)) {
          result = [{ mkoa, wilaya: value, kata: data.kata[mkoa][value] }];
          break;
        }
      }
    } else if (type === 'kata' && value) {
      for (const mkoa in data.kata) {
        for (const wilaya in data.kata[mkoa]) {
          if (data.kata[mkoa][wilaya].includes(value)) {
            result = [{ mkoa, wilaya, kata: [value] }];
            break;
          }
        }
      }
    }

    result.sort((a, b) => a.mkoa.localeCompare(b.mkoa) || a.wilaya.localeCompare(b.wilaya));
    setFilteredData(result);
  };

  useEffect(() => {
    filterData();
  }, [filter, data, filterData]);

  const handleFilterChange = (e) => {
    setFilter({ ...filter, type: e.target.value, value: '' });
  };

  const handleFilterValueChange = (e) => {
    setFilter({ ...filter, value: e.target.value });
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Regions</h1>

      <div className="mb-4">
        <label className="mr-2">Filter by: </label>
        <select
          value={filter.type}
          onChange={handleFilterChange}
          className="border border-gray-300 rounded p-2 mr-2"
        >
          <option value="">Select</option>
          <option value="mkoa">Mkoa</option>
          <option value="wilaya">Wilaya</option>
          <option value="kata">Kata</option>
        </select>

        {filter.type === 'mkoa' && (
          <select
            value={filter.value}
            onChange={handleFilterValueChange}
            className="border border-gray-300 rounded p-2"
          >
            <option value="">Select Mkoa</option>
            {data.mikoa.map((mkoa) => (
              <option key={mkoa} value={mkoa}>{mkoa}</option>
            ))}
          </select>
        )}

        {filter.type === 'wilaya' && (
          <select
            value={filter.value}
            onChange={handleFilterValueChange}
            className="border border-gray-300 rounded p-2"
          >
            <option value="">Select Wilaya</option>
            {Object.keys(data.wilaya).flatMap(mkoa => data.wilaya[mkoa]).map((wilaya) => (
              <option key={wilaya} value={wilaya}>{wilaya}</option>
            ))}
          </select>
        )}

        {filter.type === 'kata' && (
          <select
            value={filter.value}
            onChange={handleFilterValueChange}
            className="border border-gray-300 rounded p-2"
          >
            <option value="">Select Kata</option>
            {Object.keys(data.kata).flatMap(mkoa =>
              Object.keys(data.kata[mkoa]).flatMap(wilaya => data.kata[mkoa][wilaya])
            ).map((kata) => (
              <option key={kata} value={kata}>{kata}</option>
            ))}
          </select>
        )}
      </div>

      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-300">Mkoa</th>
            <th className="py-2 px-4 border-b border-gray-300">Wilaya</th>
            <th className="py-2 px-4 border-b border-gray-300">Kata</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((entry, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b border-gray-300">{entry.mkoa}</td>
              <td className="py-2 px-4 border-b border-gray-300">{entry.wilaya}</td>
              <td className="py-2 px-4 border-b border-gray-300">
                <ul className="list-disc pl-4">
                  {entry.kata.map((kata) => (
                    <li key={kata}>{kata}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Regions