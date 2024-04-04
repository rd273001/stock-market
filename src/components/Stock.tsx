import React from 'react';

interface StockProps {
	selectedStock: {
		stockName: string;
		info: {
			date: string;
			open: number;
			close: number;
		}[];
	} | null;
	filteredStockData: {
		date: string;
		open: number;
		close: number;
	}[];
	currentPage: number;
	daysToShow: number;
	handlePageChange: (newPage: number) => void;
};

const Stock = React.memo( ( { selectedStock, filteredStockData, currentPage, daysToShow, handlePageChange }: StockProps ) => {

  // calculate the close price of previous day from previous page to color the Open price of first day of other pages than 1st page
  const prevDayClose = currentPage > 0 ? selectedStock?.info[( currentPage * daysToShow ) - 1]?.close : null;

  return (
    <div className='flex flex-col items-center justify-center sm:gap-y-12 gap-y-6'>
      <table className='table-auto w-full sm:w-1/2 mt-12 sm:mt-20'>
        <thead>
          <tr>
            <th className='px-4 py-2 border-4 border-gray-700 '>Date</th>
            <th className='px-4 py-2 border-4 border-gray-700 '>Open</th>
            <th className='px-4 py-2 border-4 border-gray-700 '>Close</th>
          </tr>
        </thead>
        <tbody className='text-center'>
          { filteredStockData.map( ( info, index ) => (
            <tr key={ `${info.date}-${index}` }>
              <td className='border-4 border-gray-700 px-4 py-2'>{ info.date }</td>
              <td
                className={ `border-4 border-gray-700 px-4 py-2 ${info.open > filteredStockData[index - 1]?.close
                    ? 'text-green-500'
                    : info.open === filteredStockData[index - 1]?.close
                      ? ''
                      : index === 0 && currentPage === 0
                        ? ''
                        : index === 0 && currentPage > 0
                          ? prevDayClose && info.open > prevDayClose ? 'text-green-500' : info.open === prevDayClose ? '' : 'text-red-500'
                          : 'text-red-500'
                  }` }
              >
                { info.open }
              </td>
              <td
                className={ `border-4 border-gray-700 px-4 py-2 ${info.close > info.open ? 'text-green-500' : info.close === info.open ? '' : 'text-red-500'
                  }` }
              >
                { info.close }
              </td>
            </tr>
          ) ) }
        </tbody>
      </table>
      <div className='flex justify-center mt-4'>
        { Array.from( {
          length: Math.ceil( ( selectedStock?.info.length || 0 ) / daysToShow ),
        } ).map( ( _, index ) => (
          <button
            key={ index }
            className={ `mx-2 px-4 py-2 rounded outline outline-2 outline-blue-700 ${currentPage === index ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }` }
            onClick={ () => handlePageChange( index ) }
          >
            { index + 1 }
          </button>
        ) ) }
      </div>
    </div>
  );
} );

export default Stock;