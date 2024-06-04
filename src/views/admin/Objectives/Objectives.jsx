import React from 'react'
import CheckTable from '../default/components/CheckTable'
import { columnsDataCheck } from '../default/variables/columnsData';
import tableDataCheck from '../default/variables/tableDataCheck.json';

const Objectives = () => {
  return (
    <>
      {/* Check Table */}
      < div >
        <CheckTable
          columnsData={columnsDataCheck}
          tableData={tableDataCheck}
        />
      </div >
    </>
  );
}

export default Objectives