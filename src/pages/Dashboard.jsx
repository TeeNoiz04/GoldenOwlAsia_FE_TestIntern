import { useEffect } from 'react';
import { getSubjectStatistics } from '../api/statisticApi';

export default function Dashboard() {
  useEffect(() => {
    getSubjectStatistics()
      .then((data) => {
        console.log('Subject statistics:', data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return <h1>Dashboard</h1>;
}
