import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const StockSkeleton: React.FC = () => {
  return (
    <SkeletonTheme baseColor="#d9d9d9" highlightColor="#e9e9e9">
        <table className="table-auto sm:w-1/2 w-full mt-10 sm:mt-20 mx-auto text-center">
          <thead>
            <tr>
              <th className="border-4 border-gray-700 px-4 py-2"><Skeleton width={ 80 } /></th>
              <th className="border-4 border-gray-700 px-4 py-2"><Skeleton width={ 80 } /></th>
              <th className="border-4 border-gray-700 px-4 py-2"><Skeleton width={ 80 } /></th>
            </tr>
          </thead>
          <tbody>
            { [...Array( 3 )].map( ( _, index ) => (
              <tr key={ index }>
                <td className="border-4 border-gray-700 px-4 py-2"><Skeleton width={ 80 } /></td>
                <td className="border-4 border-gray-700 px-4 py-2"><Skeleton width={ 80 } /></td>
                <td className="border-4 border-gray-700 px-4 py-2"><Skeleton width={ 80 } /></td>
              </tr>
            ) ) }
          </tbody>
        </table>
    </SkeletonTheme>
  )
};

export default StockSkeleton;