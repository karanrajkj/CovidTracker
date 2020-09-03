import React from 'react';
import { useState, useEffect } from 'react'
import axios from 'axios'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { Pie } from 'react-chartjs-2'

function DisplayCovidList() {
	const [covidList, getCovidList] = useState([]);
	const [totalCount, getTotalCount] = useState([]);

	const chartData = {
		labels: ['Confirmed', 'Active', 'Recovered', 'Deceased'],
		datasets: [
			{
				data: [
					totalCount.TotalConfirmed,
					totalCount.TotalConfirmed - totalCount.TotalRecovered - totalCount.TotalDeaths,
					totalCount.TotalRecovered,
					totalCount.TotalDeaths
				],
				backgroundColor: ['#d9534f', '#0275d8', '#5cb85c', '#292b2c']
			}
		]
	}
	
	const chartOptions = {
		title: {
			display: true,
			text: 'Pie Chart'
		}
	}


	useEffect(() => {
		axios.get(`https://api.covid19api.com/summary`)
			.then(res => {
				//console.log(res)
				getCovidList(res.data.Countries)
				getTotalCount(res.data.Global)
			})
			.catch(err => {
				console.log(err)
			})
	}, [])


	return (
		<React.Fragment>
			<section>
				<h1 className="text-center text-capitalize">Covid19 cases across the globe</h1>
				<hr className="w-25 mx-auto" />

				<div className="w-50 mx-auto pb-2"><Pie data={chartData} options={chartOptions}></Pie></div>
			</section>

			<section>
				<div className="container mb-4">
					<div className="row text-center">
						<div className="col-lg-3 col-md-3 col-sm-12">
							<div className="card">
								<div className="card-body text-danger">
									<h4 className="card-title">Confirmed</h4>
									<p className="card-text">{totalCount.TotalConfirmed}</p>
								</div>
							</div>
						</div>
						<div className="col-lg-3 col-md-3 col-sm-12">
							<div className="card">
								<div className="card-body text-primary">
									<h4 className="card-title">Active</h4>
									<p className="card-text">{totalCount.TotalConfirmed - totalCount.TotalRecovered - totalCount.TotalDeaths}</p>
								</div>
							</div>
						</div>
						<div className="col-lg-3 col-md-3 col-sm-12">
							<div className="card">
								<div className="card-body text-success">
									<h4 className="card-title">Recovered</h4>
									<p className="card-text">{totalCount.TotalRecovered}</p>
								</div>
							</div>
						</div>
						<div className="col-lg-3 col-md-3 col-sm-12">
							<div className="card">
								<div className="card-body">
									<h4 className="card-title">Deceased</h4>
									<p className="card-text">{totalCount.TotalDeaths}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<div className="table-responsive-sm mx-5 mb-5">
				<table className="table text-center table-bordered table-sm">
					<thead className="thead-light">
						<tr>
							<th>Country</th>
							<th>Confirmed</th>
							<th>Active</th>
							<th>Recovered</th>
							<th>Deceased</th>
						</tr>
					</thead>
					<tbody>
						{covidList.map(cl => (
							<tr key={cl.CountryCode}>
								<td>{cl.Country}</td>
								<td>{cl.TotalConfirmed}</td>
								<td>{cl.TotalConfirmed - cl.TotalRecovered - cl.TotalDeaths}</td>
								<td>{cl.TotalRecovered}</td>
								<td>{cl.TotalDeaths}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<footer className="bg-dark text-white text-center fixed-bottom">
				<p>@copyright WHO 2020</p>
			</footer>

		</React.Fragment>
	);
}

export default DisplayCovidList;