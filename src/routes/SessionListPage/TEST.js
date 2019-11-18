// WITH REAL DATABASE would it be best to return a join result when getSessionS?  How do we know the login userId?

	// update sessionList:
	// combine sessionList and scheduleList so have login id_user in session record
	updateSessionList() {
		const { sessionList = [], scheduleList = [] } = this.context;

		sessionList.forEach(session => {
			scheduleList.forEach(schedule => {
				if (schedule.id_session === session.id) {
					session.id_user = schedule.id_user;
				}
			});
		});

		// TBD HARDCODE session.id_user = 1 (to fake knowing login userId)
		let newScheduleList = this.state.sessionList.filter(
			session => session.id_user === 1
		);
		this.context.setState({ scheduleList: newScheduleList });
	}

	// // ON HOLD DO NOT USE
	// // instead on ScheduleListPage filter sessionList to show those with login user id = session.id_user

	// // update scheduleList:
	// // combine scheduleList and sessionList so have all session fields in schedule record
	// updateScheduleList() {
	// 	const { sessionList = [], scheduleList = [] } = this.context;

	// 	scheduleList.forEach(schedule => {
	// 		sessionList.forEach(session => {
	// 			if (session.id === schedule.id_session) {
	// 				schedule.track = session.track;
	// 				schedule.date = session.date;
	// 				schedule.time_start = session.time_start;
	// 				schedule.time_end = session.time_end;
	// 			}
	// 		});
	// 	});
	// }