import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../index.css';

// to get props in Header
import { withRouter } from 'react-router';

class SearchBar extends Component {
	renderMessage() {
		return this.props.location.pathname === '/' ? (
			<h2>View session details to plan your conference experience</h2>
		) : this.props.location.pathname === '/schedule' ? (
			<h2>Sessions in your schedule</h2>
		) : (
			<p>&nbsp;</p>
		);
	}

	renderSearchBar() {
		return (
			<div className="search-bar">
				<div>
					<Link to="/" id="btn-show-all">
						Show All
					</Link>
				</div>
				<div>
					<select id="filter-day" name="filter-day" aria-label="Select by Day">
						<option value="">Select by Day</option>
						<option value="monday" data-filter="monday">
							Monday
						</option>
						<option value="tuesday" data-filter="tuesday">
							Tuesday
						</option>
						<option value="wednesday" data-filter="wednesday">
							Wednesday
						</option>
						<option value="thursday" data-filter="thursday">
							Thursday
						</option>
					</select>
				</div>
				<div>
					<select
						id="filter-track"
						name="filter-track"
						aria-label="Select by Track"
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
					<Link to="/" id="btn-expand-all">
						Expand All
					</Link>
				</div>
			</div>
		);
	}

	render() {
		return (
			<section className="search-header">
				{this.renderMessage()}

				{this.props.location.pathname === '/' ||
				this.props.location.pathname === '/schedule'
					? this.renderSearchBar()
					: null}
			</section>
		);
	}
}

export default withRouter(SearchBar);
