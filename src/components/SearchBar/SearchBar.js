import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../../contexts/AppContext';
import '../../index.css';

// to get query string for session.name on EditCommentPage
import queryString from 'query-string';

// to get props in SearchBar
import { withRouter } from 'react-router';

class SearchBar extends Component {
	static contextType = AppContext;

	renderMessage() {
		// get sesssion name from queryString IF queryString has sesssion name
		let sessionName = '';
		if (this.props.location.search.includes('session')) {
			sessionName = queryString.parse(this.props.location.search).session;
		}
		return this.props.location.pathname === '/' ? (
			<h2>View session details to plan your conference experience</h2>
		) : this.props.location.pathname === '/schedule' ? (
			<h2>Sessions in your schedule</h2>
		) : this.props.location.pathname.includes('/comments') ? (
			<h2>{sessionName} </h2>
		) : null;
	}

	renderSearchBar() {
		return (
			<form className="search-bar">
				<div>
					{this.props.location.pathname === '/schedule' ? (
						<Link
							to="/schedule"
							id="btn-show-all"
							onClick={this.context.clearFilters}
						>
							Show All
						</Link>
					) : (
						<Link to="/" id="btn-show-all" onClick={this.context.clearFilters}>
							Show All
						</Link>
					)}
				</div>
				<div>
					<select
						id="filter-day"
						name="filter-day"
						aria-label="Select by Day"
						value={this.context.filterDay}
						onChange={e => this.context.setFilterDay(e.target.value)}
					>
						<option value="">Select by Day</option>
						<option value="mon" data-filter="mon">
							Monday
						</option>
						<option value="tue" data-filter="tue">
							Tuesday
						</option>
						<option value="wed" data-filter="wed">
							Wednesday
						</option>
						<option value="thu" data-filter="thu">
							Thursday
						</option>
					</select>
				</div>
				<div>
					<select
						id="filter-track"
						name="filter-track"
						aria-label="Select by Track"
						value={this.context.filterTrack}
						onChange={e => this.context.setFilterTrack(e.target.value)}
					>
						<option value="">Select by Track</option>
						<option value="training" data-filter="training">
							Training Day
						</option>
						<option value="general" data-filter="general">
							General
						</option>
						<option value="create" data-filter="create">
							Create
						</option>
						<option value="share" data-filter="share">
							Share
						</option>
						<option value="integrate" data-filter="integrate">
							Integrate
						</option>
						<option value="business" data-filter="business">
							Business
						</option>
						<option value="sponsor" data-filter="sponsor">
							Sponsor
						</option>
						<option value="fba" data-filter="fba">
							FBA
						</option>
					</select>
				</div>
				<div>
					{this.props.location.pathname === '/schedule' ? (
						<Link
							to="/schedule"
							id="btn-expand-all"
							onClick={this.context.toggleExpandAll}
						>
							{this.context.expandAll ? 'Collapse All' : 'Expand All'}
						</Link>
					) : (
						<Link
							to="/"
							id="btn-expand-all"
							onClick={this.context.toggleExpandAll}
						>
							{this.context.expandAll ? 'Collapse All' : 'Expand All'}
						</Link>
					)}
				</div>
			</form>
		);
	}

	render() {
		console.log(this.props);
		console.log(this.props.location.search);
		console.log('filterDay = ', this.context.filterDay);
		console.log('filterTrack = ', this.context.filterTrack);

		return (
			<section className="search-section">
				{this.renderMessage()}

				{['/', '/schedule'].includes(this.props.location.pathname)
					? this.renderSearchBar()
					: null}
			</section>
		);
	}
}

export default withRouter(SearchBar);
