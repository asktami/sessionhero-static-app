import React from 'react';
import './Utils.css';

export function Pipe() {
	return <span className="pipe">{' | '}</span>;
}
// to convert session.track to color
export function getColor(str) {
	return str
		.split(' ')
		.join('-')
		.toLowerCase();
}

// to convert time to 12 hour format
export function getTime(dateStr, timeStr, locale = 'en-US') {
	let time = new Date(dateStr + ' ' + timeStr);
	return time.toLocaleString(locale, {
		hour: 'numeric',
		minute: 'numeric',
		hour12: true
	});
}

// to get dayNumber
export function getDayNumber(dateStr, locale = 'en-US') {
	var date = new Date(dateStr);
	return date.toLocaleDateString(locale, { day: 'numeric' });
}

// to get 3 character dayName
export function getDayName(dateStr, locale = 'en-US') {
	var date = new Date(dateStr);
	return date.toLocaleDateString(locale, { weekday: 'short' });
}

export function Button({ className, ...props }) {
	return <button className={['Button', className].join(' ')} {...props} />;
}

export function Textarea({ className, ...props }) {
	return <textarea className={['Textarea', className].join(' ')} {...props} />;
}

export function Input({ className, ...props }) {
	return <input className={['Input', className].join(' ')} {...props} />;
}

export function Required({ className, ...props }) {
	return (
		<span className={['Required', className].join(' ')} {...props}>
			&#42;
		</span>
	);
}
