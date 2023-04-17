import React from 'react'
import {  SparklineAreaData} from '../../data/dummy';
import { SparkLine } from '../../components';
import { useStateContext} from '../../contexts/ContextProvider';
export default function EarningChart() {

    const { currentColor, currentMode } = useStateContext();
  return (
    <div>
      <div
            className=" rounded-2xl md:w-400 p-4 ml-3"
            style={{ backgroundColor: currentColor }}
          >
            <div className="flex justify-between items-center ">
              <p className="font-semibold text-white text-2xl">Earnings</p>

              <div>
                <p className="text-2xl text-white font-semibold mt-8">$63,448.78</p>
                <p className="text-gray-200">Monthly revenue</p>
              </div>
            </div>

            <div className="mt-4">
              <SparkLine currentColor={currentColor} id="column-sparkLine" height="100px" type="Column" data={SparklineAreaData} width="320" color="rgb(242, 252, 253)" />
            </div>
          </div>
    </div>
  )
}
