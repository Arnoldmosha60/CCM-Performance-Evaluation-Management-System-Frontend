/* eslint-disable no-unused-vars */
import MiniCalendar from "components/calendar/MiniCalendar";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import TotalSpent from "views/admin/default/components/TotalSpent";
import { IoMdHome } from "react-icons/io";
import { IoDocuments } from "react-icons/io5";
import { MdBarChart, MdDashboard } from "react-icons/md";

import Widget from "components/widget/Widget";
import DailyTraffic from "views/admin/default/components/DailyTraffic";
import { baseURL } from "api/baseUrl";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [dataCount, setDataCount] = useState({ total_mikoa: 0, total_wilaya: 0, total_kata: 0 });

  useEffect(() => {
    const getMikoa = async () => {
      try {
        const response = await axios.get(`${baseURL}api/ccm/get-mikoa/`);

        if (response.data.success) {
          setDataCount({
            total_mikoa: response.data.total_mikoa,
            total_wilaya: response.data.total_wilaya,
            total_kata: response.data.total_kata
          });
        } else {
          console.log('error: ', response.data.error)
        }
      } catch (error) {
        console.log("error: ", error);
      }
    };
    getMikoa();
  }, [dataCount]);

  return (
    <div>
      {/* Card widget */}

      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">

        <Widget
          icon={<IoMdHome className="h-6 w-6" />}
          title={"Total Objectives"}
          subtitle={"2433"}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"New Tasks"}
          subtitle={"145"}
        />
        <Link to='/admin/regions'>
          <Widget
            icon={<MdDashboard className="h-6 w-6" />}
            title={"Regions"}
            subtitle={dataCount.total_mikoa}
          />
        </Link>
        <Link to='/admin/regions'>
          <Widget
            icon={<MdDashboard className="h-6 w-6" />}
            title={"Districts"}
            subtitle={dataCount.total_wilaya}
          />
        </Link>
        <Link to='/admin/regions'>
          <Widget
            icon={<MdDashboard className="h-6 w-6" />}
            title={"Wards"}
            subtitle={dataCount.total_kata}
          />
        </Link>
      </div>

      {/* Charts */}

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <TotalSpent />
        <WeeklyRevenue />
      </div>

      {/* Tables & Charts */}

      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">

        {/* Traffic chart & Calender */}


        <DailyTraffic />
        <div className="grid grid-cols-1 rounded-[20px]">
          <MiniCalendar />
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
