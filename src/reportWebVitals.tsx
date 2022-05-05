import type { ReportHandler } from 'web-vitals';

const reportWebVitals = (onPerfEntry: ReportHandler | undefined) => {
	if (onPerfEntry && onPerfEntry instanceof Function) {
		import('web-vitals')
			// eslint-disable-next-line promise/always-return
			.then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
				getCLS(onPerfEntry);
				getFID(onPerfEntry);
				getFCP(onPerfEntry);
				getLCP(onPerfEntry);
				getTTFB(onPerfEntry);
			})
			.catch(console.error);
	}
};

export default reportWebVitals;
