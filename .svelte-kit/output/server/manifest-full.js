export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["1.png","6.png","amenities/Badminton_Piclkleball court.jpg","amenities/Banquet 300 01.jpg","amenities/Bussines Center.jpg","amenities/Gym 300 01.jpg","amenities/Indoor Games 300 01.jpg","amenities/Kids Creche.jpg","amenities/Lobby 300 01.jpg","amenities/Lounge 300 01.jpg","amenities/Lounge 300 02.jpg","amenities/README.md","amenities/Yoga 300 01.jpg","connectivity.png","constants.ts","favicon.png","files/amenties.js","files/interior.js","hospital.png","hotel.png","images/Screenshot From 2025-05-22 13-39-42_1748349171636.png","images/Screenshot From 2025-05-26 15-46-36_1748349171639.png","intro-ams.png","main-building.png","plans/lookbook/1.jpg","plans/lookbook/2.jpg","plans/lookbook/3.jpg","plans/lookbook/4.jpg","plans/lookbook/5.jpg","plans/lookbook/6.jpg","plans/t2/1.jpg","plans/t2/2.jpg","plans/t2/3.jpg","plans/t2/4.jpg","plans/t2/5.jpg","plans/t2/6.jpg","render/BuildingSequence.1.jpeg","render/BuildingSequence.10.jpeg","render/BuildingSequence.11.jpeg","render/BuildingSequence.12.jpeg","render/BuildingSequence.13.jpeg","render/BuildingSequence.14.jpeg","render/BuildingSequence.15.jpeg","render/BuildingSequence.16.jpeg","render/BuildingSequence.17.jpeg","render/BuildingSequence.18.jpeg","render/BuildingSequence.19.jpeg","render/BuildingSequence.2.jpeg","render/BuildingSequence.20.jpeg","render/BuildingSequence.21.jpeg","render/BuildingSequence.22.jpeg","render/BuildingSequence.23.jpeg","render/BuildingSequence.24.jpeg","render/BuildingSequence.3.jpeg","render/BuildingSequence.4.jpeg","render/BuildingSequence.5.jpeg","render/BuildingSequence.6.jpeg","render/BuildingSequence.7.jpeg","render/BuildingSequence.8.jpeg","render/BuildingSequence.9.jpeg","robots.txt","school.png","scripts/js-cloudimage-360-view.min.js","start-btn.png","tool/css/app.css","tool/favicon.png","tool/img/chrome.png","tool/img/export-failed.svg","tool/img/export-started.svg","tool/img/export-successful.svg","tool/img/eye-inner.svg","tool/img/eye-outer.svg","tool/img/firefox.png","tool/img/help-left.svg","tool/img/help-top.svg","tool/img/hotspot.png","tool/img/info.png","tool/img/marzipano-dark.png","tool/img/marzipano-light.png","tool/img/webgl.png","tool/index.html","tool/js/app.js","tool/js/cube.worker.js","tool/js/equirect.worker.js","tool/js/zip.worker.js","tool/template/app-files/img/close.png","tool/template/app-files/img/collapse.png","tool/template/app-files/img/down.png","tool/template/app-files/img/expand.png","tool/template/app-files/img/fullscreen.png","tool/template/app-files/img/info.png","tool/template/app-files/img/left.png","tool/template/app-files/img/link.png","tool/template/app-files/img/minus.png","tool/template/app-files/img/pause.png","tool/template/app-files/img/play.png","tool/template/app-files/img/plus.png","tool/template/app-files/img/right.png","tool/template/app-files/img/up.png","tool/template/app-files/img/windowed.png","tool/template/app-files/index.html.tpl","tool/template/app-files/index.js","tool/template/app-files/style.css","tool/template/app-files/vendor/bowser.min.js","tool/template/app-files/vendor/marzipano.js","tool/template/app-files/vendor/reset.min.css","tool/template/app-files/vendor/screenfull.min.js","tool/template/files.json","tool/template/LICENSE.txt","tool/template/README.txt"]),
	mimeTypes: {".png":"image/png",".jpg":"image/jpeg",".md":"text/markdown",".ts":"video/mp2t",".js":"text/javascript",".jpeg":"image/jpeg",".txt":"text/plain",".css":"text/css",".svg":"image/svg+xml",".html":"text/html",".json":"application/json"},
	_: {
		client: {"start":"_app/immutable/entry/start.7CN0qD2J.js","app":"_app/immutable/entry/app.TqQjNcEU.js","imports":["_app/immutable/entry/start.7CN0qD2J.js","_app/immutable/chunks/entry.ceyYID61.js","_app/immutable/chunks/runtime.G7h84x8p.js","_app/immutable/chunks/index.BAlRm3pH.js","_app/immutable/entry/app.TqQjNcEU.js","_app/immutable/chunks/runtime.G7h84x8p.js","_app/immutable/chunks/disclose-version.0pbw4HjO.js","_app/immutable/chunks/if.CBatPikC.js","_app/immutable/chunks/props.DVzXLu3i.js","_app/immutable/chunks/index-client.ClYPF2XV.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js')),
			__memo(() => import('./nodes/7.js')),
			__memo(() => import('./nodes/8.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/access",
				pattern: /^\/access\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/amenities",
				pattern: /^\/amenities\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/brochure",
				pattern: /^\/brochure\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/highlights",
				pattern: /^\/highlights\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/interiors",
				pattern: /^\/interiors\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/vicinities",
				pattern: /^\/vicinities\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
