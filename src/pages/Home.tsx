import React, { useEffect, useMemo, useState } from 'react';
import data from '../data.json';
import Stock from '../components/Stock';
import StockSkeleton from '../components/StockSkeleton';

// interface for Stock data object
interface StockData {
	stockName: string;
	info: {
		date: string;
		open: number;
		close: number;
	}[];
}

const Home = () => {
  const [stockData, setStockData] = useState<StockData[] | null>( null );
  const [selectedStock, setSelectedStock] = useState<StockData | null>( null );
  const [daysToShow, setDaysToShow] = useState<number>( 3 );
  const [currentPage, setCurrentPage] = useState<number>( 0 );

  useEffect( () => {
    /*  simulating an asynchronous data fetch with a 2-second delay for updating stock data state, 
    which in real time fetched from APIs, so as to show Skeleton UI   */
    const timeout = setTimeout( () => {
      setStockData( data.data );
    }, 2000 );
    // clear the timeout when component unmounts
    return () => clearTimeout( timeout );
  }, [] );

  // OPTIMISE : memoize the filtered stock data to avoid recalculation on every render
  const filteredStockData = useMemo( () => {
    if ( !selectedStock ) return [];

    const startIndex = currentPage * daysToShow;
    const endIndex = startIndex + daysToShow;
    return selectedStock.info.slice( startIndex, endIndex );
  }, [selectedStock, currentPage, daysToShow] );

  // handler for stock selection change
  const handleStockChange = ( event: React.ChangeEvent<HTMLSelectElement> ) => {
    const stockName = event.target.value;
    const selectedStockData = stockData?.find( ( stock ) => stock.stockName === stockName );
    setSelectedStock( selectedStockData || null );
    setCurrentPage( 0 );  // reset to first page when stock changes
  };

  // handler days to show change
  const handleDaysToShowChange = ( event: React.ChangeEvent<HTMLSelectElement> ) => {
    setDaysToShow( parseInt( event.target.value ) );
    setCurrentPage( 0 );  // reset to first page when days to show changes
  };

  // handle for updating page change
  const handlePageChange = ( newPage: number ) => {
    setCurrentPage( newPage );
    console.log( 'Current Page => ', newPage );
  };

  return (
    <div className='mx-auto p-4 min-h-screen bg-gradient-to-br from-gray-100 to-gray-300'>
      <h1 className='text-xl sm:text-2xl font-bold mb-4'>Stock Viewer</h1>
      <div className='flex flex-col justify-around'>
        <div>
          <div className='mb-4 flex justify-center items-center'>
            <label htmlFor='stock-select' className='mr-2'>
              Select Stock:
            </label>
            <select
              id='stock-select'
              className='border rounded px-2 py-1'
              onChange={ handleStockChange }
            >
              <option value=''>Select a stock</option>
              { data.data.map( ( stock ) => (
                <option key={ stock.stockName } value={ stock.stockName }>
                  { stock.stockName }
                </option>
              ) ) }
            </select>
          </div>
          <div className='mb-4 flex justify-center items-center'>
            <label htmlFor='days-to-show' className='mr-2'>
              Days to Show:
            </label>
            <select
              id='days-to-show'
              className='border rounded px-2 py-1'
              value={ daysToShow }
              onChange={ handleDaysToShowChange }
            >
              <option value={ 3 }>3</option>
              <option value={ 5 }>5</option>
              <option value={ 10 }>10</option>
            </select>
          </div>
        </div>

        <div>
          {
            !stockData
              ? <StockSkeleton />
              : stockData?.length < 1
                ? <p className='text-2xl text-center'>No Stock to Show.</p>
                : !selectedStock
                  ? <div className='sm:text-3xl text-xl text-center'>Please select a stock</div>
                  : <Stock
                    selectedStock={ selectedStock }
                    filteredStockData={ filteredStockData }
                    currentPage={ currentPage }
                    daysToShow={ daysToShow }
                    handlePageChange={ handlePageChange }
                  />
          }
        </div>
      </div>
    </div>
  );
};

export default Home;