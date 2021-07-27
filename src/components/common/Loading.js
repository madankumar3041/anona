import React from 'react';

const Loading = () => {
	return (
		<div>
			<div
				id="jpreOverlay"
				style={{
					position: 'fixed',
					top: '0px',
					left: '0px',
					width: '100%',
					height: ' 100%',
					zIndex: '9999999',
					opacity: '1',
				}}
			>
				<div id="jpreLoader" style={{ position: 'absolute', top: '50%', left: '0%' }}>
					<div class="jBar_sub">
						<div id="jpreBar" style={{ height: '100%' }}></div>
					</div>
					<div id="jprePercentage" style={{ position: 'relative' }}></div>
				</div>
				<div id="logoLoader"></div>
			</div>
		</div>
	);
};

export default Loading;
