const TIMEOUT = 10000;

let g = window,
	d = g.document,
	id = 0,
	el = type => d.createElement(type),
	cache = {};

export default (url, cb) => {
	let fn = `jsonp_${++id}`,
		b = d.body || el('body'),
		s = el('script'),
		cached = cache[url],
		timer, err;
	if (cached) return cb(null, ...cached);
	g[fn] = (...args) => {
		clearTimeout(timer);
		if (!cb) return;
		cache[url] = args;
		cb(err, ...args);
		b.removeChild(s);
		s = cb = g[fn] = null;
		delete g[fn];
	};
	timer = setTimeout( λ => {
		err = 'Timed out';
		g[fn]();
	}, TIMEOUT);
	s.src = url.replace(/\{\{?callback\}\}?/i, fn);
	b.appendChild(s);
};
