import type { RouteData, SerializedRouteData, AstroConfig } from '../../../@types/astro';

import { getRouteGenerator } from './generator.js';

export function serializeRouteData(
	routeData: RouteData,
	trailingSlash: AstroConfig['trailingSlash']
): SerializedRouteData {
	return {
		...routeData,
		generate: undefined,
		pattern: routeData.pattern.source,
		_meta: { trailingSlash },
	};
}

export function deserializeRouteData(rawRouteData: SerializedRouteData): RouteData {
	return {
		type: rawRouteData.type,
		pattern: new RegExp(rawRouteData.pattern),
		params: rawRouteData.params,
		component: rawRouteData.component,
		generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
		pathname: rawRouteData.pathname || undefined,
		segments: rawRouteData.segments,
	};
}
